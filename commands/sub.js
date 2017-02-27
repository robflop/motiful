const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "sub";
    var toReplace = msg.content.substring(config.commandPrefix.length + command.length + 1, msg.content.lastIndexOf("/"));
    // Define part of original message to be replaced out of the message
    var replaceWith = msg.content.substring(msg.content.lastIndexOf("/")+1);
    // Define what to replace the above part with out of the message
    if(toReplace == ""){ msg.edit("Specify a part to replace!").then(msg => {return msg.delete(2000);})};
    // If the toReplace argument is empty, notify user and set auto-delete to 2s
    msg.delete();
    // Delete the command call
    msg.channel.fetchMessages({limit: 100}).then((messages) => {
    // Get last 100 messages
        var message = messages.filter(message => (message.author.id == config.ownerID && message.content.includes(toReplace)) && message.content !== msg.content).first();
        // Filter fetched messages by the owner ID and the to-be-replaced string
        var newMsg = message.content.replace(toReplace, replaceWith);
        // Define the new message as the old with replaced content
        return message.edit(newMsg);
        // Edit the message and abort command execution
    });
};

exports.desc = "Replace a part of one of your messages (Only from last 100 overall Messages)"; // Export command description
exports.syntax = "<word or phrase to replace>/<word or phrase to replace with>"; // Export command syntax