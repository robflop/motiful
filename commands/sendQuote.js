const config = require('../userconfig/config.json');
const RichEmbed = require('discord.js').RichEmbed;
const quotes = require('../userconfig/savedQuotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "sendQuote";
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
	const quoteName = msgArray[1];
	if(!quotes.hasOwnProperty(quoteName)) return msg.edit(`Quote '${quoteName}' not found!`).then(msg => msg.delete(2000));
	msg.delete();
	const embed = new RichEmbed();
	const quote = quotes[quoteName];
	embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
         .setAuthor(quote["author"], quote["avatar"])
         .setDescription(quote["content"]);
	msg.channel.send('', {embed: embed});
};

exports.desc = "Post a saved quote";
exports.syntax = "<quoteName>";