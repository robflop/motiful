const config = require('../userconfig/config.json'); // Import configuration
const Discord = require('discord.js'); // For defining the embed
const moment = require('moment'); // For embed timestamp

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "quote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) {
    // If no arguments were specified...
        return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s and abort command execution
    };
    msg.delete();
    // Delete the command call
    var user = msgArray[1];
    // Define username of user to quote out of array
    var response, snippet, users, date, time, name, avatar, quoteMsg;
    // Define placeholders
    var isDM = false;
    // Define the "isDM" indicator bool, default to false
    if(msg.content.includes("/")) {
    // If the message contains a slash...
        response = msg.content.substring(msg.content.lastIndexOf('/')+2);
        // ...define the response to the to-be-quoted message out of the msg content...
        snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2, msg.content.lastIndexOf('/')-1);
        // ...and define snippet of to-be-quoted message out of the msg content.
    }
    else {
    // If it does not...
        snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2);
        // ...define snippet out of message content, excluding response.
    }
    var embed = new Discord.RichEmbed();
    // Define the embed as new RichEmbed
    if(msg.channel.type == "text") {
    // 1) If the command is called from a server's channel...
        users = msg.guild.members;
        //...get all members of the server to match the ID below.
    }
    else if(msg.channel.type == "dm") {
    // 2) If the command is called in a DM channel...
        isDM = true;
        // ...switch "isDM" indicator bool to true...
        users = [msg.channel.recipient, selfbot.user];
        // ...put the recipient and the user in an array to filter below.
    }
    else {
    // If the command is called in neither a server's channel nor pm...
        return msg.edit("Quote only supported on Servers or PMs, sorry.").then(msg => msg.delete(2000));
        // ...notify user and set auto-delete to 2s and abort command execution
    };
    if(!isDM) {
    // If the channel is not a DM channel...
        user = users.filter(m => m.user.username.startsWith(user) || m.displayName.startsWith(user)).first();
        // Filter the members collection to select the guildmember object of the to-be-quoted member
    }
    else {
        user = users.filter(u => u.username.startsWith(user))[0];
    }
    if(!user) return msg.channel.sendMessage("User not found!").then(msg => msg.delete(2000));
    // If user was not found, notify user and abort command execution
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        if(!isDM) quoteMsg = messages.filter(message => (message.author.id == user.user.id && message.content.includes(snippet)) && message.content !== msg.content).first()
        else quoteMsg = messages.filter(message => (message.author.id == user.id && message.content.includes(snippet)) && message.content !== msg.content).first();
        // Filter fetched messages by the user to quote, the snippet and if the message content equals the command call
        if(!quoteMsg) return msg.channel.sendMessage("Message not found!").then(msg => msg.delete(2000));
        // If quote was not found, notify user and abort command execution
        date = moment(quoteMsg.createdTimestamp).format('Do MMM YYYY'),
        time = moment(quoteMsg.createdTimestamp).format('HH:mm:ss');
        // Define date and time based on the filtered message...
        if(!isDM) name = user.displayName, avatar = user.user.avatarURL
        else name = user.username, avatar = user.avatarURL;
        // Set respective username and avatar
        embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
        // Set embed properties
        return msg.channel.sendEmbed(embed).then(msg => {if(response) {msg.channel.sendMessage(response)}});
        // Send the quote and the response into the channel the command was called in and abort command execution
    });
};

exports.desc = "Quote a user's message (only from the last 100 overall messages)"; // Export command description
exports.syntax = "<username> <message snippet> / <response, optional>"; // Export command syntax