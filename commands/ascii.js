const config = require('../userconfig/config.json');
const request = require('request');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "ascii";
	var text = msgArray.join(" ").replace(command, "").trim();
	request('http://artii.herokuapp.com/make?text='+text, function(error, response, body) {
		if(body.length > 1999) return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
		msg.edit('\`\`\`'+body+'\`\`\`');
	});
};

exports.desc = "Spell out input in ascii art";
exports.syntax = "<phrase/word to ascii-artify>";