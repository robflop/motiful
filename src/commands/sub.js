const Command = require('../structures/Command');

class SubCommand extends Command {
	constructor() {
		super({
			name: 'sub',
			description: 'Replace a part of one of your messages (Only from last 100 overall Messages)',
			aliases: ['s'],
			args: [
				{
					type: 'string',
					name: 'input'
				}
			]
		});
	}

	async run(message, args) {
		const toReplace = args.input.substring(0, args.input.indexOf('|') - 1).trim().split(';');
		const replaceWith = args.input.substring(args.input.indexOf('|') + 1).trim().split(';');
		await message.delete();

		message.channel.fetchMessages({ limit: 100 }).then(messages => {
			const targetMessage = messages.filter(msg => {
				msg.author.id === msg.client.user.id;
				return toReplace.every(word => msg.content.toLowerCase().includes(word.toLowerCase()));
			}).first();

			for (let i = 0; i < toReplace.length; i++) {
				targetMessage.content = targetMessage.content.replace(toReplace[i], replaceWith[i]);
			}

			return targetMessage.edit(targetMessage.content);
		});
	}
}

module.exports = SubCommand;