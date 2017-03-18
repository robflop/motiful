const Discord = require('discord.js');
const selfbot = new Discord.Client();
const config = require('./userconfig/config.json');
const chalk = require('chalk');
var Commands = require('./command_handler.js');
var Events = require('./event_handler.js');
var disabledCommands = require('./userconfig/disabled_commands.json');

selfbot.once('ready', () => {
	Events.ready(selfbot, chalk);
});

selfbot.on('disconnect', error => {
	Events.disconnect(selfbot, error, chalk);
});

selfbot.on('error', error => {
	Events.error(selfbot, error, chalk);
});

selfbot.on('message', msg => {
    if(msg.author.id !== config.ownerID) return;
    if(!msg.content.startsWith(config.commandPrefix)) return;
    if(msg.content == config.commandPrefix) return;
    var actualCmd = msg.content.replace(config.commandPrefix, '').trim().split(' ')[0].toLowerCase();
	var msgArray = msg.content.replace(config.commandPrefix, '').trim().split(' ');
	if(disabledCommands.indexOf(actualCmd) > -1) return msg.delete();
	// disabled commands check
    if(Object.keys(Commands.commands).indexOf(actualCmd) > -1) Commands.commands[actualCmd].main(selfbot, msg, msgArray, Commands, chalk);
	// run the command
	if(actualCmd == "reload") {
		var arg = msg.content.substr(config.commandPrefix.length + actualCmd.length + 2);
		if(arg == "") return msg.reply('specify a command to reload!');
		try {
			var cmdFile = Commands.commands[arg.toLowerCase()].filename;
			delete require.cache[require.resolve(`./commands/${cmdFile}`)];
			delete require.cache[require.resolve('./commands/help.js')];
			delete require.cache[require.resolve('./command_handler.js')];
			Commands = require('./command_handler.js');
			// also reload help cmd to update output
    	}
		catch(error) { return msg.reply(`error while reloading the '${arg}' command: \`\`\`${error}\`\`\`\n(Command may not exist, check for typos)`); };
		msg.reply(`command '${cmdFile.slice(0, -3)}' successfully reloaded!`);
	};
	return; // Just in case, return empty for anything else.
});

process.on("unhandledRejection", err => {
  	console.error("Uncaught Promise Error: \n" + err.stack);
});

selfbot.login(config.token); // Log the selfbot in