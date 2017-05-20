class Command {
	constructor(config) {
		this.name = config.name;
		this.description = config.description || '';
		this.aliases = config.aliases || [];
		this.guildOnly = config.guildOnly || false;
		this.args = config.args || [];
	}

	async run() {
		throw Error(`Command ${this.name} does not possess a run() method.`);
	}
}

module.exports = Command;