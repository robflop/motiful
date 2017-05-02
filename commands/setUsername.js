const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "setUsername";
	msgArray.shift(); // remove command call
	const arg = msgArray.join(" "); // join the rest
	if(arg.length<2 || arg.length>32) return msg.edit("username must be at least 2 characters long but shorter than 32!").then(msg => msg.delete(2000));
	client.user.setUsername(arg).then(user => msg.edit(`Successfully set your username to '${arg}' ! \n(May not have worked if ratelimit capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your username";
exports.syntax = "<username to set yourself to>";