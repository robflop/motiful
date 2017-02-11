const config = require('../config.json'); // Import configuration
const Discord = require('discord.js'); // For defining the embed
const quotes = require('../saved_quotes.json'); // Saved quotes object

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
    // Define the embed
    var quote = quotes[quoteName];
    // Define the quote name as "quote"
    embed.setColor(5267072) // ...set the embed properties.
         .setAuthor(quote.substring(0, quote.indexOf("|.|")), quote.substring(quote.lastIndexOf("|.|")+3))
         .setDescription(quote.substring(quote.indexOf("|.|")+3, quote.lastIndexOf("|.|")));
    msg.channel.sendEmbed(embed);
    // Send the embed
};

exports.desc = "Post a saved quote"; // Export command description
exports.syntax = "<quotename>"; // Export command syntax