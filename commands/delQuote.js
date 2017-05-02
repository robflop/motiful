const config = require('../userconfig/config.json');
const fs = require('fs');
const quotes = require('../userconfig/savedQuotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "delQuote";
	if(msg.content == config.commandPrefix + command || msgArray.length<2) return msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
	const quoteName = msgArray[1];
	if(quotes.hasOwnProperty(quoteName)) {
		delete quotes[quoteName];
		fs.writeFileSync('./userconfig/savedQuotes.json', JSON.stringify(quotes));
		return msg.edit(`Quote '${quoteName}' successfully deleted!`).then(msg => msg.delete(2000));
	}
	return msg.edit(`Quote '${quoteName}' not found on quotes list!`).then(msg => msg.delete(2000));
};

exports.desc = "Delete a saved quote";
exports.syntax = "<quoteName>";