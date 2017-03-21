const config = require('../userconfig/config.json');
const Discord = require('discord.js');
const moment = require('moment');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "quote";
	if(msg.content == config.commandPrefix + command) return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
	msg.delete();
	var user = msgArray[1].toLowerCase();
	var response, snippet, users, date, time, name, avatar, quoteMsg;
    // placeholders
	var isDM = false, isGDM = false;
	if(msg.content.includes("/")) {
    // with response
		response = msg.content.substring(msg.content.lastIndexOf('/')+2);
		snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2, msg.content.lastIndexOf('/')-1).toLowerCase();
	}
	else snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2).toLowerCase();
    // no response
	var embed = new Discord.RichEmbed();
	if(msg.channel.type == "text") users = msg.guild.members;
	else if(msg.channel.type == "dm") isDM = true, users = new Discord.Collection([[msg.channel.recipient.id, msg.channel.recipient], [msg.author.id, msg.author]]);
	else if(msg.channel.type == "group") isGDM = true, users = msg.channel.recipients.set(msg.author.id, msg.author);
    // The bot user's user object is added since it is not natively included in the recipients collection
	if(!isDM && !isGDM) user = users.filter(m => m.user.username.toLowerCase().startsWith(user) || m.displayName.toLowerCase().startsWith(user)).first();
	if(isDM || isGDM) user = users.filter(u => u.username.toLowerCase().startsWith(user)).first();
	if(!user) return msg.channel.send("User not found!").then(msg => msg.delete(2000));
	msg.channel.fetchMessages({limit: 100}).then((messages) => {
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
		return msg.channel.send('', {embed: embed}).then(msg => {if(response) {msg.channel.send(response)}});
	});
};

exports.desc = "Quote a user's message (only from the last 100 overall messages)";
exports.syntax = "<username> <message snippet> / <response, optional>";