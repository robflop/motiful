exports.main = function(client, msg, msgArray, chalk) {
    var command = "ping";
    msg.edit(`Pong! (${Math.round(client.ping)}ms)`);
};

exports.desc = "Measure the delay between your input and the selfbot's command execution";
exports.syntax = "";