const Command = require('../structures/Command');

class PingCommand extends Command {
	constructor() {
		super({
			name: 'ping',
			description: 'Measure the delay between command call and execution',
			aliases: ['p']
		});
	}

	async run(message, args) {
		return message.edit('Pinging...').then(msg => {
			const delay = msg.editedAt - msg.createdAt;
			return msg.edit(`P${'o'.repeat(delay / 100)}ng! (${delay}ms)`);
		});
	}
}

module.exports = PingCommand;