const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

class AddQuoteCommand extends Command {
	constructor() {
		super({
			name: 'addquote',
			description: 'Save a quote of a message (Out of the last 100 overall messages)',
			aliases: ['aq'],
			args: [
				{
					type: 'string',
					name: 'quoteName'
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

		message.channel.messages.fetch({ limit: 100 }).then(async messages => {
			const quoteMsg = messages.filter(msg => msg.author.id === args.user.id && msg.content.toLowerCase().includes(args.snippet)).first();

			if (!quoteMsg) return message.channel.send('Message not found!').then(msg => msg.delete({ timeout: 2000 }));
			if (!quoteMsg.member) quoteMsg.member = await quoteMsg.guild.members.fetch(quoteMsg.author.id);

			const name = quoteMsg.author.username, avatar = quoteMsg.author.avatarURL({ format: 'png', size: 128 });
			const embed = new MessageEmbed()
				.setColor(quoteMsg.member.displayHexColor)
				.setAuthor(name, avatar)
				.setDescription(quoteMsg.content)
				.setFooter(`#${quoteMsg.channel.name}`)
				.setTimestamp();

			savedQuotes[args.quoteName] = embed;

			message.client.logger.writeJSON(savedQuotes, './data/savedQuotes.json')
				.then(quotes => {
					message.channel.send(`**__The following quote was successfully saved under the name \`${args.quoteName}\`:__**`, { embed })
						.then(msg => msg.delete({ timeout: 3000 }));
				})
				.catch(err => {
					message.channel.send(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete({ timeout: 3000 }));
				});
		});
	}
}

module.exports = AddQuoteCommand;