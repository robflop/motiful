const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "purge";
    var amount = parseInt(msgArray[1], 10);
    // Define amount to purge out of array
    if(typeof amount !== "number" || isNaN(amount)) {msg.edit("Amount only accepts numbers!").then(msg => {return msg.delete(2000);})};
    // If the amount isn't a number, notify the user, set auto-delete to 2s and abort command execution
    msg.delete();
    // Delete the command call
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get the last 100 messages
        messages = messages.filterArray(message => message.author.id == config.ownerID && message.content !== msg.content);
        // Filter messages collection by the bot owner ID
        for(var i=0; i<amount; i++) {
        // Loop through the fetched messages array
                messages[i].delete();
            // Delete the messages
        };
    });
};

exports.desc = "Purge a given amount of your last messages out of the last 100 overall messages"; // Export command description
exports.syntax = "<amount of messages to purge>"; // Export command syntax