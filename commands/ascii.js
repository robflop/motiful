const config = require('../userconfig/config.json'); // Import configuration
const request = require('request'); // For making the API request to the ASCII thing

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "ascii";
    var text = msgArray.join(" ").replace(command, "").trim();
    // Join the msgArray and replace the command part
    request('http://artii.herokuapp.com/make?text='+text, function(error, response, body) {
        if(body.length > 1999) {
        // If the result is larger than 1999 (max msg size)...
            return msg.edit("Output too long. Try shorter text.").then(msg => msg.delete(2000));
            //  ...tell the user to shorten their input and set auto-delete to 2s and abort command execution
        };
        msg.edit('\`\`\`'+body+'\`\`\`');
        // Replace the message's content with the API call body
    });
};

exports.desc = "Spell out input in ascii art"; // Export command description
exports.syntax = "<phrase/word to ascii-artify>"; // Export command syntax