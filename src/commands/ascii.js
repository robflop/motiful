const Command = require('../structures/Command');
const axios = require('axios');
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
		axios.get(`http://artii.herokuapp.com/make?text=${args.input}`)
			.then(ascii => {
				if (ascii.data.length > 1999) {
					return message.edit('Output too long. Try shorter text.').then(msg => msg.delete({ timeout: 2000 }));
				}
				return message.edit(`\`\`\`${ascii.data}\`\`\``);
			})
			.catch(err => {
				const errorDetails = `${err.host ? err.host : ''} ${err.message ? err.message : ''}`.trim();
				message.edit(`An error occurred sending the request: \`${err.code}: ${errorDetails}\``).then(msg => msg.delete({ timeout: 3000 }));
				return logger.error(inspect(err));
			});
	}
}

module.exports = AsciiCommand;