const config = require('../userconfig/config.json');
const fs = require('fs');
const moment = require('moment');
const globalEmotes = require('../twitchemotes/global.json');
const subEmotes = require('../twitchemotes/subscriber.json');
const bttv = require('../twitchemotes/bttv.json');
const favs = require('../userconfig/favoriteEmotes.json');
const request = require('request');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "emote";
	if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify an emote!').then(msg => msg.delete(2000));
	const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
	let twChannel = "";
    // placeholder
	if(msgArray[1].startsWith('"')) twChannel = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
    // multi-word emote
	else twChannel = msgArray[1];
    // single-word emote
	let emoteName = msgArray[2];
	let emoteURL = "";
	let emoteSize = msgArray[3];
	let emoteID = "";
    // placeholders
	msg.delete();
	if(emoteSize == undefined || ( emoteSize !== "1.0" && emoteSize !== "2.0" && emoteSize !== "3.0" )) emoteSize = "1.0";
	const customPath = require("path").join(__dirname, "../customemotes/");
	if(globalEmotes["emotes"][msgArray[1]] !== undefined) {
    // global emote
		emoteName = msgArray[1];
		emoteSize = msgArray[2];
		if(msgArray[2] == undefined || ( msgArray[2] !== "1.0" && msgArray[2] !== "2.0" && msgArray[2] !== "3.0" )) msgArray[2] = "1.0";
		emoteSize = msgArray[2];
		twChannel = "";
		emoteID = globalEmotes["emotes"][emoteName]["image_id"];
		emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`;
		return msg.channel.send('', {file: {attachment: emoteURL, name: `${emoteName}.png}`}});
	};
	if(subEmotes["channels"][twChannel.toLowerCase()] !== undefined) {
    // sub emote
		twChannel = twChannel.toLowerCase();
		for(let i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
			if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) {
				emoteID = subEmotes["channels"][twChannel]["emotes"][i]["image_id"];
				emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`;
				return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + ".png"}});
			};
		};
	};
	if(twChannel.toLowerCase() == "ffz") {
    // ffz emote
		request.get(`http://api.frankerfacez.com/v1/emoticons?q=${emoteName}&page=1&private=on`, function(error, response, body) {
			if(error) {console.log(`[${timestamp}]${chalk.red("[REQUEST-ERROR]")} Error searching FrankerFaceZ emote list occurred: ${error}`); return msg.edit("Error contacting the website! (Try again?)").then(msg => msg.delete(2000));};
			if(response == undefined) {console.log(`[${timestamp}]${chalk.red("[REQUEST-ERROR]")} FrankerFaceZ emote list response undefined`); return msg.edit("Error contacting the website! (Try again?)").then(msg => msg.delete(2000));};
			if(body) {
				if(msgArray[3] == undefined || ( msgArray[3] !== "1" && msgArray[3] !== "2" && msgArray[3] !== "4" )) msgArray[3] = "1";
				emoteSize = msgArray[3];
				const emoteList = JSON.parse(body);
				for(let i = 0; i < emoteList["emoticons"].length; i++) {
					if(emoteList["emoticons"][i]["name"] == emoteName && emoteID == "") {
						emoteID = emoteList["emoticons"][i]["id"];
						emoteURL = `http://cdn.frankerfacez.com/emoticon/${emoteID}/${emoteSize}`;
						return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + ".png"}});
					};
				};
			};
		});
	};
	if(twChannel.toLowerCase() == "bttv") {
    // bttv emote
		if(msgArray[3] == undefined || ( msgArray[3] !== "1" && msgArray[3] !== "2" && msgArray[3] !== "3" )) msgArray[3] = "1";
		emoteSize = msgArray[3];
		for(let i = 0; i < bttv["emotes"].length; i++) {
			if(bttv["emotes"][i]["code"] == emoteName && emoteID == "") {
				emoteID = bttv["emotes"][i]["id"];
				emoteURL = `https://cdn.betterttv.net/emote/${emoteID}/${emoteSize}x`;
				return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + "." + bttv["emotes"][i]["imageType"]}});
			};
		};
	};
	if(fs.existsSync(`./${customPath + twChannel.replace(/ /g,"_")}.png`) || fs.existsSync(`./${customPath + twChannel.replace(/ /g,"_")}.jpg`) || fs.existsSync(`./${customPath + twChannel.replace(/ /g,"_")}.gif`)) {
    // local emote
		if(fs.existsSync(`./${customPath + twChannel}.png`)) emoteURL = customPath + twChannel + ".png";
		if(fs.existsSync(`./${customPath + twChannel}.jpg`)) emoteURL = customPath + twChannel + ".jpg";
		if(fs.existsSync(`./${customPath + twChannel}.gif`)) emoteURL = customPath + twChannel + ".gif";
		emoteName = emoteURL.replace(customPath, '');
		msg.channel.send('', {file: {attachment: emoteURL, name: emoteName}});
	};
	if(favs.hasOwnProperty(twChannel)) {
    // favs
		emoteName = favs[twChannel]["emoteName"];
		twChannel = favs[twChannel]["twChannel"];
		if(favs[emoteName]["twChannel"] == "bttv") {
        // bttv fav
			if(msgArray[2] == undefined || ( msgArray[2] !== "1" && msgArray[2] !== "2" && msgArray[2] !== "3" )) msgArray[2] = "1";
			emoteSize = msgArray[2];
			for(let i = 0; i < bttv["emotes"].length; i++) {
				if(bttv["emotes"][i]["code"] == emoteName && emoteID == "") {
					emoteID = bttv["emotes"][i]["id"];
					emoteURL = `https://cdn.betterttv.net/emote/${emoteID}/${emoteSize}x`;
					return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + "." + bttv["emotes"][i]["imageType"]}});
				};
			};
		}
		else if(favs[emoteName]["twChannel"] == "ffz") {
        // ffz fav
			if(msgArray[2] == undefined || ( msgArray[2] !== "1" && msgArray[2] !== "2" && msgArray[2] !== "4" )) msgArray[2] = "1";
			emoteSize = msgArray[2];
			request.get(`http://api.frankerfacez.com/v1/emoticons?q=${emoteName}&page=1&private=on`, function(error, response, body) {
				if(error) {console.log(`[${timestamp}]${chalk.red("[REQUEST-ERROR]")} Error searching FrankerFaceZ emote list occurred: ${error}`); msg.edit("Error contacting the website! (Try again?)").then(msg => msg.delete(2000)); return;};
				if(response == undefined) {console.log(`[${timestamp}]${chalk.red("[REQUEST-ERROR]")} FrankerFaceZ emote list response undefined`); msg.edit("Error contacting the website! (Try again?)").then(msg => msg.delete(2000)); return;};
				if(body) {
					const emoteList = JSON.parse(body);
					for(let i = 0; i < emoteList["emoticons"].length; i++) {
						if(emoteList["emoticons"][i]["name"] == emoteName && emoteID == "") {
							emoteID = emoteList["emoticons"][i]["id"];
							emoteURL = `http://cdn.frankerfacez.com/emoticon/${emoteID}/${emoteSize}`;
							return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + ".png"}});
						};
					};
				};
			});
		}
		else {
        // twitch sub fav
			if(msgArray[2] == "2.0" || msgArray[2] == "3.0") emoteSize = msgArray[2];
			for(let i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
				if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) {
					emoteID = subEmotes["channels"][twChannel]["emotes"][i]["image_id"];
					emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`;
					return msg.channel.send('', {file: {attachment: emoteURL, name: emoteName + ".png"}});
				};
			};
		};
	};
};

exports.desc = "Post a twitch (global or subscriber), FrankerFaceZ, BetterTwitchTV or custom emote into chat - Multi-word custom emotes need to be enclosed by quotes.";
exports.syntax = "<global emote, 'ffz', 'bttv', custom emote, favorite emote or twitch channel> <bttv emote if bttv, ffz emote if ffz, channel emote if twitch channel or emote size if global or fav emote> <emote size if subscriber, bttv or ffz emote>";
