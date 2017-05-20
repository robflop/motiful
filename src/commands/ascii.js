const Command = require('../structures/Command');
const snekfetch = require('snekfetch');
const { inspect } = require('util');

class AsciiCommand extends Command {
	constructor() {
		super({
			name: 'ascii',
			description: 'Turn your input into ascii text',
			args: [
				{
					type: 'string',
					name: 'input'
				}
			],
		});
	}

	async run(message, args) {
		const { logger } = message.client;
		snekfetch.get(`http://artii.herokuapp.com/make?text=${args.input}`)
			.then(ascii => {
				if (ascii.text.length > 1999) return message.edit('Output too long. Try shorter text.').then(message => message.delete(2000));
				return message.edit(`\`\`\`${ascii.text}\`\`\``);
			})
			.catch(err => {
				const errorDetails = `${err.host ? err.host : ''} ${err.message ? err.message : ''}`.trim();
				message.edit(`An error occurred sending the request: \`${err.code}: ${errorDetails}\``).then(msg => msg.delete(3000));
				return logger.error(inspect(err));
			});
	}
}

module.exports = AsciiCommand;