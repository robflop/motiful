const favs = require('../userconfig/favorite_emotes.json'); // Favorite emotes object

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "listFavs";
    if(Object.keys(favs).length == 0) {msg.edit("No emotes have been favorited.").then(msg => msg.delete(10000)); return;};
    // If no emotes have been favorited, notify user and set auto-delete to 10s instead of posting the list
    msg.edit(`Current favorite emotes are: \`\`\`${Object.keys(favs).join(", ")}\`\`\``).then(msg => msg.delete(30000));
    // Send the favorites list and delete it after 30 seconds
};

exports.desc = "List your favorite emotes"; // Export command description
exports.syntax = ""; // Export command syntax 