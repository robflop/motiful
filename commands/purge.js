const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "purge";
    var amount = parseInt(msgArray[1], 10);
    if(typeof amount !== "number" || isNaN(amount)) return msg.edit("Amount only accepts numbers!").then(msg => msg.delete(2000));
    msg.delete();
    msg.channel.fetchMessages({limit: 100}).then(messages => {
        messages = messages.filterArray(message => message.author.id == config.ownerID && message.content !== msg.content);
        for(var i=0; i<amount; i++) messages[i].delete();
    });
};

exports.desc = "Purge a given amount of your last messages out of the last 100 overall messages";
exports.syntax = "<amount of messages to purge>";