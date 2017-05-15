const emojiRanges = [
	'[\u0023-\u0039]\u20E3', '[\u2002-\u21AA]', '[\u231A-\u27bf]', '[\u2934-\u2b55]', '\u3030', '\u303D',
	'\u3297', '\u3299', '\uD83C[\udc04-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83E[\udd10-\udd6b]', '\uD83D[\ude80-\udec0]'
];

const unicodeEmojiRegex = new RegExp(emojiRanges.join('|'), 'g');
const discordEmojiRegex = /<:([a-zA-Z0-9_]+):(\d+)>/;
const discordIDRegex = /!?[0-9]+/g;

const truthy = ['yes', 'y', 'true', 'enable'];
const falsy = ['no', 'n', 'false', 'disable'];

class ArgumentParser {
	static parse(type, message, arg) {
		if (type === 'string') return arg || null;
		if (type === 'number' || type === 'integer') return Number.parseInt(arg) || null; 
		if (type === 'float') return Number.parseFloat(arg) || null;
		if (type === 'boolean') return this.toBoolean(arg);
		if (type === 'message') return this.toMessage(message, arg);
		if (type === 'channel') return this.toChannel(message, arg);
		if (type === 'role') return this.toRole(message, arg);
		if (type === 'user') return this.toUser(message, arg);
		if (type === 'member') return this.toMember(message, arg);
		if (type === 'emoji') return this.toEmoji(message, arg);
		throw new RangeError(`Invalid type detected at: '${type}'`);
	}

	static toBoolean(arg) {
		return truthy.includes(arg.toLowerCase()) ? true : falsy.includes(arg.toLowerCase()) ? false : null;
	}

	static toMessage(message, arg) {
		if (!/^[0-9]+$/.test(arg)) return Promise.resolve(null);
		return message.channel.fetchMessage(arg).catch(() => null);
	}

	static toChannel(message, arg) {
		return message.guild.channels.get((arg.match(discordIDRegex) || [])[0])
			|| message.guild.channels.get(arg)
			|| message.guild.channels.find(channel => channel.name.toLowerCase().includes(arg.toLowerCase()));
	}

	static toRole(message, arg) {
		return message.guild.roles.get((arg.match(discordIDRegex) || [])[0])
			|| message.guild.roles.get(arg)
			|| message.guild.roles.find(role => role.name.toLowerCase().includes(arg.toLowerCase()));
	}

	static toUser(message, arg) {
		return message.mentions.users.get((arg.match(discordIDRegex) || [])[0])
			|| message.client.users.get(arg)
			|| message.client.users.find(user => user.username.toLowerCase().includes(arg.toLowerCase()));
	}

	static toMember(message, arg) {
		return message.mentions.users.get((arg.match(discordIDRegex) || [])[0])
			|| message.guild.members.get(arg)
			|| message.guild.members.find(member => member.displayName.toLowerCase().includes(arg.toLowerCase()));
	}

	static toEmoji(message, arg) {
		if (discordEmojiRegex.test(arg)) {
			const match = arg.match(discordEmojiRegex)[2];
			if (message.client.emojis.has(match)) return message.client.emojis.get(match);
			return null;
		}

		const match = arg.match(unicodeEmojiRegex);
		return match ? match[0] : null;
	}
}

module.exports = ArgumentParser;