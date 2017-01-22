const config = require('../config.json'); // Import configuration
var Commands = require('../command_handler.js'); // Load command handler

exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "shutdown";
	msg.edit("Selfbot shutting down!").then(msg => msg.delete(1000));
	// Edit the command call and set auto-delete to 1s
	setTimeout(function(){ process.exit(0); }, 2000); 
	// Set timeout for shutting down the selfbot to 2sec after the command is triggered.
};
exports.desc = "Shut down the selfbot remotely"; // Export command description
exports.syntax = "" // Export command syntax 