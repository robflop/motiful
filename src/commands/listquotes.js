const Command = require('../structures/Command');

class ListQuotesCommand extends Command {
	constructor() {
		super({
			name: 'listquotes',
			description: 'List all saved quotes',
			aliases: ['lq'],
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		if (Object.keys(savedQuotes).length === 0) return message.edit('No quotes have been saved!').then(msg => msg.delete(3000));
		message.edit(`**__Available quotes are:__**\`\`\`${Object.keys(savedQuotes).join(', ')}\`\`\``).then(msg => msg.delete(5000));
	}
}

module.exports = ListQuotesCommand;