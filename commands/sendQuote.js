const config = require('../userconfig/config.json'); // Import configuration
const Discord = require('discord.js'); // For defining the embed
const quotes = require('../userconfig/saved_quotes.json'); // Load saved quotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function 
    var command = "sendQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) {
    // If no arguments were specified...
        msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution 
    };
    var quoteName = msgArray[1];
    // Define quote name out of the array
    if(!quotes.hasOwnProperty(quoteName)) {
    // If the quote is not found...
        msg.edit(`Quote '${quoteName}' not found!`).then(msg => msg.delete(2000));
        // ...notify the user and set auto-delete to 2s.
        return; // Abort command execution
    };
    msg.delete();
    // Delete the command call
    var embed = new Discord.RichEmbed();
    // Define the embed as new RichEmbed
    var quote = quotes[quoteName];
    // Define the quote entry of the object as "quote"
    embed.setColor(5267072) 
         .setAuthor(quote["author"], quote["avatar"])
         .setDescription(quote["content"]);
    // Set the embed properties
    msg.channel.sendEmbed(embed);
    // Send the embed
};

exports.desc = "Post a saved quote"; // Export command description
exports.syntax = "<quoteName>"; // Export command syntax