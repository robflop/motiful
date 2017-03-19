const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "setNickname";
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 1);
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit("Specify a nickname to set yourself to!").then(msg => msg.delete(2000));
	msg.guild.member(client.user).setNickname(arg);
	msg.edit(`Successfully set your nickname to '${arg}' ! \n(May not have worked if you aren't allowed to set your own nickname)`).then(msg => msg.delete(2000));};

exports.desc = "Set your own nickname for this server";
exports.syntax = "<nickname to set yourself to>";