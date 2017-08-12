const Command = require('../structures/Command');

class ReloadCommand extends Command {
	constructor() {
		super({
			name: 'reload',
			description: 'Reload a command',
			aliases: ['rl'],
			args: [
				{
					type: 'string',
					name: 'command'
				}
			]
		});
	}

	async run(message, args) {
		const { aliases } = message.client;
		let command = args.command.toLowerCase();
		if (aliases.has(command)) command = aliases.get(command);

		await this.reloadCommand(command, message);
		return message.edit(`\`${command.capitalize()}\` command reloaded!`).then(msg => msg.delete(2000));
	}

	reloadCommand(command, message) {
		const { commands, aliases } = message.client;
		if (!commands.has(command)) return;
		const CommandClass = require(`./${command}.js`);
		const cmd = new CommandClass();

		delete require.cache[require.resolve(`./${command}`)];
		commands.delete(command);

		for (const alias of aliases.keys()) {
			if (aliases.get(alias) === command) aliases.delete(alias);
		}

		commands.set(cmd.name, cmd);

		for (const alias of cmd.aliases) {
			aliases.set(alias, cmd.name);
		}
	}
}

module.exports = ReloadCommand;