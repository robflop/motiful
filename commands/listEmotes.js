const config = require('../userconfig/config.json');
const fs = require('fs');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "listEmotes";
	const customPath = require("path").join(__dirname, "../customemotes/");
	const validExts = [".png", ".jpg", ".gif"];
	const emotes = [];
    // placeholder
	fs.readdirSync(customPath).forEach(function(file) {
		const ext = file.substr(-4, 4);
		if(validExts.includes(ext)) {
			const emoteFile = file.slice(0, -4).replace(/_/g," ");
			emotes.push(emoteFile);
		};
	});
	if(emotes.length == 0) return msg.edit("No custom emotes have been added.").then(msg => msg.delete(5000));
	msg.edit(`Available custom emotes are: \`\`\`${emotes.join(", ")}\`\`\``).then(msg => msg.delete(30000));
};

exports.desc = "List all custom emotes available";
exports.syntax = "";