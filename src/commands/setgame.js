const Command = require('../structures/Command');

class SetGameCommand extends Command {
	constructor() {
		super({
			name: 'setgame',
			description: 'Set the game you\'ll be shown to be playing',
			aliases: ['sg'],
			args: [
				{
					type: 'string',
					name: 'input',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		if (args.input && (args.input.length < 2 || args.input.length > 32)) {
			return message.edit('New game may not be shorter than 2 or longer than 32 characters!')
				.then(msg => msg.delete(3000));
		}

		const action = args.input !== '' ? `set your game to \`${args.input}\`` : `cleared your game`;

		message.client.user.setGame(args.input).then(user => {
			message.edit(`Successfully ${action}!`).then(msg => msg.delete(2000));
			message.client.logger.info(action.capitalize());
		});
	}
}

module.exports = SetGameCommand;