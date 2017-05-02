const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "setNickname";
	msgArray.shift(); // remove command call
	const arg = msgArray.join(" "); // join the rest
	if(arg.length<2 || arg.length>32) return msg.edit("Nickname must be at least 2 characters long but shorter than 32!").then(msg => msg.delete(2000));
	msg.guild.member(client.user).setNickname(arg);
	msg.edit(`Successfully set your nickname to '${arg}' ! \n(May not have worked if you aren't allowed to set your own nickname)`).then(msg => msg.delete(2000));};

exports.desc = "Set your own nickname for this server";
exports.syntax = "<nickname to set yourself to>";