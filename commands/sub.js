const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "sub";
	var toReplace = msg.content.substring(config.commandPrefix.length + command.length + 1, msg.content.lastIndexOf("/"));
	var replaceWith = msg.content.substring(msg.content.lastIndexOf("/")+1);
	if(toReplace == "") return msg.edit("Specify a part to replace!").then(msg => msg.delete(2000));
	msg.delete();
	msg.channel.fetchMessages({limit: 100}).then((messages) => {
		var message = messages.filter(message => (message.author.id == config.ownerID && message.content.includes(toReplace)) && message.content !== msg.content).first();
		var newMsg = message.content.replace(toReplace, replaceWith);
		return message.edit(newMsg);
	});
};

exports.desc = "Replace a part of one of your messages (Only from last 100 overall Messages)";
exports.syntax = "<word or phrase to replace>/<word or phrase to replace with>";