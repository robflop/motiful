const Command = require('../structures/Command');

class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			description: 'Get usage help',
			aliases: ['h', 'commands'],
		});
	}

	async run(message, args) {
		return message.edit('Refer to https://github.com/robflop/motiful/wiki/Usage for extensive Usage help.').then(msg => msg.delete(5000));
	}
}

module.exports = HelpCommand;