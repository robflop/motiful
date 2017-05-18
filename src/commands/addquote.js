const Command = require('../structures/Command');
const { RichEmbed, Collection } = require('discord.js');
const moment = require('moment');

class AddQuoteCommand extends Command {
	constructor() {
		super({
			name: 'addquote',
			description: 'Save a quote of a message (Out of the last 100 overall messages)',
			args: [
				{
					type: 'string',
					name: 'quotename'
				},
				{
					type: 'user',
					name: 'user',
				},
				{
					type: 'string',
					name: 'snippet'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		await message.delete();
		message.channel.fetchMessages({ limit: 100 }).then(messages => {
			const quoteMsg = messages.filter(msg => msg.author.id === args.user.id && msg.content.toLowerCase().includes(args.snippet)).first();
			if (!quoteMsg) return message.channel.send('Message not found!').then(msg => msg.delete(2000));
			const date = moment(quoteMsg.createdTimestamp).format('Do MMM YYYY'), time = moment(quoteMsg.createdTimestamp).format('HH:mm:ss');
			const name = quoteMsg.author.username, avatar = quoteMsg.author.avatarURL();
			const embed = new RichEmbed()
				.setColor('RANDOM')
				.setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
				.setDescription(quoteMsg.content);
			savedQuotes[args.quotename] = { author: `${name} wrote on the ${date} at ${time}:`, content: quoteMsg.content, avatar: avatar };
			return message.client.logger.writeJSON(savedQuotes, './data/savedQuotes.json').then(quotes => {
				message.channel.send(`**__The following quote was successfully saved under the name \`${args.quotename}\`:__**`, { embed })
					.then(msg => msg.delete(3000));
			});
		});
	}
}

module.exports = AddQuoteCommand;