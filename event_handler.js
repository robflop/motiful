const config = require('./config.json'); // Import configuration
const moment = require('moment'); // Part of log writing

module.exports = { // Export event functions
	"ready": function ready(selfbot) { // Once the selfbot is ready (fully booted) ...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful ready!`); // ...console log a ready message.
	},
	"error": function error(selfbot) { // If a "serious connection error" occurs...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful encountered a "serious connection error"!`); // ...console log a notifcation.	
	}
};