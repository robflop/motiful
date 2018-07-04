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
		message.channel.messages.fetch({ limit: 100 }).then(messages => {
			messages.filter(message => message.author.id === message.client.user.id).first(args.amount).forEach(m => m.delete());
		});
	}
}

module.exports = PurgeCommand;