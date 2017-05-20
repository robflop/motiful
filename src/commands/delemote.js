const Command = require('../structures/Command');
const { join } = require('path');
const { readdirSync, unlink } = require('fs');

class DelEmoteCommand extends Command {
	constructor() {
		super({
			name: 'delemote',
			description: 'Delete a custom emote',
			args: [
				{
					type: 'string',
					name: 'emotename'
				}
			]
		});
	}

	async run(message, args) {
		const emoteFolder = join(__dirname, '..', 'data', 'customemotes');
		const extensions = ['png', 'jpg', 'gif', 'jpeg', 'webp'];
		const emoteRegex = new RegExp(`${args.emotename}.(${extensions.join('|')})`);
		const emote = readdirSync(emoteFolder).filter(file => emoteRegex.test(file))[0] || '';
		if (emote) {
			const emotePath = join(emoteFolder, emote);
			unlink(emotePath, err => {
				if (err) return message.edit(`Error deleting emote!: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
				else return message.edit(`Successfully deleted emote \`${args.emotename}\`!`).then(msg => msg.delete(3000));
			});
		}
		else {
			return message.edit(`Emote \`${args.emotename}\` not found!`).then(msg => msg.delete(3000));
		}
	}
}

module.exports = DelEmoteCommand;