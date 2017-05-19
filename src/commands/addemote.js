const Command = require('../structures/Command');
const snekfetch = require('snekfetch');
const { join } = require('path');
const { existsSync, writeFile } = require('fs');

class AddEmoteCommand extends Command {
	constructor() {
		super({
			name: 'addemote',
			description: 'Add a custom emote',
			args: [
				{
					type: 'string',
					name: 'emotename'
				},
				{
					type: 'string',
					name: 'url',
					defaultVal: ''
				}
			]
		});
	}

	async run(message, args) {
		if (message.attachments.size && !args.url) {
			args.url = message.attachments.first().url;
		}
		const emoteExt = args.url.substr(args.url.lastIndexOf('.') + 1);
		const validExts = ['png', 'jpg', 'gif', 'jpeg', 'webp'];
		if (!validExts.includes(emoteExt)) {
			return message.edit('Only PNGs, JP(E)Gs, WebPs and GIFs are accepted, sorry.').then(msg => msg.delete(3000));
		}
		const emotePath = join(__dirname, '..', 'data', 'customemotes', args.emotename + emoteExt);
		if (existsSync(emotePath)) {
			return message.edit('Emote with that name already exists!').then(msg => msg.delete(3000));
		}
		snekfetch.get(args.url)
			.then(emote => {
				writeFile(emotePath, emote.body, err => {
					if (err) return message.edit(`Error writing file for the \`${args.emotename}\` emote!`).then(msg => msg.delete(3000));
					else message.edit(`Successfully added emote \`${args.emotename}\`!`).then(msg => msg.delete(2000));
				});
			})
			.catch(err => {
				const errorDetails = `${err.host ? err.host : ''} ${err.message ? err.message : ''}`.trim();
				message.edit(`An error occurred getting the file: \`${err.code}: ${errorDetails}\``).then(msg => msg.delete(3000));
				message.client.logger.error(err);
			});
	}
}

module.exports = AddEmoteCommand;