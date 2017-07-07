const Command = require('../structures/Command');

class IndicatorCommand extends Command {
	constructor() {
		super({
			name: 'indicators',
			description: 'Turn input text into indicator-emoji text',
			args: [
				{
					type: 'string',
					name: 'input'
				}
			]
		});
	}

	async run(message, args) {
		const indicators = require('../data/indicators');
		const indicatorPhrase = [];
		for (const char of args.input) {
			indicators.includes(char.toLowerCase())
				? indicatorPhrase.push(`:regional_indicator_${char.toLowerCase()}:`)
				: indicatorPhrase.push(char);
		}
		if (indicatorPhrase.join(' ').length > 1999) return message.edit('Output too long. Try shorter text.').then(message => message.delete(2000));
		message.edit(indicatorPhrase.join(' '));
	}
}

module.exports = IndicatorCommand;