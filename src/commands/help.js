const Command = require('../structures/Command');

class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			description: 'Get usage help',
			aliases: ['h', 'commands'],
			args: [
				{
					type: 'string',
					name: 'command',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		return message.edit(`Refer to https://github.com/robflop/motiful/wiki/Usage#${args.command} for extensive Usage help.`)
			.then(msg => msg.delete(5000));
	}
}

module.exports = HelpCommand;