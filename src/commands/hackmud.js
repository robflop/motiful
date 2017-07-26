const Command = require('../structures/Command');

class HackmudCommand extends Command {
	constructor() {
		super({
			name: 'hackmud',
			description: 'Make your messages appear hackmud-style',
			aliases: ['hm']
		});
	}

	async run(message, args) {
		const timestamp = `${new Date().getHours()}${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
		const channel = message.channel.name.toUpperCase();
		const content = message.content.replace('--hackmud ', '');
		const newMsg = `\`\`\`apache\n${timestamp} [${channel}] <${message.member.displayName}> :::${content}:::\`\`\``;
		return message.edit(newMsg);
	}
}

module.exports = HackmudCommand;