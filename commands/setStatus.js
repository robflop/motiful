const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "setStatus";
	msgArray.shift(); // remove command call
	const arg = msgArray.join(" "); // join the rest
	if(arg == "") return client.user.setGame(null).then(user => msg.edit("Successfully cleared your status!\n").then(msg => msg.delete(2000)));
	client.user.setGame(arg).then(user => msg.edit(`Successfully set your game to '${arg}' !\n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your current status";
exports.syntax = "<status to set yourself to>";