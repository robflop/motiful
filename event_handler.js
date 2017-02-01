const config = require('./config.json'); // Import configuration
const fs = require('fs'); // For log writing
const moment = require('moment'); // Part of log writing
const globalEmotes = require('./twitchemotes/global.json'); // Load global emotes list
const subEmotes = require('./twitchemotes/subscriber.json') // Load subscriber emote list

module.exports = { // Export event functions
	"ready": function ready(selfbot) { // Once the selfbot is ready (fully booted) ...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful ready!`); // ...console log a ready message.
	},
	"error": function error(selfbot) { // If a "serious connection error" occurs...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful encountered a "serious connection error"!`); // ...console log a notifcation.	
	}
};