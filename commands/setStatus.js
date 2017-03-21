const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "setStatus";
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 1);
	if(arg == "") return client.user.setGame().then(user => msg.edit("Successfully cleared your status!\n").then(msg => msg.delete(2000)));
	client.user.setGame(arg).then(user => msg.edit(`Successfully set your game to '${arg}' !\n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your current status";
exports.syntax = "<status to set yourself to>";