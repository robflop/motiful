const Command = require('../structures/Command');

class PingCommand extends Command {
	constructor() {
		super({
			name: 'ping',
			description: 'Measure the delay between command call and execution',
			aliases: ['delay']
		});
	}

	async run(message, args) {
		return message.edit('Pinging...').then(msg => {
			const delay = msg.editedAt - msg.createdAt;
			if (delay > 198500) return msg.edit(`Pong! (${delay}ms)`);
			// failsafe for massive ping that would exceed 2k char count, lol
			return msg.edit(`P${'o'.repeat(Math.ceil(delay / 100))}ng! (${delay}ms)`);
		});
	}
}

module.exports = PingCommand;