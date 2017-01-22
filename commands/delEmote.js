const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For custom emotesr

exports.main = function(selfbot, msg, msgArray) { // Export command's function
    var command = "delEmote";
    if(msg.content == config.commandPrefix + command) {
        // If no emote was specified...
        msg.edit('Specify an emote!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution 
    };
    var emote = msgArray[1];
    // Assign emote name out of the array
    var customPath = require("path").join(__dirname, "../customemotes/");
    // Set the path the custom emotes are stored in
    var emotePath = "";
    // Define path placeholder for emote to be deleted
    if(fs.existsSync(`${customPath + emote}.png`) || fs.existsSync(`${customPath + emote}.jpg`) || fs.existsSync(`${customPath + emote}.gif`)) {
        if(fs.existsSync(`${customPath + emote}.png`)) {
        // ... 1) and if the file is a png file...
            emotePath =  customPath + emote + ".png";
            // ...set emoteURL to the emote path and add the png extension...
        };
        if(fs.existsSync(`${customPath + emote}.jpg`)) {
        // ... 2) and if the file is a jpg file...
            emotePath =  customPath + emote + ".jpg";
            // ...set emoteURL to the emote path and add the jpg extension...
        };
        if(fs.existsSync(`${customPath + emote}.gif`)) {
        // ... 3) and if the file is a gif file...
            emotePath =  customPath + emote + ".gif";
            // ...set emoteURL to the emote path and add the gif extension...
        };               
    };
    fs.unlink(emotePath, function (error) {
        if(error) {
        // If there is an error deleting the emote...
            msg.edit('Error deleting emote!').then(msg => msg.delete(2000));
            // ...tell the user and set auto-delete to 2s.
            return;        
        };
        msg.edit(`Successfully deleted emote '${emote}'!`).then(msg => msg.delete(2000));
        // Notify user of success and set auto-delete to 2s
    });
};

exports.desc = "Delete a custom emote"; // Export command description
exports.syntax = "<emotename>" // Export command syntax 