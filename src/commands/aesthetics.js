const Command = require('../structures/Command');

class AestheticsCommand extends Command {
	constructor() {
		super({
			name: 'aesthetics',
			description: 'Make your input a e s t h e t i c',
			args: [
				{
					type: 'string',
					name: 'input'
				}
			],
		});
	}

	async run(message, args) {
		const aesthetics = require('../data/aesthetics');
		const aestheticPhrase = [];
		for (const char of args.input) {
			aesthetics.hasOwnProperty(char)
				? aestheticPhrase.push(aesthetics[char])
				: aestheticPhrase.push(char);
		}
		if (aestheticPhrase.join(' ').length > 1999) return message.edit('Output too long. Try shorter text.').then(message => message.delete(2000));
		message.edit(aestheticPhrase.join(' '));
	}
}

module.exports = AestheticsCommand;