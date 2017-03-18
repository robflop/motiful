const config = require('../userconfig/config.json');

exports.main = function(selfbot, msg, msgArray, chalk) {
    var command = "aesthetics";
    var phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
    var aestheticPhrase = [];
    var letters={a:"ａ",b:"ｂ",c:"ｃ",d:"ｄ",e:"ｅ",f:"ｆ",g:"ｇ",h:"ｈ",i:"ｉ",j:"ｊ",k:"ｋ",l:"ｌ",m:"ｍ",n:"ｎ",o:"ｏ",p:"ｐ",q:"ｑ",r:"ｒ",s:"ｓ",t:"ｔ",u:"ｕ",v:"ｖ",w:"ｗ",x:"ｘ",y:"ｙ",z:"ｚ"};
    for(var i=0; i<phrase.length; i++) {
        if(letters[phrase[i].toLowerCase()] !== undefined) { aestheticPhrase.push(letters[phrase[i]]); continue; };
        aestheticPhrase.push(phrase[i]);
    };
    if(aestheticPhrase.join(" ").length > 1999) return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
    else msg.edit(aestheticPhrase.join(" "));
};

exports.desc = "Spell out a phrase, but with more ａ ｅ ｓ ｔ ｈ ｅ ｔ ｉ ｃ ｓ";
exports.syntax = "<phrase to aesthetify>";