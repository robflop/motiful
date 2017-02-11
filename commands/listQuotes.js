const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const quotes = require('../userconfig/saved_quotes.json'); // Saved quotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function 
    var command = "listQuotes";
    if(Object.keys(quotes).length == 0) {msg.edit("No quotes have been saved!").then(msg => msg.delete(10000)); return;};
    // If no quotes have been saved, notify user and set auto-delete to 2s
    msg.edit(`**__Available quotes are:__**\`\`\`${Object.keys(quotes).join(", ")}\`\`\``).then(msg => msg.delete(30000));
    // Send the 
};

exports.desc = "List all saved quotes" // Export command description
exports.syntax = ""; // Export command syntax