const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "sub";
    var toReplace = msg.content.substring(config.commandPrefix.length + command.length + 1, msg.content.lastIndexOf("/"));
    // Define part of original message to be replaced
    var replaceWith = msg.content.substring(msg.content.lastIndexOf("/")+1);
    // Define what to replace the above part with out of message
    if(toReplace == ""){ msg.edit("Specify a part to replace!").then(msg => {return msg.delete(2000);});
    // If the toReplace argument is empty, notify user and set auto-delete to 2s
    msg.delete();
    // Delete the command call
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        messages = messages.array();
        // Convert messages collection to array
        for(var i=1; i<messages.length; i++) {
        // Loop through the fetched messages
            if(messages[i].author.id == config.ownerID && messages[i].content.includes(toReplace)) {
            // If the message is by the bot owner and contains the part to be replaced...
                var newMsg = messages[i].content.replace(toReplace, replaceWith);
                // ...define the new message as original message with replaced content...
                messages[i].edit(newMsg);
                // ...and replace the content of the old message with the new message.
                return; // Abort command execution as to not edit other messages
            };
        };
    })
};

exports.desc = "Replace a part of one of your messages (Only from last 100 overall Messages)"; // Export command description
exports.syntax = "<word or phrase to replace>/<word or phrase to replace with>"; // Export command syntax