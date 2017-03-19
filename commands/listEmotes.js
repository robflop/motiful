const config = require('../userconfig/config.json');
const fs = require('fs');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "listEmotes";
    var customPath = require("path").join(__dirname, "../customemotes/");
    var emotes = [];
    // placeholder
    fs.readdirSync(customPath).forEach(function(file) {
	    if(file.substr(-4, 4) == ".png" || file.substr(-4, 4) == ".jpg" || file.substr(-4, 4) == ".gif") {
		    var emoteFile = file.slice(0, -4).replace(/_/g," ");
		    emotes.push(emoteFile);
	    };
    });
    if(emotes == 0) return msg.edit("No custom emotes have been added.").then(msg => msg.delete(5000));
    msg.edit(`Available custom emotes are: \`\`\`${emotes.join(", ")}\`\`\``).then(msg => msg.delete(30000));
};

exports.desc = "List all custom emotes available";
exports.syntax = "";