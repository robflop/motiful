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
        user = msg.channel.recipient.id;
        // ...and define user as the recipient's ID.
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
    };
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        quoteMsg = messages.filter(message => (message.author.id == user.user.id && message.content.includes(snippet)) && message.content !== msg.content).first();
        // Filter fetched messages by the user to quote, the snippet and if the message content equals the command call
        date = moment(quoteMsg.createdTimestamp).format('Do MMM YYYY'),
        time = moment(quoteMsg.createdTimestamp).format('HH:mm:ss');
        // Define date and time based on the filtered message...
        if(!isDM) {
        // ...1) and if the channel is not a DM channel...
            name = user.displayName,
            avatar = user.user.avatarURL;
            // ...assign server-related name and avatar values...
            embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
                 .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
                 .setDescription(quoteMsg.content);
                 // ...and set the embed properties.
            return msg.channel.sendEmbed(embed).then(msg => {if(response) {msg.channel.sendMessage(response)}});
            // Send the quote and the response into the channel the command was called in and abort command execution
        };
        // ...2) and the channel is a DM channel...
        name = msg.channel.recipient.username,
        avatar = msg.channel.recipient.avatarURL;
        // ...assign DM-related name and avatar values...
        embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
        // ...and set the embed properties.
        return msg.channel.sendEmbed(embed).then(msg => {if(response) {msg.channel.sendMessage(response)}});
        // Send the quote and the response into the channel the command was called in and abort command execution
    });
};

exports.desc = "Quote a user's message (only from the last 100 overall messages)"; // Export command description
exports.syntax = "<username> <message snippet> / <response, optional>"; // Export command syntax