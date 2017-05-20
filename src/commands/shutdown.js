const Command = require('../structures/Command');
const { exec } = require('child_process');

class ShutdownCommand extends Command {
	constructor() {
		super({
			name: 'shutdown',
			description: 'Shut down motiful',
			aliases: ['kill'],
			ownersOnly: true,
		});
	}

	async run(message, args) {
		message.edit('motiful shutting down! Bye!').then(msg => msg.delete(2000));
		message.client.logger.info(`motiful shutting down! (${message.author.tag} on '${message.guild}')`);

		if (message.client.config.pm2) {
			setTimeout(() => exec('pm2 stop motiful'), 2000);
		}
		else {
			setTimeout(() => process.exit(0), 2000);
		}
	}
}

module.exports = ShutdownCommand;