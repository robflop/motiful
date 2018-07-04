const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

class QuoteCommand extends Command {
	constructor() {
		super({
			name: 'quote',
			description: 'Quote a message (Out of the last 100 overall messages)',
			aliases: ['q'],
			args: [
				{
					type: 'user',
					name: 'user'
				},
				{
					type: 'string',
					name: 'input',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		let snippet, response;

		if (message.content.includes('|')) {
			snippet = args.input.substring(0, args.input.indexOf('|') - 1).trim();
			response = args.input.substring(args.input.indexOf('|') + 1).trim();
		}
		else {
			snippet = args.input.trim();
		}

		message.channel.messages.fetch({ limit: 100 }).then(async messages => {
			if (messages.has(message.id)) messages.delete(message.id);
			// delete command call from collection if it exists within
			const quoteMsg = messages.filter(msg => msg.author.id === args.user.id && msg.content.toLowerCase().includes(snippet)).first();

			if (!quoteMsg) return message.edit('Message not found!').then(msg => msg.delete({ timeout: 2000 }));
			if (!quoteMsg.member) quoteMsg.member = await quoteMsg.guild.members.fetch(quoteMsg.author.id);

			const name = quoteMsg.author.username, avatar = quoteMsg.author.avatarURL({ format: 'png', size: 128 });
			const embed = new MessageEmbed()
				.setColor(quoteMsg.member.displayHexColor)
				.setAuthor(name, avatar)
				.setDescription(quoteMsg.content)
				.setFooter(`#${quoteMsg.channel.name}`)
				.setTimestamp();

			return message.edit({ embed }).then(msg => {
				if (response) msg.channel.send(response);
			});
		});
	}
}

module.exports = QuoteCommand;