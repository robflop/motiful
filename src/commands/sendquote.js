const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

class SendQuoteCommand extends Command {
	constructor() {
		super({
			name: 'sendquote',
			description: 'Send a saved quote',
			aliases: ['sq'],
			args: [
				{
					type: 'string',
					name: 'quoteName'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		if (!savedQuotes.hasOwnProperty(args.quoteName)) {
			return message.edit('Quote not found!').then(msg => msg.delete({ timeout: 2000 }));
		}
		const quote = savedQuotes[args.quoteName];
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(quote.author, quote.avatar)
			.setDescription(quote.content);
		return message.edit({ embed });
	}
}

module.exports = SendQuoteCommand;