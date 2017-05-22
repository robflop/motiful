const Command = require('../structures/Command');

class DelQuoteCommand extends Command {
	constructor() {
		super({
			name: 'delquote',
			description: 'Delete a saved quote',
			aliases: ['dq'],
			args: [
				{
					type: 'string',
					name: 'quoteName'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		if (!savedQuotes.hasOwnProperty(args.quoteName)) {
			return message.edit('Quote not found!').then(msg => msg.delete(3000));
		}
		delete savedQuotes[args.quoteName];
		message.client.logger.writeJSON(savedQuotes, './data/savedQuotes.json')
			.then(quotes => {
				message.edit(`Quote \`${args.quoteName}\` successfully deleted!`).then(msg => msg.delete(2000));
			})
			.catch(err => {
				message.edit(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
			});
	}
}

module.exports = DelQuoteCommand;