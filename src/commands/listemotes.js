const Command = require('../structures/Command');
const { join } = require('path');
const { readdirSync } = require('fs');

class ListEmotesCommand extends Command {
	constructor() {
		super({
			name: 'listemotes',
			description: 'List all custom emotes',
			aliases: ['le'],
		});
	}

	async run(message, args) {
		const emotePath = join(__dirname, '..', 'data', 'customemotes');
		const validExts = ['png', 'jpg', 'gif', 'jpeg', 'webp'];
		const emotes = readdirSync(emotePath)
			.filter(file => validExts.includes(file.substr(file.lastIndexOf('.') + 1)))
			.map(file => file.replace(/\.[^/.]+$/, ''))
			.join(', ');
		if (!emotes.length) return message.edit('No custom emotes have been added.').then(msg => msg.delete(20000));
		else return message.edit(`Available custom emotes are: \`\`\`${emotes}\`\`\``).then(msg => msg.delete(20000));
	}
}

module.exports = ListEmotesCommand;