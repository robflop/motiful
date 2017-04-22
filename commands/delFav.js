const config = require('../userconfig/config.json');
const fs = require('fs');
const favs = require('../userconfig/favoriteEmotes.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "delFav";
	const favmote = msgArray[1];
	if(favs.hasOwnProperty(favmote)) {
		delete favs[favmote];
		fs.writeFileSync('userconfig/favoriteEmotes.json', JSON.stringify(favs));
		return msg.edit(`Emote '${favmote}' removed from favorites list!`).then(msg => msg.delete(2000));
	}
	msg.edit(`Emote '${favmote}' not found on favorite emotes list!`).then(msg => msg.delete(2000));
};

exports.desc = "Delete a twitch subscriber, FFZ or BTTV emote from your favorites";
exports.syntax = "<favoriteName>";