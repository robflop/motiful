const Command = require('../structures/Command');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

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
		let commandCalled = true;
		/* hacky af but i can't be bothered to mess around
			with trying to remove the listener any longer
			maybe fix this in the future idk
		*/

		const reactionTimeout = message.client.setTimeout(() => { // eslint-disable-line arrow-body-style
			message.edit('No appropriate reaction (💬) was detected within the timeframe!').then(msg => msg.delete(300));
			commandCalled = false;
		}, 1000 * 30);

		function reactionListener(messageReaction, user) {
			if (!messageReaction.me || messageReaction.emoji.name !== '💬' || !commandCalled) return;
			else clearTimeout(reactionTimeout);

			messageReaction.remove();
			const date = moment(messageReaction.message.createdTimestamp).format('Do MMM YYYY');
			const time = moment(messageReaction.message.createdTimestamp).format('HH:mm:ss');
			const name = messageReaction.message.author.username, avatar = messageReaction.message.author.avatarURL;
			const embed = new RichEmbed()
				.setColor('RANDOM')
				.setAuthor(`${name} wrote on the ${date} at ${time}`, avatar)
				.setDescription(`\`${messageReaction.message.content}\``);

			return message.edit({ embed }).then(msg => {
				if (args.response) msg.channel.send(args.response);
				commandCalled = false;
			});
		}

		return message.client.on('messageReactionAdd', (messageReaction, user) => reactionListener(messageReaction, user));
	}
}

module.exports = QuoteReactCommand;