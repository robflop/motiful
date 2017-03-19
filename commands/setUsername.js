const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "setUsername";
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 1);
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit("Specify a username to set yourself to!").then(msg => msg.delete(2000));
	client.user.setUsername(arg).then(user => msg.edit(`Successfully set your username to '${arg}' ! \n(May not have worked if ratelimit capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your username";
exports.syntax = "<username to set yourself to>";