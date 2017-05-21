const Command = require('../structures/Command');

class ListFavsCommand extends Command {
	constructor() {
		super({
			name: 'listfavs',
			description: 'List all saved favorite emotes',
			aliases: ['lf'],
		});
	}

	async run(message, args, userData) {
		const { favoriteEmotes } = userData;
		if (Object.keys(favoriteEmotes).length === 0) return message.edit('No emotes have been favorited!').then(msg => msg.delete(3000));
		message.edit(`**__Available quotes are:__**\`\`\`${Object.keys(favoriteEmotes).join(', ')}\`\`\``).then(msg => msg.delete(5000));
	}
}

module.exports = ListFavsCommand;