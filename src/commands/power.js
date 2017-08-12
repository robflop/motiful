const Command = require('../structures/Command');
const { exec } = require('child_process');

class PowerCommand extends Command {
	constructor() {
		super({
			name: 'power',
			description: 'Restart or shutdown motiful',
			aliases: ['pw'],
			ownersOnly: true,
			args: [
				{
					type: 'string',
					name: 'action'
				}
			]
		});
	}

	async run(message, args) {
		if (args.action === 'shutdown') {
			message.edit('motiful now shutting down! Bye!').then(msg => msg.delete(2000));
			message.client.logger.info(`motiful shutting down! (${message.author.tag} on '${message.guild}')`);

			if (message.client.config.pm2) {
				setTimeout(() => exec('pm2 stop motiful'), 2000);
			}
			else {
				setTimeout(() => process.exit(0), 2000);
			}
		}

		else if (args.action === 'restart') {
			if (!message.client.config.pm2) message.edit('Sorry, restarting only works when using pm2!').then(msg => msg.delete(3000));

			message.edit('motiful now restarting! See you soon!').then(msg => msg.delete(2000));
			message.client.logger.info(`motiful shutting down! (${message.author.tag} on '${message.guild}')`);

			setTimeout(() => process.exit(0), 2000);
		}
	}
}

module.exports = PowerCommand;