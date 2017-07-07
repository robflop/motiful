const Command = require('../structures/Command');
const { RichEmbed } = require('discord.js');

class NitroCommand extends Command {
	constructor() {
		super({
			name: 'nitro',
			description: 'Send a fake embed about Discord Nitro',
		});
	}

	async run(message, args) {
		const embed = new RichEmbed()
			.setColor(5267072)
			.setAuthor(`Discord Nitro Message`, 'https://cdn.discordapp.com/emojis/264287569687216129.png ')
			.setDescription('[Discord Nitro](https://discordapp.com/nitro) is **required** to view this message.')
			.setThumbnail('https://cdn.discordapp.com/attachments/194167041685454848/272617748876492800/be14b7a8e0090fbb48135450ff17a62f.png');

		message.delete().then(msg => {
			msg.channel.send({ embed });
		});
	}
}

module.exports = NitroCommand;