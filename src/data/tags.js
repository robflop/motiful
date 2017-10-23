const { MessageEmbed, Attachment } = require('discord.js');

module.exports = {
	time: (message, d = new Date()) => `${d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`,
	shrug: '¯\\_(ツ)_/¯',
	emote: (message, emote) => {
		const emotes = message.client.emojis;
		const e = emotes.find(emoji => emoji.name.toLowerCase().startsWith(emote.toLowerCase()));
		if (e) message.edit(message.content.replace(`[emote: ${emote}]`, ''), { embed: new MessageEmbed().setImage(e.url) });
		else if (message.content === `[emote: ${emote}]`) message.delete();
		else message.edit(message.content.replace(`[emote: ${emote}]`, ''));
	},

	ping: (message, ms) => {
		message.edit('Pinging...').then(msg => {
			msg.client.setTimeout(() => {
				if (ms > 198500) return msg.channel.send(`Pong! (${ms}ms)`);
				else msg.channel.send(`P${'o'.repeat(Math.ceil(ms / 100))}ng! (${ms}ms)`);
			}, ms);
		});
	}
};