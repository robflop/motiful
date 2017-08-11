const { inspect } = require('util');

require('../util/prototypes');
const ArgumentParser = require('./ArgumentParser');

class CommandController {
	constructor() {
		this.disabledCommands = require('../data/disabledCommands.json');
		this.tags = require('../data/tags.js');
		this.tagRegex = /\[([^[\]:]*)(?::?\s*(.*))\]/g;
	}

	async handleCommand(message) { // eslint-disable-line complexity
		if (message.author.id !== message.client.user.id) return;

		if (!message.content.startsWith(message.client.config.commandPrefix) && this.tagRegex.test(message.content)) {
			const tagCall = [];
			let i = 0;
			const tags = message.content.match(this.tagRegex).map(tag => { // eslint-disable-line arrow-body-style
				++i && tagCall.push({ i, tag }); // update index and save original tag to later replace
				return tag.split(/:(?![^{]*[}])/).map(t => {
					// split by colon if not inside json
					t = t.trim();
					if (t[t.length - 1] === ']') t = t.replace(t[t.length - 1], '');
					if (t[0] === '[') t = t.replace(t[0], '');
					// filter out brackets from beginning and end
					t = t.split(/,(?![^([{]*[\])}])/g).map(p => typeof p === 'string' ? p.trim() : null);
					// split by comma if not inside object, array, etc
					return t.map(tagValue => {
						try {
							if (!isNaN(parseInt(tagValue))) return tagValue;
							// don't eval if it's a number-as-string cause it'll turn into number
							return eval(tagValue);
						}
						catch (e) {
							return tagValue;
						}
					});
				});
			}); // get matches and split them into nested array of tag name and possible eval input
			let tagged;

			for (const tag of tags) {
				let evaled, tagError;
				try {
					if (tag[0] === 'eval' && tag[1]) {
						evaled = eval(tag[1]);
					}
					else if (typeof this.tags[tag[0]] === 'function') {
						evaled = await this.tags[tag[0]](...tag[1] || '');
					}
					else {
						evaled = this.tags[tag[0]];
					}
				}
				catch (e) {
					if (this.tags.hasOwnProperty(tag[0]) || tag[0] === 'eval') {
						evaled = '[<Tag errored>]';
						message.client.logger.error(`Tag '${tag[0]}' errored!:\n${tagError || e}\nWere you trying to use more than 1 tag at once?`);
					} // only record error if the tag actually exists or is an eval tag
				}

				if (evaled) tagged = (tagged || message.content).replace(tagCall[i - 1].tag, evaled);

			}

			return tagged !== message.content ? message.edit(tagged) : null;
		} // tags

		else if (!message.content.startsWith(message.client.config.commandPrefix)) { return; }
		// no tag + no prefix

		const { commands, aliases, config, logger } = message.client;

		const [name, ...args] = message.content.replace(config.commandPrefix, '').trim().split(/ +/g);
		const command = commands.get(name.toLowerCase()) || commands.get(aliases.get(name.toLowerCase()));

		if (!command) return;

		if (command.guildOnly && message.channel.type !== 'text') {
			return message.edit(`The ${command.name} command is only available on servers.`).then(msg => msg.delete(3000));
		}

		if (this.disabledCommands.includes(command.name)) return;

		if (command.args.length && args.length < command.args.length && !('defaultVal' in command.args.last())) {
			const correctSyntax = `${config.commandPrefix}${command.name} ${command.args.map(a => `<${a.name}>`).join(' ')}`;
			return message.edit(`you didn't provide enough arguments! The correct format would be:\n\`${correctSyntax}\``)
				.then(msg => msg.delete(3000));
		}

		const parsedArgs = command.args.length ? await this.parseArguments(args, command, message) : args;

		if (!parsedArgs) return;

		const userData = ['addquote', 'sendquote', 'delquote', 'listquotes'].includes(command.name)
			? { savedQuotes: require('../data/savedQuotes.json') }
			: ['emote', 'addfav', 'delfav', 'listfavs'].includes(command.name)
				? { favoriteEmotes: require('../data/favoriteEmotes.json') }
				: command.name === 'managetags'
					? { tags: this.tags }
					: null;

		return command.run(message, parsedArgs, userData).catch(e => {
			logger.error(inspect(e));
			return message.edit(`An error occurred while executing the \`${command.name}\` command.`).then(msg => msg.delete(3000));
		});
	}

	async parseArguments(args, command, message) {
		const parsedArgs = {};
		const beginning = args.slice(0, command.args.length - 1);
		const end = args.slice(beginning.length, args.length).join(' ');
		const entries = beginning.concat(end).entries();

		for (const [i, arg] of entries) {
			const { name, type, defaultVal } = command.args[i];
			if (!name) throw Error(`No argument name supplied at command: ${command.name}`);
			if (!type) throw Error(`No argument type supplied at command: ${command.name}`);

			parsedArgs[name] = 'defaultVal' in command.args[i] && !arg ? defaultVal : ArgumentParser.parse(type, message, arg);

			if (parsedArgs[name] instanceof Promise) {
				parsedArgs[name] = await parsedArgs[name];
			}

			if (parsedArgs[name] === null) {
				message.edit(`invalid input for the \`${name}\` argument! Expected \`${type}\`.`).then(msg => msg.delete(3000));
				return undefined;
			}
		}

		return parsedArgs;
	}
}

module.exports = CommandController;