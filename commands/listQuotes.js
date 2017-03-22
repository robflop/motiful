const config = require('../userconfig/config.json');
const fs = require('fs');
const quotes = require('../userconfig/savedQuotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "listQuotes";
	if(Object.keys(quotes).length == 0) return msg.edit("No quotes have been saved!").then(msg => msg.delete(5000));
	msg.edit(`**__Available quotes are:__**\`\`\`${Object.keys(quotes).join(", ")}\`\`\``).then(msg => msg.delete(20000));
};

exports.desc = "List all saved quotes";
exports.syntax = "";