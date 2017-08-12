const Command = require('../structures/Command');

class ToggleCommand extends Command {
	constructor() {
		super({
			name: 'toggle',
			description: 'Toggle a command on or off',
			aliases: ['t'],
			perms: {
				member: ['KICK_MEMBERS', 'BAN_MEMBERS']
			},
			args: [
				{
					type: 'string',
					name: 'targetCommand'
				}
			]
		});
	}

	async run(message, args) {
		const { logger, commands, aliases } = message.client;
		const cb = '```', icb = '``';

		if (['help', 'toggle', 'power'].includes(args.targetCommand)) {
			return message.edit(`The ${icb}${args.targetCommand}${icb} command may not be toggled.`).then(msg => msg.delete(3000));
		}

		if (!commands.has(args.targetCommand) && !aliases.has(args.targetCommand)) {
			return message.edit(`The ${icb}${args.targetCommand}${icb} command does not exist.`).then(msg => msg.delete(3000));
		}

		const disabledCommandList = require('../data/disabledCommands.json');
		const index = disabledCommandList.indexOf(args.targetCommand);
		if (index === -1) {
			disabledCommandList.push(args.targetCommand);
			logger.writeJSON(disabledCommandList, './data/disabledCommands.json')
				.then(disabledCommandList => message.edit(`The ${icb}${args.targetCommand}${icb} command has been disabled!`)
					.then(msg => msg.delete(2000)))
				.catch(err => message.edit(`An error occurred writing to the file: ${cb}${err}${cb}`)
					.then(msg => msg.delete(3000)));
		}
		else {
			disabledCommandList.splice(index, 1);
			logger.writeJSON(disabledCommandList, './data/disabledCommands.json')
				.then(disabledCommandList => message.edit(`The ${icb}${args.targetCommand}${icb} command has been enabled!`)
					.then(msg => msg.delete(2000)))
				.catch(err => message.edit(`An error occurred writing to the file: ${cb}${err}${cb}`)
					.then(msg => msg.delete(3000)));
		}
	}
}

module.exports = ToggleCommand;