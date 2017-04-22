const config = require('../userconfig/config.json');
const fs = require('fs');
const request = require('request');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "addEmote";
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify arguments!').then(msg => msg.delete(2000));
	let emoteName, emoteURL, emoteExt, attachment;
    // placeholders
	if(msgArray[1].startsWith('"')) {
    // multi-word emote
		emoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
		if(msg.attachments.size>0) attachment = msg.attachments.first(), emoteURL = attachment.url;
		else emoteURL = msg.content.substring(msg.content.lastIndexOf('"')+2);
	}
	else {
    // single-word emote
		emoteName = msgArray[1];
		if(msg.attachments.size>0) attachment = msg.attachments.first(), emoteURL = attachment.url;
		else emoteURL = msgArray[2];
	};
	if((emoteName.startsWith("http") || (msg.attachments.size>0)) && !emoteURL) {
		if(msg.attachments.size>0) {
			emoteName = attachment.url.substring(attachment.url.lastIndexOf("/")+1, attachment.url.lastIndexOf(".")),
            emoteURL = attachment.url;
		}
		else {
			emoteName = msgArray[1].substring(msgArray[1].lastIndexOf("/")+1, msgArray[1].lastIndexOf(".")),
            emoteURL = msgArray[1];
		};
	};
	if(emoteURL && emoteURL.startsWith("http")) emoteExt = emoteURL.substr(-4, 4);
	if(emoteExt !== ".png" && emoteExt !== ".jpg" && emoteExt !== ".gif") return msg.edit("Only PNGs, JPGs and GIFs are accepted, sorry.").then(msg => msg.delete(2000));
	const customPath = require("path").join(__dirname, "../customemotes/");
	if(fs.existsSync(customPath + emoteName + emoteExt)) return msg.edit('Emote with that name already exists!').then(msg => msg.delete(2000));
	const getFile = request.get(emoteURL, function(error, response, body) {
		if(!response || error) return msg.edit('Error contacting website!').then(msg => msg.delete(2000));
	}).pipe(fs.createWriteStream(customPath + emoteName + emoteExt));
	setTimeout(() => getFile.close(), 60000);
    // 60s dl timeout
	getFile.on('error', () => msg.edit(`Error writing file for the '${emoteName.replace(/_/g," ")}' emote!`).then(msg => {msg.delete(2000); getFile.end()}));
	getFile.on('finish', () => msg.edit(`Successfully added emote '${emoteName.replace(/_/g," ")}'!`).then(msg => msg.delete(2000)));
};

exports.desc = "Add a custom emote - Multi-word custom emotes need to be enclosed by \"quotes\".";
exports.syntax = "<emoteName or url if no name> <url if name specified>";