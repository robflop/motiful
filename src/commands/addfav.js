const Command = require('../structures/Command');
const snekfetch = require('snekfetch');
const subEmotes = require('../data/twitchemotes/subscriber.json');
const bttv = require('../data/twitchemotes/bttv.json');

class AddFavCommand extends Command {
	constructor() {
		super({
			name: 'addfav',
			description: 'Add an emote to the favorites list',
			args: [
				{
					type: 'string',
					name: 'channelname'
				},
				{
					type: 'string',
					name: 'emotename'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { favoriteEmotes } = userData;
		if (favoriteEmotes.hasOwnProperty(args.emotename)) {
			return message.edit(`Emote \`${args.emotename}\` is already on the favorites list!`).then(msg => msg.delete(3000));
		}
		let emote, emoteID; // placeholder
		args.channelname = args.channelname.toLowerCase();

		if (subEmotes.channels[args.channelname]) {
			emote = subEmotes.channels[args.channelname].emotes.filter(emote => emote.code === args.emotename)[0] || '';
			if (!emote) {
				return message.edit(`Emote \`${args.emotename}\` not found on the \`${args.channelname}\` channel!`).then(msg => msg.delete(3000));
			}
			emoteID = emote.image_id;
		}
		else if (args.channelname === 'bttv') {
			emote = bttv.emotes.filter(emote => emote.code === args.emotename)[0] || '';
			if (!emote) {
				return message.edit(`Emote \`${args.emotename}\` not found on BetterTwitchTV!`).then(msg => msg.delete(3000));
			}
			emoteID = emote.id;
		}
		else if (args.channelname === 'ffz') {
			try {
				const emotes = await snekfetch.get(`http://api.frankerfacez.com/v1/emoticons?q=${args.emotename}&page=1&private=on`);
				emote = emotes.body.emoticons.filter(emote => emote.name === args.emotename)[0] || '';
				if (!emote) {
					return message.edit(`Emote \`${args.emotename}\` not found on FrankerFaceZ!`).then(msg => msg.delete(3000));
				}
				emoteID = emote.id;
			}
			catch (err) {
				const errorDetails = `${err.host ? err.host : ''} ${err.message ? err.message : ''}`.trim();
				message.client.logger.error(err);
				return message.edit(`An error occurred sending the request: \`${err.code}: ${errorDetails}\``).then(msg => msg.delete(3000));
			}
		}
		else {
			return message.edit(`Twitch channel / Extension \`${args.channelname}\` not found!`).then(msg => msg.delete(3000));
		}

		if (emote) favoriteEmotes[args.emotename] = { channelName: args.channelname, emoteName: args.emotename, emoteID: emoteID };
		else return message.edit('Something went wrong fetching the emote!').then(msg => msg.delete(3000));

		return message.client.logger.writeJSON(favoriteEmotes, './data/favoriteEmotes.json')
			.then(favorites => {
				message.edit(`Emote \`${args.emotename}\` successfully added to favorites!`).then(msg => msg.delete(2000));
			})
			.catch(err => {
				message.edit(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
			});
	}
}

module.exports = AddFavCommand;