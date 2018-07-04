const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

class QuoteReactCommand extends Command {
	constructor() {
		super({
			name: 'quote-react',
			description: 'Quote a message by using a \'💬\' message reaction',
			aliases: ['qr'],
			args: [
				{
					type: 'string',
					name: 'response',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		message.edit('Response saved, react to a message using the 💬 emoji within the next 30 seconds to quote it.');

		const reactionTimeout = message.client.setTimeout(() => {
			message.edit('No appropriate reaction (💬) was detected within the timeframe!').then(msg => msg.delete({ timeout: 3000 }));
			message.client.removeListener('messageReactionAdd', reactionListener);
		}, 1000 * 30);

		async function reactionListener(messageReaction, user) {
			if (!messageReaction.me || messageReaction.emoji.name !== '💬') return;
			else {
				clearTimeout(reactionTimeout);
				message.client.removeListener('messageReactionAdd', reactionListener);
			}

			messageReaction.remove();

			if (!messageReaction.message.member) {
				messageReaction.message.member = await messageReaction.message.guild.members.fetch(messageReaction.message.author.id);
			}

			const name = messageReaction.message.author.username, avatar = messageReaction.message.author.avatarURL({ format: 'png', size: 128 });
			const embed = new MessageEmbed()
				.setColor(messageReaction.message.member.displayHexColor)
				.setAuthor(name, avatar)
				.setDescription(messageReaction.message.content)
				.setFooter(`#${messageReaction.message.channel.name}`)
				.setTimestamp();

			return message.edit({ embed }).then(msg => {
				if (args.response) msg.channel.send(args.response);
			});
		}

		return message.client.on('messageReactionAdd', reactionListener);
	}
}

module.exports = QuoteReactCommand;