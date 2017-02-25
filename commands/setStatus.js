const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "setStatus";
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 1);
	// Take out the prefix and command name out of the message content, then define the argument out of the remaining content
    if(arg == "") {
    // If argument is empty...
        selfbot.user.setGame();
        // ...empty the playing status...
        return msg.edit("Successfully cleared your status!\n").then(msg => msg.delete(2000)); 
        // ...notify the user of success, set auto-delete to 2s and abort further command execution.
    };
    selfbot.user.setGame(arg);
    // Set the user's playing status to the argument
    msg.edit(`Successfully set your game to '${arg}' !\n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)); 
    // Notify the user of successful change and set auto-delete to 2s
};

exports.desc = "Change your current status"; // Export command description
exports.syntax = "<status to set yourself to>"; // Export command syntax 