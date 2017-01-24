const config = require('../config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "setUsername";
	var args = msgArray.shift();
	var fullarg = msgArray.join(" ");
	// Define argument out of the array
	if(msg.content == config.commandPrefix + command.toLowerCase()) { 
	// If there is no argument (only prefix and command)...
		msg.edit("Specify a username to set yourself to!").then(msg => msg.delete(2000));
		// ...notify the user...
		return;	// ...and abort command execution.
	};
	// If there is an argument given,...
	selfbot.user.setUsername(fullarg); // ...then set the bot's username to the arg...
	msg.edit(`Successfully set your username to '${fullarg}' ! \n(May not have worked if ratelimit capped)`).then(msg => msg.delete(2000));
	// Notify user of successful command execution
};
exports.desc = "Change your username"; // Export command description
exports.syntax = "<username to set yourself to>" // Export command syntax