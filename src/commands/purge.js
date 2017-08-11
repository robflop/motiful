const Command = require('../structures/Command');

class PurgeCommand extends Command {
	constructor() {
		super({
			name: 'purge',
			description: 'Purge your messages (In the last 100 overall Messages)',
			aliases: ['prune', 'p'],
			args: [
				{
					type: 'number',
					name: 'amount'
				}
			]
		});
	}

	async run(message, args) {
		await message.delete();
		message.channel.fetchMessages({ limit: 100 }).then(messages => {
			messages = messages.filterArray(message => message.author.id === message.client.user.id).slice(0, args.amount);
			for (const message of messages) message.delete();
		});
	}
}

module.exports = PurgeCommand;