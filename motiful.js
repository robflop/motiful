const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./userconfig/config.json');
const chalk = require('chalk');
let Commands = require('./commandHandler.js');
const Events = require('./eventHandler.js');
const disabledCommands = require('./userconfig/disabledCommands.json');

client.once('ready', () => Events.ready(client, chalk));

client.on('disconnect', error => Events.disconnect(client, error, chalk));

client.on('error', error => Events.error(client, error, chalk));

const handleMsg = (msg) => {
	if(msg.author.id !== config.ownerID || !msg.content.startsWith(config.commandPrefix) || msg.content == config.commandPrefix) return;
	const msgArray = msg.content.replace(config.commandPrefix, '').trim().split(' ');
	const actualCmd = msgArray[0].toLowerCase();
	if(disabledCommands.includes(actualCmd)) return msg.delete();
	if(Object.keys(Commands.commands).includes(actualCmd)) Commands.commands[actualCmd].main(client, msg, msgArray, Commands, chalk);
	// run the command
	if(actualCmd == "reload") {
		const arg = msgArray[1];
		if(!arg) return msg.edit('Specify a command to reload!').then(msg => msg.delete(2000));
		try {
			const cmdFile = Commands.commands[arg.toLowerCase()].filename;
			delete require.cache[require.resolve(`./commands/${cmdFile}`)];
			delete require.cache[require.resolve('./commands/help.js')];
			delete require.cache[require.resolve('./commandHandler.js')];
			Commands = require('./commandHandler.js');
			// also reload help cmd to update its output
		}
		catch(error) {
			return msg.edit(`Error while reloading the '${arg}' command: \`\`\`${error}\`\`\`\n(Command may not exist, check for typos)`).then(msg => msg.delete(2000));
		};
		msg.edit(`Command '${cmdFile.slice(0, -3)}' successfully reloaded!`).then(msg => msg.delete(2000));
	};
	return; // Just in case, return empty for anything else.
};

client.on('message', msg => handleMsg(msg));

client.on('messageUpdate', (oldMsg, newMsg) => handleMsg(newMsg));
// commands are untested for usage when edited into messages

process.on("unhandledRejection", err => console.error(`[${require('moment')().format('DD/MM/YYYY HH:mm:ss')}] Uncaught Promise Error: \n${err.stack}`));

client.login(config.token);