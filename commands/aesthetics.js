const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "aesthetics";
    var phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
    // Cut out the phrase to be spelled aesthetically
    var aestheticPhrase = [];
    // Define aestheticPhrase array which will hold all that aesthetic later on
    var letters={a:"ａ",b:"ｂ",c:"ｃ",d:"ｄ",e:"ｅ",f:"ｆ",g:"ｇ",h:"ｈ",i:"ｉ",j:"ｊ",k:"ｋ",l:"ｌ",m:"ｍ",n:"ｎ",o:"ｏ",p:"ｐ",q:"ｑ",r:"ｒ",s:"ｓ",t:"ｔ",u:"ｕ",v:"ｖ",w:"ｗ",x:"ｘ",y:"ｙ",z:"ｚ"};
    // Define object of valid aesthetic characters
    for(var i=0; i<phrase.length; i++) {
    // Loop through every letter of the input phrase...
        if(letters[phrase[i].toLowerCase()] !== undefined) { aestheticPhrase.push(letters[phrase[i]]); continue; };
        // ...1) and if the letter has an aesthetic counterpart, push it into the array.
        aestheticPhrase.push(phrase[i]);
        // ...2) and if the letter doesn't have an aesthetic counterpart, push it into the array as-is.
    };
    if(aestheticPhrase.join(" ").length > 1999) {
    // If the output is longer than the max message size...
        return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
        //  ...tell the user to shorten their input and set auto-delete to 2s and abort command execution
    };
    msg.edit(aestheticPhrase.join(" "));
    // Join the aesthetics from the aestheticPhrase array and edit the message to the result
};

exports.desc = "Spell out a phrase, but with more ａ ｅ ｓ ｔ ｈ ｅ ｔ ｉ ｃ ｓ"; // Export command description
exports.syntax = "<phrase to aesthetify>" // Export command syntax