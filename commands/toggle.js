const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For file writing
var disabledCommands = require('../userconfig/disabled_commands.json'); // Load list of toggled commands
var Commands = require('../command_handler.js'); // Load command handler (to get list of commands)

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "toggle";
    var arg = msgArray[1];
    // Assign argument out of the array
    if(!arg) {msg.edit("Specify a command to toggle!").then(msg => msg.delete(2000))};
    // If no argument is given, notify the user and set auto-delete to 2s.
    if(arg == "dcom") {
        if(disabledCommands == "") {msg.edit("No commands have been disabled!").then(msg => msg.delete(5000)); return;};
        // If no commands have been disabled, tell the user and set auto-delete to 5s
        msg.edit(`Disabled commands are: \`\`\`${disabledCommands.join(", ")}\`\`\``).then(msg => msg.delete(30000));
        // If there are disabled commands, list them and set auto-delete to 30s
        return; // Abort command execution to prevent other code from executing
    };
    // If the argument calls for a list of disabled commands, list them and set auto-delete to 30s
    if(arg == "toggle" || arg == "help" || Object.keys(Commands.commands).indexOf(arg) == -1) { msg.delete(); return; } 
	// Disallow toggling of the toggle/help command and any non-existing commands
    var index = disabledCommands.indexOf(arg);
    // Define the index of the argument inside the disabled commands list
    if(index == -1) {
    // If the command is not on the list...
        disabledCommands.push(arg);
        // ...push the command into the disabled commands array...
        fs.writeFileSync('userconfig/disabled_commands.json', JSON.stringify(disabledCommands));
        // ...write the array to the file...
        msg.edit(`Command '${arg}' successfully disabled!`).then(msg => msg.delete(2000));
        // ...and notify the user of success and set auto-delete to 2s.
        return; // Abort command execution
    }
    // If the command is on the list...
    disabledCommands.splice(index, 1);
    // ...remove the command from the disabled commands array...
    fs.writeFileSync('userconfig/disabled_commands.json', JSON.stringify(disabledCommands));
    // ...write the array to the file...
    msg.edit(`Command '${arg}' successfully enabled!`).then(msg => msg.delete(2000));
    // ...and notify the user of success and set auto-delete to 2s.
};

exports.desc = "Toggle a command on/off or list toggled commands"; // Export command description
exports.syntax = "<command to toggle OR 'dcom' to list disabled commands>"; // Export command syntax 