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
    var quoteName, user, name, avatar, date, time, users, quoteMsg;
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
    var snippet = msg.content.substring(config.commandPrefix.length + command.length + quoteName.length + user.length + 3);
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
        user = msg.channel.recipient.id;
        // ...and define user as the recipient's ID.
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
            quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": quoteMsg.content, "avatar": avatar};
            // Save the quote to the quotes list...
            fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
            // ...and save the list to the file.
            return msg.channel.sendEmbed(embed, `**__The following quote was successfully saved under the '${quoteName}' name:__**`).then(msg => {msg.delete(2000)});
            // Send confirmation message and set auto-delete to 2s and abort command execution
            };
        // ...2) and the channel is a DM channel...
        name = msg.channel.recipient.username,
        avatar = msg.channel.recipient.avatarURL;
        // ...assign DM-related name and avatar values...
        embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
             .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
             .setDescription(quoteMsg.content);
        // ...and set the embed properties.
        quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": quoteMsg.content, "avatar": avatar};
        // Save the quote to the quotes list...
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        // ...and save the list to the file.
        return msg.channel.sendEmbed(embed, `**__The following quote was successfully saved under the '${quoteName}' name:__**`).then(msg => {msg.delete(2000)});
        // Send confirmation message and set auto-delete to 2s and abort command execution
    });
};

exports.desc = "Save a quote from within the last 100 overall messages"; // Export command description
exports.syntax = "<quoteName> <username> <message snippet>"; // Export command syntax