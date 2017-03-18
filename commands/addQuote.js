const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const Discord = require('discord.js'); // For defining the embed
const moment = require('moment'); // For embed timestamp
const quotes = require('../userconfig/saved_quotes.json'); // Load saved quotes object

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "addQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) {
    // If no arguments were specified...
        return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s and abort command execution
    };
    msg.delete();
    // Delete the command call
    var quoteName, user, name, avatar, date, time, users, quoteMsg, snippet;
    // Define placeholders
    if(msgArray[1].startsWith('"')) {
    // If the quote name is a multi-word name...
        quoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
        // ...assign the quote name value to the cut-out "" part and replace all spaces with underscores...
        user = msg.content.substring(msg.content.lastIndexOf('"')+2, msg.content.indexOf(" ", msg.content.lastIndexOf('"')+2));
        // ...and assign the user value out of the message content beyond the quote name.
    }
    else {
    // If the quote name is a single-word name...
        quoteName = msgArray[1];
        // ...assign the quote name value out of the array...
        user = msgArray[2];
        // ...and assign the user out out the array.
    }
    snippet = msg.content.substring(config.commandPrefix.length + command.length + quoteName.length + user.length + 3);
    // Define quote snippet out of message content
    var isDM = false;
    // Define the "isDM" indicator bool, default to false
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
        return msg.edit("Quote only supported on Servers or DMs, sorry.").then(msg => msg.delete(2000));
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
        // Define date and time based on the filtered message
        if(!isDM) name = user.displayName, avatar = user.user.avatarURL
        else name = user.username, avatar = user.avatarURL;
        // Set respective username and avatar
        embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
        // Set embed properties
        quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": quoteMsg.content, "avatar": avatar};
        // Save the quote to the quotes list...
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        return msg.channel.sendEmbed(embed, `**__The following quote was successfully saved under the '${quoteName}' name:__**`).then(msg => {msg.delete(2000)});
        // Send confirmation message, set auto-delete to 2s and abort command execution
    });
};

exports.desc = "Save a quote from within the last 100 overall messages"; // Export command description
exports.syntax = "<quoteName> <username> <message snippet>"; // Export command syntax