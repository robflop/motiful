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
    var quoteName, user, name, avatar, date, time, users;
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
        users = msg.guild.members.array();
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
        for(var i=0; i<users.length; i++) {
        // ...loop through server users.
            if(users[i].displayName.startsWith(user) || users[i].user.username.startsWith(user)) {
            // If the displayName or username of current user in iteration matches the username of the user to quote...
                user = users[i].id;
                // ...redefine the user argument as the user ID of the current user in iteration.
            };
        };
    };
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        msg.delete();
        // Delete the command call
        messages = messages.array();
        // Convert messages collection to array
        for(var j=1; j<messages.length; j++) {
        // Loop through the fetched messages
            if(messages[j].author.id == user && messages[j].content.includes(snippet)) {
            // If the message is by the specified user and contains the snippet...
                date = moment(messages[j].createdTimestamp).format('Do MMM YYYY'),
                time = moment(messages[j].createdTimestamp).format('HH:mm:ss');
                // ...asssign time and date values...
                if(!isDM) {
                // ...1) and if the channel is not a DM channel...
                    name = msg.guild.member(user).displayName,
                    avatar = msg.guild.member(user).user.avatarURL;
                    // ...assign server-related name and avatar values...
                    embed.setColor(5267072) 
                         .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
                         .setDescription(messages[j].content);
                    // ...and set the embed properties.
                    quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": messages[j].content, "avatar": avatar};
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
                embed.setColor(5267072) 
                     .setAuthor(`${name} wrote on the ${date} at ${time}:`, avatar)
                     .setDescription(messages[j].content);
                // ...and set the embed properties.
                quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": messages[j].content, "avatar": avatar};
                // Save the quote to the quotes list...
                fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
                // ...and save the list to the file.
                return msg.channel.sendEmbed(embed, `**__The following quote was successfully saved under the '${quoteName}' name:__**`).then(msg => {msg.delete(2000)});
                // Send confirmation message and set auto-delete to 2s and abort command execution
            };
        };
    })
};

exports.desc = "Save a quote from within the last 100 overall messages"; // Export command description
exports.syntax = "<quoteName> <username> <message snippet>"; // Export command syntax