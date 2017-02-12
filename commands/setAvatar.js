const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "setAvatar";
	var arg = msgArray[1];
	// Assign the argument out of the array
	if(!arg) {
	// If no image is specified...
		msg.edit("Specify an image!").then(msg => msg.delete(2000));
		// ...notify user to specify an image and set auto-delete to 2s.
		return;	// Abort command execution
	};
	if(!arg.startsWith("http")) { 
		// If the argument does not begin with http (is not a link) and is not found locally... 
		msg.edit("Invalid file or URL.").then(msg => msg.delete(2000)); 
		// ...notify the user of the error, set auto-delete to 2s...
		return; // ...and abort command execution.
	};
	if(arg.substr(-4, 4) !== ".png" && arg.substr(-4, 4) !== ".jpg" && arg.substr(-4, 4) !== ".gif" && arg.substr(-5, 5) !== ".jpeg" && arg.substr(-5, 5) !== ".webp") {
	// If the supplied file is not a png, jpg/jpeg, gif or webp...
		msg.edit("Invalid file format! Only png, jpg/jpeg, gif and webp are allowed.").then(msg => msg.delete(2000));
		// ...notify the user of the limitations, set auto-delete to 2s...
		return; // ...and abort command execution.
	};
	selfbot.user.setAvatar(arg);
	// Set the user's avatar to the supplied file...
	msg.edit(`Successfully set your avatar to '${arg}' ! \n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000));
	// ...and notify the user of the successful command execution.
};

exports.desc = "Change your avatar"; // Export command description
exports.syntax = "<url to a picture (png, jpg/jpeg, webp, gif (if nitro))>"; // Export command syntax