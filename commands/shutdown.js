const config = require('../userconfig/config.json'); // Import configuration
const moment = require('moment'); // For logs
var timestamp = moment().format('DD/MM/YYYY HH:mm:ss'); // Define timestamp

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
	var command = "shutdown";
	msg.edit("Selfbot shutting down!").then(msg => msg.delete(1000));
	// Edit the command call and set auto-delete to 1s
	setTimeout(function(){
		selfbot.destroy().then(()=>{console.log(`[${timestamp}]${chalk.green("[POWER]")} Motiful signed out!`); process.exit(0)});
		// Sign out motiful and then end the node process
	}, 2000);
	// Set timeout for shutting down the selfbot to 2sec after the command is triggered.
};

exports.desc = "Shut down the selfbot remotely"; // Export command description
exports.syntax = ""; // Export command syntax