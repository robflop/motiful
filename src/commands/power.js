const Command = require('../structures/Command');
const { exec } = require('child_process');

class PowerCommand extends Command {
	constructor() {
		super({
			name: 'power',
			description: 'Restart or shutdown motiful',
			aliases: ['pw'],
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
			return message.edit('motiful now shutting down! Bye!').then(msg => msg.delete(1000))
				.then(msg => {
					message.client.logger.info('motiful shutting down!');

					if (message.client.config.pm2) {
						setTimeout(() => exec('pm2 stop motiful'), 2000);
					}
					else {
						setTimeout(() => process.exit(0), 2000);
					}
				});
		}

		else if (args.action === 'restart') {
			if (!message.client.config.pm2) return message.edit('Sorry, restarting only works when using pm2!').then(msg => msg.delete(3000));

			return message.edit('motiful now restarting! See you soon!').then(msg => msg.delete(1000))
				.then(msg => {
					message.client.logger.info('motiful restarting!');
					process.exit(0);
				});
		}

		else if (args.action === 'brain') { // eslint-disable-next-line max-len
			const meme = ['O-oooooooooo AAAAE-A-A-I-A-U-', 'JO-oooooooooooo AAE-O-A-A-U-U-A-', 'E-eee-ee-eee AAAAE-A-E-I-E-A-', 'JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA', 'O-oooooooooo AAAAE-A-A-I-A-U-', 'JO-oooooooooooo AAE-O-A-A-U-U-A-', 'E-eee-ee-eee AAAAE-A-E-I-E-A-', 'JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA', 'O-oooooooooo AAAAE-A-A-I-A-U-', 'JO-oooooooooooo AAE-O-A-A-U-U-A-', 'E-eee-ee-eee AAAAE-A-E-I-E-A-', 'JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA-', 'O--------------------'];
			return message.edit(meme.join(''));
		}

		else return message.edit(`'${args.action}' is not a valid action.`).then(msg => msg.delete(3000));
	}
}

module.exports = PowerCommand;