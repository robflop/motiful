const Command = require('../structures/Command');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

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
		const date = moment(args.message.createdTimestamp).format('Do MMM YYYY'), time = moment(args.message.createdTimestamp).format('HH:mm:ss');
		const name = args.message.author.username, avatar = args.message.author.avatarURL;
		const embed = new RichEmbed()
			.setColor('RANDOM')
			.setAuthor(`${name} wrote on the ${date} at ${time}`, avatar)
			.setDescription(`\`${args.message.content}\``);
		return message.edit({ embed }).then(msg => {
			if (args.response) msg.channel.send(args.response);
		});
	}
}

module.exports = QuoteIDCommand;