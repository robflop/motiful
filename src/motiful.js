const MotifulClient = require('./structures/MotifulClient');
const CommandController = require('./controllers/CommandController');
const DiscordAPIError = require('discord.js/src/rest/DiscordAPIError');

const client = new MotifulClient({
	disabledEvents: ['GUILD_SYNC', 'GUILD_CREATE', 'GUILD_DELETE', 'GUILD_UPDATE', 'GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_UPDATE',
		'GUILD_MEMBERS_CHUNK', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_CREATE',
		'CHANNEL_DELETE', 'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'USER_UPDATE', 'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE',
		'VOICE_STATE_UPDATE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
const controller = new CommandController();

client
	.once('ready', () => {
		client.user.setStatus('invisible');
		client.logger.info(`motiful ready! (As ${client.user.tag})`);
	})
	.on('message', message => controller.handleCommand(message))
	.login(client.config.token);

process.on('unhandledRejection', err => {
	if (!err) return;

	const errorString = 'Uncaught Promise Error:\n';
	if (err instanceof DiscordAPIError) {
		return client.logger.error(`${errorString}${err.code} - ${err.message}`);
	}

	if (err.method && err.path && err.text) {
		return client.logger.error(`${errorString}${err.method}: ${err.path}\n${err.text}`);
	}

	return client.logger.error(errorString + err.stack);
});