const Command = require('../structures/Command');

class DelFavCommand extends Command {
	constructor() {
		super({
			name: 'delfav',
			description: 'Delete a favorite command',
			args: [
				{
					type: 'string',
					name: 'name'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { favoriteEmotes } = userData;
		if (!favoriteEmotes.hasOwnProperty(args.name)) {
			return message.edit(`Emote \`${args.name}\` not found on the favorites list!`).then(msg => msg.delete(3000));
		}
		delete favoriteEmotes[args.name];
		message.client.logger.writeJSON(favoriteEmotes, './data/favoriteEmotes.json')
			.then(quotes => {
				message.edit(`Emote \`${args.name}\` successfully removed from the favorites list!`).then(msg => msg.delete(2000));
			})
			.catch(err => {
				message.edit(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
			});
	}
}

module.exports = DelFavCommand;