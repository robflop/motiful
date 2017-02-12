const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const quotes = require('../userconfig/saved_quotes.json'); // Load saved quotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function 
    var command = "delQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) {
    // If no quote name was specified...
        msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution 
    };
    var quoteName = msgArray[1];
    // Define quote name out of the array
    if(quotes.hasOwnProperty(quoteName)) {
    // If the quote is on the quotes list...
        delete quotes[quoteName];
        // ...delete the quote entry of the object...
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        // ...write the object to the file...
        msg.edit(`Quote '${quoteName}' successfully deleted!`).then(msg => msg.delete(2000));
        // ...and notify the user of success, set auto-delete to 2s.
        return; // Abort command execution
    };
    // If the quote is not on the quotes list...
    msg.edit(`Quote '${quoteName}' not found on quotes list!`).then(msg => msg.delete(2000));
    // ...notify the user and set auto delete to 2s.
};

exports.desc = "Delete a saved quote"; // Export command description
exports.syntax = "<quoteName>"; // Export command syntax