const config = require('../config.json'); // Import configuration
var fs = require('fs'); // For checking if file exists locally

exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "setAvatar";
	var arg = msgArray[1];
	if(!arg) {
	// If arg is undefined...
		msg.edit("Specify an image!").then(msg => msg.delete(2000));
		// ...notify user to specify an image.
		return;	// Abort command execution
	};
	// Assign the argument out of the array
	if(!arg.startsWith("http") && !fs.existsSync(arg)) { 
		// If the argument does not begin with http (is not a link) and is not found locally... 
		msg.edit("Invalid file or URL.").then(msg => msg.delete(2000)); 
		// ...notify the user of the error...
		return; // ...and abort command execution.
	};
	if(arg.substr(-4, 4) !== ".png" && arg.substr(-4, 4) !== ".jpg" && arg.substr(-4, 4) !== ".gif" && arg.substr(-5, 5) !== ".jpeg" && arg.substr(-5, 5) !== ".webp") {
	// If the argument file is not a png, jpg/jpeg, gif or webp, reject it
		msg.edit("Invalid file format! Only png, jpg/jpeg, gif and webp are allowed.").then(msg => msg.delete(2000));
		return;
	};
	selfbot.user.setAvatar(arg).catch(console.error); 
	// Set the user's avatar to the arg...
	msg.edit(`Successfully set your avatar to '${arg}' ! \n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000));
	// ...and notify the user of the successful command execution.
};
exports.desc = "Change your avatar"; // Export command description
exports.syntax = "<url to a picture>" // Export command syntax