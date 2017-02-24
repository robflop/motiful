const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
	var command = "setNickname"; 
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 1);
	// Take out the prefix and command name out of the message content, then define the argument out of the remaining content
	if(msg.content == config.commandPrefix + command.toLowerCase()) { 
	// If there is no argument (only prefix and command)...
		msg.edit("Specify a nickname to set yourself to!").then(msg => msg.delete(2000));
		// ...notify the user, set auto-delete to 2s...
		return;	// ...and abort command execution.
	};
	// If there is an argument given,...
	msg.guild.member(selfbot.user).setNickname(arg);
	// ...then set the user's nickname to the arg...
	msg.edit(`Successfully set your nickname to '${arg}' ! \n(May not have worked you aren't allowed to set your own nickname)`).then(msg => msg.delete(2000));
	// ...and notify user of successful command execution and set auto-delete to 2s.
};

exports.desc = "Set your own nickname for this server"; // Export command description
exports.syntax = "<nickname to set yourself to>"; // Export command syntax