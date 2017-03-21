exports.main = function(client, msg, msgArray, chalk) {
	var command = "ping";
	var ping = Math.ceil(client.ping);
	msg.edit(`P${"o".repeat(ping/100)}ng! (${ping}ms)`);
};

exports.desc = "Measure the delay between your input and the selfbot's command execution";
exports.syntax = "";