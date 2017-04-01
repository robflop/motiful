const config = require('../userconfig/config.json');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "aesthetics";
	var phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
	var aestheticPhrase = [];
	var letters={"1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９", "0": "０","?":"？","!":"！","'": "＇",A:"Ａ",B:"Ｂ",C:"Ｃ",D:"Ｄ",E:"Ｅ",F:"Ｆ",G:"Ｇ",H:"Ｈ",I:"Ｉ",J:"Ｊ",K:"Ｋ",L:"Ｌ",M:"Ｍ",N:"Ｎ",O:"Ｏ",P:"Ｐ",Q:"Ｑ",R:"Ｒ",S:"Ｓ",T:"Ｔ",U:"Ｕ",V:"Ｖ",W:"Ｗ",X:"Ｘ",Y:"Ｙ",Z:"Ｚ",a:"ａ",b:"ｂ",c:"ｃ",d:"ｄ",e:"ｅ",f:"ｆ",g:"ｇ",h:"ｈ",i:"ｉ",j:"ｊ",k:"ｋ",l:"ｌ",m:"ｍ",n:"ｎ",o:"ｏ",p:"ｐ",q:"ｑ",r:"ｒ",s:"ｓ",t:"ｔ",u:"ｕ",v:"ｖ",w:"ｗ",x:"ｘ",y:"ｙ",z:"ｚ"};
	for(var i=0; i<phrase.length; i++) {
		if(letters[phrase[i]] !== undefined) { aestheticPhrase.push(letters[phrase[i]]); continue; };
		aestheticPhrase.push(phrase[i]);
	};
	if(aestheticPhrase.join(" ").length > 1999) return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
	msg.edit(aestheticPhrase.join(" "));
};

exports.desc = "Spell out a phrase, but with more ａ ｅ ｓ ｔ ｈ ｅ ｔ ｉ ｃ ｓ";
exports.syntax = "<phrase to aesthetify>";