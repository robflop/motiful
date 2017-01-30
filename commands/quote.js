const config = require('../config.json'); // Import configuration
const Discord = require('discord.js'); // For defining the embed
const moment = require('moment'); // For embed timestamp

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "quote";
    var user = msgArray[1];
    // Define username of user to quote out of array
    var response = "";
    // Response placeholder
    var snippet = "";
    // Snippet placeholder
    var isDM = false;
    var users;
    if(msg.content.includes("/")) {
    // If the message contains a slash...
        response = msg.content.substring(msg.content.lastIndexOf('/')+2);
        // ...Define the response to the to-be-quoted message out of the msg content
        snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2, msg.content.lastIndexOf('/')-1);
        // Define snippet of to-be-quoted message out of the msg content
    }
    else {
        snippet = msg.content.substring(config.commandPrefix.length + command.length + user.length + 2);
        // Define snippet out of message content, excluding response
    }
    var embed = new Discord.RichEmbed();
    // Define the embed
    if(msg.channel.type == "text") {
    // 1) If the command is called from a server's channel...
        users = msg.guild.members.array();
        //...get all members of the server to match the ID below.
    }
    else if(msg.channel.type == "dm") {
    // 2) If the command is called in a DM channel...
        isDM = true;
        user = msg.channel.recipient.id;
        // ...define user as the recipient's ID and set isDM to true
    }
    else {
    // If the command is called in neither a server's channel nor pm...
        msg.edit("Quote only supported on Servers or PMs, sorry.").then(msg => msg.delete(2000));
        return; // Abort command execution
    };
    if(!isDM) {
    // If the channel is not a DM channel...
        for(var i=0; i<users.length; i++) {
        // ...loop through server users.
            if(users[i].displayName.startsWith(user) || users[i].user.username.startsWith(user)) {
            // If the displayName of current user in iteration matches the username of the user to quote...
                user = users[i].id;
                // ...redefine the user argument as the user ID of the user in the current iteration
            };
        };
    };
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        msg.delete().catch(console.error);
        // Delete the command call
        messages = messages.array();
        // Convert messages collection to array
        for(var j=1; j<messages.length; j++) {
        // Loop through the fetched messages
            if(messages[j].author.id == user && messages[j].content.includes(snippet)) {
            // If the message is by the bot owner and contains the snippet...
                if(!isDM) {
                // ...1) and if the channel is not a DM channel...
                    embed.setColor(5267072) // ...set the embed properties.
                         .setAuthor(`${msg.guild.member(user).displayName} wrote on the ${moment(messages[j].createdTimestamp).format('Do MMM YYYY')} at ${moment(messages[j].createdTimestamp).format('HH:mm:ss')}:`, msg.guild.member(user).user.avatarURL)
                         .setDescription(messages[j].content);
                    msg.channel.sendEmbed(embed).catch(console.error).then(msg => {if(response !== "") {msg.channel.sendMessage(response)}});
                    return; // Abort command execution
                };
                // ...2) and the channel is a DM channel...
                embed.setColor(5267072) // ...set the embed properties.
                     .setAuthor(`${msg.channel.recipient.username} wrote on the ${moment(messages[j].createdTimestamp).format('Do MMM YYYY')} at ${moment(messages[j].createdTimestamp).format('HH:mm:ss')}:`, msg.channel.recipient.avatarURL)
                     .setDescription(messages[j].content);
                msg.channel.sendEmbed(embed).catch(console.error).then(msg => {if(response !== "") {msg.channel.sendMessage(response)}});
                return; // Abort command execution
            };
        };
    }).catch(console.error);
};

exports.desc = "Quote a user's message (only from the last 100 overall messages)" // Export command description
exports.syntax = "<username> <message snippet> / <response, optional>" // Export command syntax