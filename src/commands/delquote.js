const Command = require('../structures/Command');

class DelQuoteCommand extends Command {
	constructor() {
		super({
			name: 'delquote',
			description: 'Delete a saved quote',
			args: [
				{
					type: 'string',
					name: 'quotename'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { savedQuotes } = userData;
		if (!savedQuotes.hasOwnProperty(args.quotename)) {
			return message.edit('Quote not found!').then(msg => msg.delete(3000));
		}
		delete savedQuotes[args.quotename];
		message.client.logger.writeJSON(savedQuotes, './data/savedQuotes.json')
			.then(quotes => message.edit(`Quote \`${args.quotename}\` successfully deleted!`))
				.then(msg => msg.delete(2000));
	}
}

module.exports = DelQuoteCommand;