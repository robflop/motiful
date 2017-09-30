const { inspect } = require('util');

require('../util/prototypes');
const ArgumentParser = require('./ArgumentParser');

class CommandController {
	constructor() {
		this.disabledCommands = require('../data/disabledCommands.json');
		this.tags = require('../data/tags.js');
		this.tagRegex = /\[([^[\]:]*)(?::?\s*(.*))\]/g;
		this.userData = {
			savedQuotes: require('../data/savedQuotes.json'),
			favoriteEmotes: require('../data/favoriteEmotes.json'),
			tags: this.tags
		};
	}

	async handleCommand(message) { // eslint-disable-line complexity
		if (message.author.id !== message.client.user.id) return;

		if (!message.content.startsWith(message.client.config.commandPrefix) && this.tagRegex.test(message.content)) {
			const tagCall = message.content.match(this.tagRegex)[0];
			// save original call to replace in message later
			const tag = tagCall.split(/:(?![^{]*[}])/).map(t => {
				// split by colon if not inside json
				t = t.trim();
				if (t[t.length - 1] === ']') t = t.replace(t[t.length - 1], '');
				if (t[0] === '[') t = t.replace(t[0], '');
				// filter out brackets from beginning and end
				if (this.tags.hasOwnProperty(t) || t === 'eval') return t;
				// don't eval tag keywords or the eval keyword
				t = t.split(/,(?![^([{]*[\])}])/g).map(p => typeof p === 'string' ? p.trim() : null).map(tagValue => {
					// split by comma if not inside object, array, etc
					try {
						if (tagValue.match(/^["'`]\d*["'`]$/)) return tagValue = tagValue.replace(/["'`]/g, '');
						// don't evaluate if number enclosed by strings and remove extra quotes
						return eval(tagValue);
						// try evaluating to get references to existing objects like message or client
					}
					catch (e) {
						return tagValue;
						// return plain value if evaluating yielded no result (e.g. value is a non-quoted string)
					}
				});
				return t.length === 1 ? t[0] : t;
				// avoid nesting array too deep cause it's annoying
			});

			let tagged, evaled, tagError;

			try {
				const actualTag = this.tags[tag[0]];

				if (tag[0] === 'eval' && tag[1]) {
					evaled = eval(tag[1]);
					// eval again to properly be able to return errors etc
				}
				else if (typeof actualTag === 'function') {
					evaled = tag[1]
						? ['string', 'number'].includes(typeof tag[1])
							? await actualTag(message, tag[1])
							: await actualTag(message, ...tag[1])
						: await actualTag(message);
				}
				else {
					evaled = actualTag;
				}
			}
			catch (e) {
				if (this.tags.hasOwnProperty(tag[0]) || tag[0] === 'eval') {
					evaled = '[<Tag errored>]';
					message.client.logger.error(`Tag '${tag[0]}' errored!:\n${tagError || e}\nWere you trying to use more than 1 tag at once?`);
				} // only record error if the tag actually exists or is an eval tag
			}

			if (typeof evaled !== 'undefined') tagged = (tagged || message.content).replace(tagCall, evaled);

			return tagged && tagged !== message.content ? message.edit(tagged) : null;
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

		return command.run(message, parsedArgs, this.userData).catch(e => {
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