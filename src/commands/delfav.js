const Command = require('../structures/Command');

class DelFavCommand extends Command {
	constructor() {
		super({
			name: 'delfav',
			description: 'Delete an emote from the favorites list',
			aliases: ['df'],
			args: [
				{
					type: 'string',
					name: 'emoteName'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { favoriteEmotes } = userData;
		if (!favoriteEmotes.hasOwnProperty(args.emoteName)) {
			return message.edit(`Emote \`${args.emoteName}\` not found on the favorites list!`).then(msg => msg.delete(3000));
		}
		delete favoriteEmotes[args.emoteName];
		message.client.logger.writeJSON(favoriteEmotes, './data/favoriteEmotes.json')
			.then(favorites => {
				message.edit(`Emote \`${args.emoteName}\` successfully removed from the favorites list!`).then(msg => msg.delete(2000));
			})
			.catch(err => {
				message.edit(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
			});
	}
}

module.exports = DelFavCommand;