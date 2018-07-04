const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

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

		if (!args.message.member) args.message.member = await args.message.guild.members.fetch(args.message.author.id);

		const name = args.message.author.username, avatar = args.message.author.avatarURL({ format: 'png', size: 128 });
		const embed = new MessageEmbed()
			.setColor(args.message.member.displayHexColor)
			.setAuthor(name, avatar)
			.setDescription(args.message.content)
			.setFooter(`#${args.message.channel.name}`)
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
	}
}

module.exports = AddQuoteCommand;