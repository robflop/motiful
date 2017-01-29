const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For file writing
var disabledCommands = require('../disabled_commands.json'); // Load list of toggled commands
var Commands = require('../command_handler.js'); // Load command handler (to get list of commands)

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "toggle";
    var arg = msgArray[1];
    // Assign argument out of the array
    if(!arg) {msg.edit("Specify a command to toggle!").then(msg => msg.delete(2000))};
    // If no argument is given, notify the user and set auto-delete to 2s.
    if(arg == "dcom") {
        if(disabledCommands == "") {msg.edit("No commands have been disabled!").then(msg => msg.delete(10000)); return;};
        // If no commands have been disabled, tell the user and set auto-delete to 10s
        msg.edit(`Disabled commands are: \`\`\`${disabledCommands.join(", ")}\`\`\``).then(msg => msg.delete(30000));
        // If there are disabled commands, list them and set auto-delete to 30s
        return; // Abort command execution to prevent other code from executing
    };
    // If the argument calls for a list of disabled commands, list them and set auto-delete to 30s
    if(arg == "toggle" || arg == "help" || Object.keys(Commands.commands).indexOf(arg) == -1) {msg.delete(); return; } 
	// Disallow toggling of the toggle/help command and any non-existing commands
    var index = disabledCommands.indexOf(arg);
    // Set the index where the disabled command is at
    if(index == -1) {
        disabledCommands.push(arg);
        // Push the command into the disabled commands array
        fs.writeFileSync('disabled_commands.json', JSON.stringify(disabledCommands));
        // Write the array to the json file
        msg.edit(`Command '${arg}' successfully disabled!`).then(msg => msg.delete(2000));
        // Notify the user of success and set auto-delete to 2s
        return; // Abort command execution
    }
    disabledCommands.splice(index, 1);
    // Splice the command from the disabled commands array
    fs.writeFileSync('disabled_commands.json', JSON.stringify(disabledCommands));
    // Write the array to the json file
    msg.edit(`Command '${arg}' successfully enabled!`).then(msg => msg.delete(2000));
    // Notify the user of success and set auto-delete to 2s
};

exports.desc = "Toggle a command on/off or list toggled commands" // Export command description
exports.syntax = "<command to toggle OR 'dcom' to list disabled commands>" // Export command syntax 