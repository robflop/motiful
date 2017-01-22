const config = require('./config.json'); // Import configuration
const fs = require('fs'); // For log writing
const moment = require('moment'); // Part of log writing
const globalEmotes = require('./twitchemotes/global.json'); // Load global emotes list
const subEmotes = require('./twitchemotes/subscriber.json') // Load subscriber emote list

module.exports = { // Export event functions
	"ready": function ready(selfbot) { // Once the selfbot is ready (fully booted) ...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful ready!`); // ...console log a ready message.
		var globalParsed; // Placeholder var
		var subParsed; // Placeholder var
		function checkGlobalEmotes() {
		// Define function to check if global emote list is up-to-date
			var globalAPIfile = require('request').get('https://twitchemotes.com/api_cache/v2/global.json', function (error, response, body) {
			// Get the file from the API
				if(error) {console.log('Error comparing global emote list occurred: ' + error)};
				// Log any errors|undefined responses
       	 		if(response == undefined) {console.log('Global emote list response undefined')};
				if(body) {globalParsed = JSON.parse(body); if(Object.keys(globalParsed["emotes"]).length !== Object.keys(globalEmotes["emotes"]).length) {
				// If there is a result (body), parse it and compare it
					console.log('Length mismatch between stored global emotes and API global emotes! Local emote list may be outdated.\nConsider re-downloading from https://twitchemotes.com/api_cache/v2/global.json')
					// If there is a mismatch, notify the user
				}};
			});
		};
		function checkSubEmotes() {
		// Define function to check if subscriber emote list is up-to-date
			var subAPIfile = require('request').get('https://twitchemotes.com/api_cache/v2/subscriber.json', function (error, response, body) {
			// Get the file from the API
				if(error) {console.log('Error comparing subscriber emote list occurred: ' + error)};
				// Log any errors|undefined responses
        		if(response == undefined) {console.log('Subscriber emote list response undefined')};
				if(body) {subParsed = JSON.parse(body); if(Object.keys(subParsed["channels"]).length !== Object.keys(subEmotes["channels"]).length) {
				// If there is a result (body), parse it and compare it
					console.log('Length mismatch between stored subscriber channels and API subscriber channels! Local channel list may be outdated.\nConsider re-downloading from https://twitchemotes.com/api_cache/v2/subscriber.json')
					// If there is a mismatch, notify the user
				}};
    		});
		};
		checkGlobalEmotes(); // Compare local list to API 
		checkSubEmotes(); // Compare local list to API
	},
	"error": function error(selfbot) { // If a "serious connection error" occurs...
		console.log(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] Motiful encountered a "serious connection error"!`); // ...console log a notifcation.	
	}
};