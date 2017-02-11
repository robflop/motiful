const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const quotes = require('../userconfig/saved_quotes.json'); // Saved quotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function 
    var command = "delQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) {
        // If no arguments were specified...
        msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution 
    };
    var quoteName = msgArray[1];
    // Define quote name out of the array
    if(quotes.hasOwnProperty(quoteName)) {
    // If the emote is on the favorites list...
        delete quotes[quoteName];
        // ...delete the emote out of the object...
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        // ...write the object to the file...
        msg.edit(`Quote '${quoteName}' successfully deleted!`).then(msg => msg.delete(2000));
        // ...and notify the user of success, set auto-delete to 2s.
        return; // Abort command execution
    };
    msg.edit(`Quote '${quoteName}' not found on quotes list!`).then(msg => msg.delete(2000));
};

exports.desc = "Delete a saved quote"; // Export command description
exports.syntax = "<quotename>"; // Export command syntax