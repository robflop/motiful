const config = require('../userconfig/config.json');

exports.main = function(selfbot, msg, msgArray, chalk) {
    var command = "indicators";
    var phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
    var indicatorTemplate = ":regional_indicator_";
    var indicatorPhrase = [];
    var indicators = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    for(var i=0; i<phrase.length; i++) {
        if(indicators.indexOf(phrase[i].toLowerCase()) < 0) { indicatorPhrase.push(phrase[i]); continue; };
        indicatorPhrase.push(indicatorTemplate + phrase[i] + ":");
    };
    if(indicatorPhrase.join(" ").length > 1999) return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
    else msg.edit(indicatorPhrase.join(" "));
};

exports.desc = "Spell out input in regional indicators";
exports.syntax = "<phrase/word to indicatorfy>";