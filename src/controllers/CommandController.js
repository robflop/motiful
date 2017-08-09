const { inspect } = require('util');

require('../util/prototypes');
const ArgumentParser = require('./ArgumentParser');

class CommandController {
	constructor() {
		this.disabledCommands = require('../data/disabledCommands.json');
		this.tags = require('../data/tags.json');
		this.tagRegex = /\[([^[\]\s]*) ?([^[\]]*?)\]/g;
	}

	async handleCommand(message) {
		if (message.author.id !== message.client.config.ownerID) return;

		if (!message.content.startsWith(message.client.config.commandPrefix) && this.tagRegex.test(message.content)) {
			const tags = message.content.match(this.tagRegex).map(tag => tag.split(':').map(t => t.replace(/[[\]\s]/g, '')));
			// get matches and split them into tag name / eval input if there is any, plus trimming brackets and whitespaces
			let tagged;

			tags.forEach(tag => {
				tagged = (tag.length === 2) // eslint-disable-line no-extra-parens
					? (tagged || message.content).replace(`[${tag.join(': ')}]`, eval(tag[1]))
					: (tagged || message.content).replace(`[${tag[0]}]`, this.tags[tag[0]] || `[${tag[0]}]`);
			});

			tagged !== message.content ? message.edit(tagged) : null;
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