const config = require('../userconfig/config.json');
const Commands = require('../commandHandler.js');
const disabledCommands = require('../userconfig/disabledCommands.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "help";
	msg.delete();
	const commandsExpl = [];
	const cmdList = Object.keys(Commands.commands);
	const arg = msgArray[1];
    // possible arg to get help on a command
	if(arg && cmdList.includes(arg)) return msg.channel.send(`**__Syntax for '${arg}' is:__** \`\`\`${config.commandPrefix + arg + " " + Commands.commands[arg].syntax}\`\`\``).then(msg => msg.delete(20000));
	for(let i = 0; i < cmdList.length; i++) commandsExpl.push(`\`\`'${cmdList[i]}' -- ${Commands.commands[cmdList[i]].desc}\`\``);
    // add each command + description to the obj
	msg.channel.send(`**__Available commands are:__**\n\n${commandsExpl.join("\n")}\n\n\`\`Use '${config.commandPrefix + command} <commandname>' to get syntax help on a command!\`\`\n\n**${disabledCommands.join(", ").length>0 ? "Disabled commands: " + disabledCommands.join(", ") : "No commands have been disabled."}**`, {split: {char: "\n"}});
};

exports.desc = "Display this mesage";
exports.syntax = "<command to get help on, optional>";