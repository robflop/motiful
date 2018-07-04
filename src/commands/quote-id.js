const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

class QuoteIDCommand extends Command {
	constructor() {
		super({
			name: 'quote-id',
			description: 'Quote a message using a message ID',
			aliases: ['qid'],
			args: [
				{
					type: 'message',
					name: 'message'
				},
				{
					type: 'string',
					name: 'response',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		if (!args.message.member) args.message.member = await args.message.guild.members.fetch(args.message.author.id);

		const name = args.message.author.username, avatar = args.message.author.avatarURL({ format: 'png', size: 128 });
		const embed = new MessageEmbed()
			.setColor(args.message.member.displayHexColor)
			.setAuthor(name, avatar)
			.setDescription(args.message.content)
			.setFooter(`#${args.message.channel.name}`)
			.setTimestamp();
		return message.edit({ embed }).then(msg => {
			if (args.response) msg.channel.send(args.response);
		});
	}
}

module.exports = QuoteIDCommand;