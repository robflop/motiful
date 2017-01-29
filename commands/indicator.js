const config = require('../config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "indicator";
    var phrase = msg.content.replace(config.commandPrefix + command, '').trim().toLowerCase();
    // Cut out the phrase to be spelled in regional indicators
    var indicatorTemplate = ":regional_indicator_";
    // Define template for regional indicators, later to be used
    var indicatorPhrase = [];
    // Define array which will hold the regional indicators later on
    var indicators = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    // Define array of valid regional indicators
    for(var i=0; i<phrase.length; i++) {
        if(indicators.indexOf(phrase[i].toLowerCase()) < 0) { indicatorPhrase.push(phrase[i]); continue; };
        indicatorPhrase.push(indicatorTemplate + phrase[i] + ":");
    };
    if(indicatorPhrase.join(" ").length > 1999) { 
    // If the output is longer than the max message size...
        msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
        //  ...tell the user to shorten their input and set auto-delete to 2s.
                return; // Abort command execution
    };
    msg.edit(indicatorPhrase.join(" "));
    // Join the indicators from the indicatorPhrase array and edit the message to the result
};

exports.desc = "Spell out input in regional indicators" // Export command description
exports.syntax = "<phrase to indicatorfy>" // Export command syntax 