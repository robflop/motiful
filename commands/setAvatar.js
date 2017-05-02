const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "setAvatar";
	const arg = msgArray[1];
	if(!arg) return msg.edit("Specify an image!").then(msg => msg.delete(2000));
	if(!arg.startsWith("http")) return msg.edit("Invalid URL.").then(msg => msg.delete(2000));
	const validFormats = [".png", ".jpg", ".gif", ".webp"];
	if(!validFormats.includes(arg.substr(-4, 4))) return msg.edit("Invalid file format! Only png, jpg, gif and webp are allowed.").then(msg => msg.delete(2000));
	client.user.setAvatar(arg).then(() => msg.edit(`Successfully set your avatar to '${arg}' ! \n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)));
};

exports.desc = "Change your avatar";
exports.syntax = "<url to a picture (png, jpg/jpeg, webp, gif (if nitro))>";