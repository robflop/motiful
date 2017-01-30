const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const favs = require('../favorite_emotes.json'); // Favorite emotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "delFav";
    var favmote = msgArray[1];
    // Define favorite emote argument out of the array
    if(favs.hasOwnProperty(favmote)) {
    // If the emote is on the favorites list...
        delete favs[favmote];
        // ...delete the emote out of the object...
        fs.writeFileSync('favorite_emotes.json', JSON.stringify(favs));
        // ...write the object to the file...
        msg.edit(`Emote '${favmote}' removed from favorites list!`).then(msg => msg.delete(2000));
        // ...and notify the user of success, set auto-delete to 2s.
        return; // Abort command execution
    };
    msg.edit(`Emote '${favmote}' not found on favorite emotes list!`).then(msg => msg.delete(2000));
    // Notify user of error and set auto-delete to 2s
    return; // Abort command execution
};

exports.desc = "Delete a twitch subscriber, FFZ or BTTV emote from your favorites"; // Export command description
exports.syntax = "<favoritename>" // Export command syntax 