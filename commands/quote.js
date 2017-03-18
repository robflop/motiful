const config = require('../userconfig/config.json'); // Import configuration
const Discord = require('discord.js'); // For defining the embed
const moment = require('moment'); // For embed timestamp

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "quote";
    if(msg.content == config.commandPrefix + command) return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
    // Abort if no arguments given
    msg.delete();
    var user = msgArray[1].toLowerCase();
    var response, snippet, users, date, time, name, avatar, quoteMsg;
    // Define placeholders
    var isDM = false, isGDM = false;
    // For working with channel types later
    if(msg.content.includes("/")) {
    // If the message contains a slash indicating a response...
        response = msg.content.substring(msg.content.lastIndexOf('/')+2);
        // ...grab the response.
        snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2, msg.content.lastIndexOf('/')-1).toLowerCase();
        // Define the snippet up to the slash indicating the response
    }
    else snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2).toLowerCase();
    // Define snippet out of msg content
    var embed = new Discord.RichEmbed();
    // Define the embed as new RichEmbed
    if(msg.channel.type == "text") users = msg.guild.members;
    else if(msg.channel.type == "dm") isDM = true, users = [msg.channel.recipient, selfbot.user];
    else if(msg.channel.type == "group") isGDM = true, users = msg.channel.recipients.set(msg.author.id, msg.author);
    // Define user/member groups based on channel type
    // The bot user's user object is added since it is not natively included in the recipients collection
    if(!isDM && !isGDM) user = users.filter(m => m.user.username.toLowerCase().startsWith(user) || m.displayName.toLowerCase().startsWith(user)).first();
    if(isGDM) user = users.filter(u => u.username.toLowerCase().startsWith(user)).first();
    if(isDM) user = users.filter(u => u.username.toLowerCase().startsWith(user))[0];
    // Define targeted user based on channel type
    if(!user) return msg.channel.sendMessage("User not found!").then(msg => msg.delete(2000));
    // If user was not found, notify user and abort command execution
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
        if(!isDM && !isGDM) quoteMsg = messages.filter(message => (message.author.id == user.user.id && message.content.toLowerCase().includes(snippet)) && message.content !== msg.content).first()
        if(isDM || isGDM) quoteMsg = messages.filter(message => (message.author.id == user.id && message.content.toLowerCase().includes(snippet)) && message.content !== msg.content).first();
        // Filter fetched messages by the user to quote, the snippet and if the message content equals the command call
        if(!quoteMsg) return msg.channel.sendMessage("Message not found!").then(msg => msg.delete(2000));
        // If to-be-quoted message was not found, notify user and abort command execution
        date = moment(quoteMsg.createdTimestamp).format('Do MMM YYYY'),
        time = moment(quoteMsg.createdTimestamp).format('HH:mm:ss');
        // Define date and time based on the filtered message
        if(!isDM && !isGDM) name = user.displayName, avatar = user.user.avatarURL;
        if(isDM || isGDM) name = user.username, avatar = user.avatarURL;
        // Set respective username and avatar
        embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
        return msg.channel.sendEmbed(embed).then(msg => {if(response) {msg.channel.sendMessage(response)}});
        // Send quote and possibly existing response
    });
};

exports.desc = "Quote a user's message (only from the last 100 overall messages)"; // Export command description
exports.syntax = "<username> <message snippet> / <response, optional>"; // Export command syntax