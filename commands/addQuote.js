const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const Discord = require('discord.js'); // For defining the embed
const moment = require('moment'); // For embed timestamp
const quotes = require('../userconfig/saved_quotes.json'); // Load saved quotes object

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "addQuote";
    if(msg.content == config.commandPrefix + command) return msg.edit('Specify a username and snippet!').then(msg => msg.delete(2000));
    // Abort if no arguments given
    msg.delete();
    var quoteName, user, name, avatar, date, time, users, quoteMsg, snippet;
    // Define placeholders
    if(msgArray[1].startsWith('"')) {
    // If the quote name is a multi-word name...
        quoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
        // ...assign the quote name value to the cut-out "" part and replace all spaces with underscores...
        user = msg.content.substring(msg.content.lastIndexOf('"')+2, msg.content.indexOf(" ", msg.content.lastIndexOf('"')+2));
        // ...and assign the user value out of the message content beyond the quote name.
    }
    else quoteName = msgArray[1], user = msgArray[2];
    snippet = msg.content.substring(config.commandPrefix.length + command.length + quoteName.length + user.length + 3);
    // Define quote snippet out of message content
    var isDM = false, isGDM = false;
    var embed = new Discord.RichEmbed();
    if(msg.channel.type == "text") users = msg.guild.members;
    else if(msg.channel.type == "dm") isDM = true, users = [msg.channel.recipient, selfbot.user];
    else if(msg.channel.type == "group") isGDM = true, users = msg.channel.recipients.set(msg.author.id, msg.author);
    // Define user/member groups based on channel type
    // The bot user's user object is added since it is not natively included in the recipients collection
    if(!isDM && !isGDM) user = users.filter(m => m.user.username.startsWith(user) || m.displayName.startsWith(user)).first();
    if(isGDM) user = users.filter(u => u.username.startsWith(user)).first();
    if(isDM) user = users.filter(u => u.username.startsWith(user))[0];
    // Define targeted user based on channel type
    if(!user) return msg.channel.sendMessage("User not found!").then(msg => msg.delete(2000));
    // If user was not found, notify user and abort command execution
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
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
        quotes[quoteName] = {"author": `${name} wrote on the ${date} at ${time}:`, "content": quoteMsg.content, "avatar": avatar};
        // Add the entry to the quotes object
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        // Save the new object to the file
        return msg.channel.sendEmbed(embed, `**__The following quote was successfully saved under the '${quoteName}' name:__**`).then(msg => {msg.delete(2000)});
        // Send confirmation message (auto-delete 2s)
    });
};

exports.desc = "Save a quote from within the last 100 overall messages"; // Export command description
exports.syntax = "<quoteName> <username> <message snippet>"; // Export command syntax