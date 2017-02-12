const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "setUsername";
	var arg = msg.content.replace(config.commandPrefix + command, "").replace(config.commandPrefix + command.toLowerCase(), "").trim();
	// Take out the prefix and command name out of the message content, then define the argument out of the remaining content
	if(msg.content == config.commandPrefix + command.toLowerCase()) { 
	// If there is no argument (only prefix and command)...
		msg.edit("Specify a username to set yourself to!").then(msg => msg.delete(2000));
		// ...notify the user...
		return;	// ...and abort command execution.
	};
	// If there is an argument given,...
	selfbot.user.setUsername(arg);
	// ...then set the bot's username to the arg...
	msg.edit(`Successfully set your username to '${arg}' ! \n(May not have worked if ratelimit capped)`).then(msg => msg.delete(2000));
	// ...and notify user of successful command execution.
};

exports.desc = "Change your username"; // Export command description
exports.syntax = "<username to set yourself to>"; // Export command syntax