const Command = require('../structures/Command');
const { Attachment } = require('discord.js');
const snekfetch = require('snekfetch');
const { join } = require('path');
const { readdirSync } = require('fs');
const globalEmotes = require('../data/twitchemotes/global.json');
// const subEmotes = require('../data/twitchemotes/subscriber.json');
const bttv = require('../data/twitchemotes/bttv.json');

class EmoteCommand extends Command {
	constructor() {
		super({
			name: 'emote',
			description: 'Post a twitch (global or subscriber [sub disabled]), FrankerFaceZ, BetterTwitchTV or custom emote into chat',
			aliases: ['em'],
			args: [
				{
					type: 'string',
					name: 'channelName'
				},
				{
					type: 'string',
					name: 'emoteName',
					defaultVal: ''
				},
				{
					type: 'string',
					name: 'emoteSize',
					defaultVal: 'small'
				}
			]
		});
	}

	async run(message, args, userData) { // eslint-disable-line complexity
		const { favoriteEmotes } = userData;
		const customEmoteFolder = join(__dirname, '..', 'data', 'customemotes');
		const emoteSizes = {
			globalAndSub: { small: '1.0', medium: '2.0', big: '3.0' },
			ffz: { small: 1, medium: 2, big: 4 },
			bttv: { small: 1, medium: 2, big: 3 }
		};

		message.delete();
		args.emoteSize ? args.emoteSize = args.emoteSize.toLowerCase() : null;

		if (globalEmotes[args.channelName] /* || subEmotes.channels[args.channelName] */) {
			let emote, actualChannel;
			if (globalEmotes[args.channelName]) {
				args.emoteSize = emoteSizes.globalAndSub[args.emoteName] || emoteSizes.globalAndSub.small;
				args.emoteName = args.channelName;
				delete args.channelName;
				// shift arguments because global doesn't take channel name
				emote = globalEmotes[args.emoteName];
			}
			// else if (subEmotes.channels[args.channelName]) {
			// 	actualChannel = true;
			// 	emote = subEmotes.channels[args.channelName.toLowerCase()].emotes.filter(emote => emote.code === args.emoteName)[0] || '';
			// 	args.emoteSize = emoteSizes.globalAndSub[args.emoteSize] || emoteSizes.globalAndSub.small;
			// }
			const wasActualChannel = actualChannel ? ` on the \`${args.channelName}\` channel` : '';
			if (!emote) {
				return message.channel.send(`Emote \`${args.emoteName}\` not found${wasActualChannel}!`).then(msg => msg.delete(3000));
			}
			const emoteID = emote.id;
			const emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${args.emoteSize}`;
			return message.channel.send(new Attachment(emoteURL, `${args.emoteName}.png`));
		}
		// twitchemotes.com subscriber emotes disabled until a search endpoint is implemented
		else if (args.channelName === 'ffz') {
			try {
				args.emoteSize = emoteSizes.ffz[args.emoteSize] || emoteSizes.ffz.small;
				const ffzEmotes = await snekfetch.get(`http://api.frankerfacez.com/v1/emoticons?q=${args.emoteName}&page=1&private=on`);
				const emote = ffzEmotes.body.emoticons.filter(emote => emote.name === args.emoteName)[0] || '';
				if (!emote) {
					return message.channel.send(`Emote \`${args.emoteName}\` not found on FrankerFaceZ!`).then(msg => msg.delete(3000));
				}
				const emoteID = emote.id;
				const emoteURL = `http://cdn.frankerfacez.com/emoticon/${emoteID}/${args.emoteSize}`;
				return message.channel.send(new Attachment(emoteURL, `${args.emoteName}.png`));
			}
			catch (err) {
				const errorDetails = `${err.host ? err.host : ''} ${err.message ? err.message : ''}`.trim();
				message.client.logger.error(err);
				return message.channel.send(`An error occurred sending the request: \`${err.code}: ${errorDetails}\``).then(msg => msg.delete(3000));
			}
		}
		else if (args.channelName === 'bttv') {
			args.emoteSize = emoteSizes.bttv[args.emoteSize] || emoteSizes.bttv.small;
			const emote = bttv.emotes.filter(emote => emote.code === args.emoteName)[0] || '';
			if (!emote) {
				return message.channel.send(`Emote \`${args.emoteName}\` not found on BetterTwitchTV!`).then(msg => msg.delete(3000));
			}
			const emoteID = emote.id;
			const emoteURL = `https://cdn.betterttv.net/emote/${emoteID}/${args.emoteSize}x`;
			return message.channel.send(new Attachment(emoteURL, `${args.emoteName}.${emote.imageType}`));
		}
		else if (favoriteEmotes.hasOwnProperty(args.channelName)) {
			const favorite = favoriteEmotes[args.channelName];
			args.emoteSize = args.emoteName.toLowerCase();
			// shift arg because fav shortcut doesn't take channel
			delete args.emoteName;
			delete args.channelName;
			if (favorite.channelName === 'ffz') {
				args.emoteSize = emoteSizes.ffz[args.emoteSize] || emoteSizes.ffz.small;
				const emoteURL = `http://cdn.frankerfacez.com/emoticon/${favorite.emoteID}/${args.emoteSize}`;
				return message.channel.send(new Attachment(emoteURL, `${favorite.emoteName}.png`));
			}
			else if (favorite.channelName === 'bttv') {
				args.emoteSize = emoteSizes.bttv[args.emoteSize] || emoteSizes.bttv.small;
				const emoteURL = `https://cdn.betterttv.net/emote/${favorite.emoteID}/${args.emoteSize}x`;
				const imageType = bttv.emotes.filter(emote => emote.code === favorite.emoteName)[0].imageType;
				return message.channel.send(new Attachment(emoteURL, `${favorite.emoteName}.${imageType}`));
			}
			else {
				args.emoteSize = emoteSizes.globalAndSub[args.emoteSize] || emoteSizes.globalAndSub.small;
				const emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${favorite.emoteID}/${args.emoteSize}`;
				return message.channel.send(new Attachment(emoteURL, `${favorite.emoteName}.png`));
			}
		}
		else {
			args.emoteName = args.channelName;
			// shift arg because custom emote doesn't take channel or size
			delete args.channelName;
			args.emoteSize ? delete args.emoteSize : null;
			const customEmoteExtensions = ['png', 'jpg', 'gif', 'jpeg', 'webp'];
			const customEmoteRegex = new RegExp(`${args.emoteName}.(${customEmoteExtensions.join('|')})`);
			const customEmote = readdirSync(customEmoteFolder).filter(file => customEmoteRegex.test(file))[0] || '';
			if (customEmote) {
				const emotePath = join(customEmoteFolder, customEmote);
				return message.channel.send(new Attachment(emotePath, customEmote));
			}
			else {
				return message.channel.send(`Emote \`${args.emoteName}\` not found in your custom emotes, on Twitch, FrankerFacez or BetterTwitchTV.`)
					.then(msg => msg.delete(3000));
			}
		}
	}
}

module.exports = EmoteCommand;