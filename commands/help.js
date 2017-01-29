const config = require('../config.json'); // Import configuration
var Commands = require('../command_handler.js'); // Load command handler
var disabledCommands = require('../disabled_commands.json'); // Load list of toggled commands

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "help";
    var commandsExpl = [];
    // Array which will have all commands and their corresponding explainations
    var cmdList = Object.keys(Commands.commands);
	// Get all command names (keys) from commands object
    var arg = msgArray[1];
    // Get possible argument from message array
    if(arg) {
    // If there is an argument...
        if(cmdList.indexOf(arg) !== -1) {msg.edit(`**__Syntax for '${arg}' is:__** \`\`\`${config.commandPrefix + arg + " " + Commands.commands[arg].syntax}\`\`\``).then(msg => msg.delete(20000));};
        // ...and the argument is in the command list, send the syntax help for it and set auto-delete to 20s.
        return; // Abort command execution
    };
    for(var i = 0; i < cmdList.length; i++) { 
	// Loop through each command (key)
		commandsExpl.push(`\`\`'${cmdList[i]}' -- ${Commands.commands[cmdList[i]].desc}\`\``);
		// Push each command including its description into the commandsExpl array
	}; 
    msg.edit(`**__Available commands are:__**\n\n${commandsExpl.join("\n")}\n\n\`\`Use '${config.commandPrefix + command} <commandname>' to get syntax help on a command!\`\`\n\n**Disabled commands are: ${disabledCommands.join(", ")}**`).then(msg => msg.delete(30000));
    // Send the command list and the disabled commands list and then set auto-delete to 30s.
};

exports.desc = "Display this mesage" // Export command description
exports.syntax = "<command to get help on, optional>" // Export command syntax