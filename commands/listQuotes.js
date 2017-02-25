const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const quotes = require('../userconfig/saved_quotes.json'); // Load saved quotes object

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function 
    var command = "listQuotes";
    if(Object.keys(quotes).length == 0) {msg.edit("No quotes have been saved!").then(msg => {return msg.delete(5000);})};
    // If no quotes have been saved, notify user and set auto-delete to 5s
    msg.edit(`**__Available quotes are:__**\`\`\`${Object.keys(quotes).join(", ")}\`\`\``).then(msg => msg.delete(20000));
    // Send the list of saved quotes and set auto-delete to 20s.
};

exports.desc = "List all saved quotes" // Export command description
exports.syntax = ""; // Export command syntax