const favs = require('../userconfig/favoriteEmotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "listFavs";
	if(Object.keys(favs).length == 0) msg.edit("No emotes have been favorited.").then(msg => {return msg.delete(5000);})
	msg.edit(`Current favorite emotes are: \`\`\`${Object.keys(favs).join(", ")}\`\`\``).then(msg => msg.delete(30000));
};

exports.desc = "List your favorite emotes";
exports.syntax = "";