const config = require('../userconfig/config.json');
const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment');
const quotes = require('../userconfig/savedQuotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "addQuote";
	if(msg.content == config.commandPrefix + command) return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
	msg.delete();
	var quoteName, user, name, avatar, date, time, users, quoteMsg, snippet;
    // placeholders
	if(msgArray[1].startsWith('"')) {
    // multi-word quotes
		quoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
		user = msg.content.substring(msg.content.lastIndexOf('"')+2, msg.content.indexOf(" ", msg.content.lastIndexOf('"')+2)).toLowerCase();
	}
	else quoteName = msgArray[1], user = msgArray[2].toLowerCase();
    // single-word quote
	snippet = msg.content.substring(config.commandPrefix.length + command.length + quoteName.length + user.length + 3);
	var isDM = false, isGDM = false;
	var embed = new Discord.RichEmbed();
	if(msg.channel.type == "text") users = msg.guild.members;
	else if(msg.channel.type == "dm") isDM = true, users = new Discord.Collection([[msg.channel.recipient.id, msg.channel.recipient], [msg.author.id, msg.author]]);
	else if(msg.channel.type == "group") isGDM = true, users = msg.channel.recipients.set(msg.author.id, msg.author);
    // The bot user's user object is added since it is not natively included in the recipients collection
	if(!isDM && !isGDM) user = users.filter(m => m.user.username.toLowerCase().startsWith(user) || m.displayName.toLowerCase().startsWith(user)).first();
	if(isDM || isGDM) user = users.filter(u => u.username.toLowerCase().startsWith(user)).first();
	if(!user) return msg.channel.send("User not found!").then(msg => msg.delete(2000));
	msg.channel.fetchMessages({limit: 100}).then(messages => {
		if(!isDM && !isGDM) quoteMsg = messages.filter(message => (message.author.id == user.user.id && message.content.toLowerCase().includes(snippet)) && message.content !== msg.content).first()
		if(isDM || isGDM) quoteMsg = messages.filter(message => (message.author.id == user.id && message.content.toLowerCase().includes(snippet)) && message.content !== msg.content).first();
		if(!quoteMsg) return msg.channel.send("Message not found!").then(msg => msg.delete(2000));
		date = moment(quoteMsg.createdTimestamp).format('Do MMM YYYY'),
        time = moment(quoteMsg.createdTimestamp).format('HH:mm:ss');
		if(!isDM && !isGDM) name = user.displayName, avatar = user.user.avatarURL;
		if(isDM || isGDM) name = user.username, avatar = user.avatarURL;
		embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
		quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": quoteMsg.content, "avatar": avatar};
		fs.writeFileSync('userconfig/savedQuotes.json', JSON.stringify(quotes));
		return msg.channel.send(`**__The following quote was successfully saved under the '${quoteName}' name:__**`, {embed: embed}).then(msg => msg.delete(2000));
	});
};

exports.desc = "Save a quote from within the last 100 overall messages";
exports.syntax = "<quoteName> <username> <message snippet>";