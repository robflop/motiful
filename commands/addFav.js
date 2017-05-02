const config = require('../userconfig/config.json');
const fs = require('fs');
const subEmotes = require('../twitchemotes/subscriber.json');
const favs = require('../userconfig/favoriteEmotes.json');
const bttv = require('../twitchemotes/bttv.json');
const request = require('request');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "addFav";
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify an emote!').then(msg => msg.delete(2000));
	let twChannel = msgArray[1];
	const emoteName = msgArray[2];
	let emoteFound = false;
	if(favs.hasOwnProperty(emoteName)) return msg.edit(`Emote '${emoteName}' is already on the favorites list!`).then(msg => msg.delete(2000));
	if(subEmotes["channels"][twChannel.toLowerCase()] !== undefined) {
    // sub fav
		twChannel = twChannel.toLowerCase();
		for(let i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
			if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) emoteFound = true;
		};
		if(!emoteFound) return msg.edit(`Emote '${emoteName}' not found on the '${twChannel}' channel!`).then(msg => msg.delete(2000));
		favs[emoteName] = {"twChannel": twChannel, "emoteName": emoteName};
		fs.writeFileSync('./userconfig/favoriteEmotes.json', JSON.stringify(favs));
		return msg.edit(`Emote '${emoteName}' added to favorites!`).then(msg => msg.delete(2000));
	}
	else if(twChannel.toLowerCase() == "ffz") {
    // ffz fav
		request.get(`http://api.frankerfacez.com/v1/emoticons?q=${emoteName}&page=1&private=on`, function(error, response, body) {
			if(error) return msg.edit('Error searching FrankerFaceZ emote list occurred: \n\n' + error).then(msg => msg.delete(2000));
			if(response == undefined) return msg.edit('Error contacting website, FrankerFaceZ emote list response undefined').then(msg => msg.delete(2000));
			if(body) {
				const emoteList = JSON.parse(body);
				for(let i = 0; i < emoteList["emoticons"].length; i++) {
					if(emoteList["emoticons"][i]["name"] == emoteName) {
						emoteFound = true;
						favs[emoteName] = {"twChannel": twChannel, "emoteName": emoteName};
						fs.writeFileSync('./userconfig/favoriteEmotes.json', JSON.stringify(favs));
						return msg.edit(`Emote '${emoteName}' added to FFZ favorites!`).then(msg => msg.delete(2000));
					};
				};
				if(!emoteFound) return msg.edit(`Emote '${emoteName}' not found on FrankerFaceZ!`).then(msg => msg.delete(2000));
			};
		});
	}
	else if(twChannel.toLowerCase() == "bttv") {
    // bttv fav
		for(let i = 0; i < bttv["emotes"].length; i++) {
			if(bttv["emotes"][i]["code"] == emoteName) {
				emoteFound = true;
				favs[emoteName] = {"twChannel": twChannel, "emoteName": emoteName};
				fs.writeFileSync('./userconfig/favoriteEmotes.json', JSON.stringify(favs));
				return msg.edit(`Emote '${emoteName}' added to BTTV favorites!`).then(msg => msg.delete(2000));
			};
		};
		if(!emoteFound) {msg.edit(`Emote '${emoteName}' not found on BetterTwitchTV!`).then(msg => msg.delete(2000)); return};
	}
	else return msg.edit(`Twitch channel / Extension '${twChannel}' not found!`).then(msg => msg.delete(2000));
};

exports.desc = "Add a twitch subscriber, FrankerFaceZ or BetterTwitchTV emote to your favorites, allowing you to use it without naming the channel/source it is from";
exports.syntax = "<channelName or ffz/bttv> <emoteName>";