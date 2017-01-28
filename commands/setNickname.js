const config = require('../config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command's function
	var command = "setNickname"; 
	var args = msgArray.shift();
	var fullarg = msgArray.join(" ");
	// Define argument out of the array
	if(msg.content == config.commandPrefix + command.toLowerCase()) { 
	// If there is no argument (only prefix and command)...
		msg.edit("Specify a nickname to set yourself to!").then(msg => msg.delete(2000));
		// ...notify the user...
		return;	// ...and abort command execution.
	};
	// If there is an argument given,...
	msg.guild.member(selfbot.user).setNickname(fullarg); // ...then set the user's nickname to the arg...
	msg.edit(`Successfully set your nickname to '${fullarg}' ! \n(May not have worked you aren't allowed to set your own nickname)`).then(msg => msg.delete(2000));
	// Notify user of successful command execution
};
exports.desc = "Set your own nickname for this server"; // Export command description
exports.syntax = "<nickname to set yourself to>" // Export command syntax