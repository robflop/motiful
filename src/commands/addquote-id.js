const Command = require('../structures/Command');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

class AddQuoteCommand extends Command {
	constructor() {
		super({
			name: 'addquote-id',
			description: 'Save a quote of a message using a messageID',
			aliases: ['aqi'],
			args: [
				{
					type: 'string',
					name: 'quoteName'
				},
				{
					type: 'message',
					name: 'message',
				}
			]
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		await message.delete();
		const date = moment(args.message.createdTimestamp).format('Do MMM YYYY'), time = moment(args.message.createdTimestamp).format('HH:mm:ss');
		const name = args.message.author.username, avatar = args.message.author.avatarURL;

		const embed = new RichEmbed()
			.setColor('RANDOM')
			.setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
			.setDescription(args.message.content);

		savedQuotes[args.quoteName] = { author: `${name} wrote on the ${date} at ${time}:`, content: args.message.content, avatar: avatar };
		message.client.logger.writeJSON(savedQuotes, './data/savedQuotes.json')
			.then(quotes => {
				message.channel.send(`**__The following quote was successfully saved under the name \`${args.quoteName}\`:__**`, { embed })
					.then(msg => msg.delete(3000));
			})
			.catch(err => {
				message.channel.send(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
			});
	}
}

module.exports = AddQuoteCommand;