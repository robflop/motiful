exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "ping";
    msg.delete()
    msg.channel.sendMessage('Pong?').then(message => {
            message.edit(`Pong'ed in ${message.createdTimestamp - msg.createdTimestamp}ms!`)
            message.delete(2000).catch(console.error);
    });
};

exports.desc = "Measure the delay between your input and the selfbot's execution"; // Export command description
exports.syntax = "" // Export command syntax 