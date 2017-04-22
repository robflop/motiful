const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "indicators";
	const phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
	const indicatorTemplate = ":regional_indicator_";
	const indicatorPhrase = [];
	const indicators = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	for(let i=0; i<phrase.length; i++) {
		if(!indicators.includes(phrase[i].toLowerCase())) { indicatorPhrase.push(phrase[i]); continue; };
		indicatorPhrase.push(indicatorTemplate + phrase[i] + ":");
	};
	if(indicatorPhrase.join(" ").length > 1999) return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
	msg.edit(indicatorPhrase.join(" "));
};

exports.desc = "Spell out input in regional indicators";
exports.syntax = "<phrase/word to indicatorfy>";