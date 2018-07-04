const Command = require('../structures/Command');
const axios = require('axios');
const { join } = require('path');
const { existsSync, createWriteStream } = require('fs');

class AddEmoteCommand extends Command {
	constructor() {
		super({
			name: 'addemote',
			description: 'Add a custom emote',
			aliases: ['ae'],
			args: [
				{
					type: 'string',
					name: 'emoteName'
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
		const emoteExt = args.url.replace('?v=1', '').substr(args.url.lastIndexOf('.') + 1);
		const validExts = ['png', 'jpg', 'gif', 'jpeg', 'webp'];
		if (!validExts.includes(emoteExt)) {
			return message.edit('Only PNGs, JP(E)Gs, WebPs and GIFs are accepted, sorry.').then(msg => msg.delete({ timeout: 3000 }));
		}
		const emotePath = join(__dirname, '..', 'data', 'customemotes', `${args.emoteName}.${emoteExt}`);
		if (existsSync(emotePath)) {
			return message.edit('Emote with that name already exists!').then(msg => msg.delete({ timeout: 3000 }));
		}
		axios.get(args.url, { responseType: 'stream' })
			.then(emote => {
				try {
					emote.data.pipe(createWriteStream(emotePath));
					return message.edit(`Successfully added emote \`${args.emoteName}\`!`).then(msg => msg.delete({ timeout: 2000 }));
				}
				catch (e) {
					message.client.logger.error(e);
					return message.edit(`Error writing file for the \`${args.emoteName}\` emote!`).then(msg => msg.delete({ timeout: 3000 }));
				}
			})
			.catch(err => {
				message.edit(`An error occurred getting the file: \`${err.message}\``).then(msg => msg.delete({ timeout: 3000 }));
				return message.client.logger.error(err);
			});
	}
}

module.exports = AddEmoteCommand;