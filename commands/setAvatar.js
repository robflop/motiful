const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "setAvatar";
	var arg = msgArray[1];
	if(!arg) return msg.edit("Specify an image!").then(msg => msg.delete(2000));
	if(!arg.startsWith("http")) return msg.edit("Invalid URL.").then(msg => msg.delete(2000));
	if(arg.substr(-4, 4) !== ".png" && arg.substr(-4, 4) !== ".jpg" && arg.substr(-4, 4) !== ".gif" && arg.substr(-5, 5) !== ".jpeg" && arg.substr(-5, 5) !== ".webp") {
		return msg.edit("Invalid file format! Only png, jpg/jpeg, gif and webp are allowed.").then(msg => msg.delete(2000));
	};
	client.user.setAvatar(arg).then(() => msg.edit(`Successfully set your avatar to '${arg}' ! \n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your avatar";
exports.syntax = "<url to a picture (png, jpg/jpeg, webp, gif (if nitro))>";