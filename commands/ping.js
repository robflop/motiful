exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "ping";
    msg.delete();
    // Delete the command call
    msg.channel.sendMessage('Pong?').then(message => {
            message.edit(`Pong'ed in ${message.createdTimestamp - msg.createdTimestamp}ms!`);
            message.delete(2000);
    });
};

exports.desc = "Measure the delay between your input and the selfbot's command execution"; // Export command description
exports.syntax = ""; // Export command syntax