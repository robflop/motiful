const config = require('./userconfig/config.json'); // Import configuration
const moment = require('moment'); // Part of log writing
var timestamp = moment().format('DD/MM/YYYY HH:mm:ss'); 

module.exports = { // Export event functions
	"ready": function ready(selfbot, chalk) { // Once the selfbot is ready (fully booted) ...
		console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful ready!`); // ...console log a ready message.
		selfbot.user.setStatus('invisible');
		/*
		Set motiful's status to invisible, so you won't appear as online if you actually aren't but have motiful running.
		If you ARE online, the online/idle/dnd status of your discord client will overweigh motiful's invisible status, meaning
		that this won't make you permanently display as invisible.
		*/
	},
	"error": function error(selfbot, chalk) { // If a "serious connection error" occurs...
		console.log(`[${timestamp}]${chalk.red("[CONNECTION]")} motiful encountered a "serious connection error"!`); // ...console log a notifcation.	
	}
};