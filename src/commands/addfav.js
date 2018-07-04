const Command = require('../structures/Command');
const axios = require('axios');
// const subEmotes = require('../data/twitchemotes/subscriber.json');
const bttv = require('../data/twitchemotes/bttv.json');

class AddFavCommand extends Command {
	constructor() {
		super({
			name: 'addfav',
			description: 'Add an emote to the favorites list',
			aliases: ['af'],
			args: [
				{
					type: 'string',
					name: 'channelName'
				},
				{
					type: 'string',
					name: 'emoteName'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { favoriteEmotes } = userData;
		if (favoriteEmotes.hasOwnProperty(args.emoteName)) {
			return message.edit(`Emote \`${args.emoteName}\` is already on the favorites list!`).then(msg => msg.delete({ timeout: 3000 }));
		}
		let emote, emoteID; // placeholder
		args.channelName = args.channelName.toLowerCase();

		/* if (subEmotes.channels[args.channelName]) {
			emote = subEmotes.channels[args.channelName].emotes.filter(emote => emote.code === args.emoteName)[0] || '';
			if (!emote) {
				return message.edit(`Emote \`${args.emoteName}\` not found on the \`${args.channelName}\` channel!`)
					.then(msg => msg.delete({ timeout: 3000 }));
			}
			emoteID = emote.image_id;
		} // twitchemotes.com subscriber emotes disabled until a search endpoint is implemented
		else */if (args.channelName === 'bttv') {
			emote = bttv.emotes.filter(emote => emote.code === args.emoteName)[0] || '';
			if (!emote) {
				return message.edit(`Emote \`${args.emoteName}\` not found on BetterTwitchTV!`).then(msg => msg.delete({ timeout: 3000 }));
			}
			emoteID = emote.id;
		}
		else if (args.channelName === 'ffz') {
			try {
				const ffzEmotes = await axios.get(`http://api.frankerfacez.com/v1/emoticons?q=${args.emoteName}&page=1&private=on`);
				emote = ffzEmotes.data.emoticons.filter(emote => emote.name === args.emoteName)[0] || '';
				if (!emote) {
					return message.edit(`Emote \`${args.emoteName}\` not found on FrankerFaceZ!`).then(msg => msg.delete({ timeout: 3000 }));
				}
				emoteID = emote.id;
			}
			catch (err) {
				message.client.logger.error(err);
				return message.edit(`An error occurred sending the request: \`${err.message}\``).then(msg => msg.delete({ timeout: 3000 }));
			}
		}
		else {
			return message.edit(`Twitch channel / Extension \`${args.channelName}\` not found!`).then(msg => msg.delete({ timeout: 3000 }));
		}

		if (emote) favoriteEmotes[args.emoteName] = { channelName: args.channelName, emoteName: args.emoteName, emoteID: emoteID };
		else return message.edit('Something went wrong fetching the emote!').then(msg => msg.delete({ timeout: 3000 }));

		return message.client.logger.writeJSON(favoriteEmotes, './data/favoriteEmotes.json')
			.then(favorites => {
				message.edit(`Emote \`${args.emoteName}\` successfully added to favorites!`).then(msg => msg.delete({ timeout: 2000 }));
			})
			.catch(err => {
				message.edit(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete({ timeout: 3000 }));
			});
	}
}

module.exports = AddFavCommand;