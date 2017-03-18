const config = require('../userconfig/config.json');
var Commands = require('../command_handler.js');
var disabledCommands = require('../userconfig/disabled_commands.json');

exports.main = function(selfbot, msg, msgArray, chalk) {
    var command = "help";
    msg.delete();
    var commandsExpl = [];
    var cmdList = Object.keys(Commands.commands);
    var arg = msgArray[1];
    // possible arg to get help on a command
    if(arg && cmdList.indexOf(arg) !== -1) return msg.edit(`**__Syntax for '${arg}' is:__** \`\`\`${config.commandPrefix + arg + " " + Commands.commands[arg].syntax}\`\`\``).then(msg => msg.delete(20000));
    for(var i = 0; i < cmdList.length; i++) commandsExpl.push(`\`\`'${cmdList[i]}' -- ${Commands.commands[cmdList[i]].desc}\`\``);
    msg.channel.sendMessage(`**__Available commands are:__**\n\n${commandsExpl.join("\n")}\n\n\`\`Use '${config.commandPrefix + command} <commandname>' to get syntax help on a command!\`\`\n\n**${disabledCommands.join(", ").length>0 ? "Disabled commands: " + disabledCommands.join(", ") : "No commands have been disabled."}**`, {split: {char: "\n"}});
};

exports.desc = "Display this mesage";
exports.syntax = "<command to get help on, optional>";