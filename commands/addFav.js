const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const subEmotes = require('../twitchemotes/subscriber.json') // Load subscriber emote list
const favs = require('../favorite_emotes.json'); // Favorite emotes object

exports.main = function(selfbot, msg, msgArray) { // Export command's function
    var command = "addFav";
    if(msg.content == config.commandPrefix + command.toLowerCase()) { 
    // If no emote was specified...
        msg.edit('Specify an emote!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution
    };
    var twChannel = msgArray[1];
    // Assign twitch channel out of array
    var emoteName = msgArray[2];
    // Assing emote name out of array
    var emoteFound = false;
    // Define subscriber emote "found" indicator bool
    if(favs.hasOwnProperty(emoteName)) {
    // If the emote is on the favorites list already...
        msg.edit(`Emote '${emoteName}' is already on the favorites list!`).then(msg => msg.delete(2000));
        // ...notify the user.
        return; // Abort command execution
    };
    if(subEmotes["channels"][twChannel.toLowerCase()] !== undefined) {
    // If the channel argument can be found within the subscriber emotes...
        twChannel = twChannel.toLowerCase();
        // Make twitch channel input lowercase
        for(var i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
        // ...loop through the specified channel's emotes...
            if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) {
                // ...if the emote name matches up with the argument...
                emoteFound = true;
                // ...specify the image id of the matched emote as emoteID...
            };
        };
        if(!emoteFound) {msg.edit(`Emote '${emoteName}' not found on the '${twChannel}' channel!`).then(msg => msg.delete(2000)); return};
        // If emote was not found, notify user and abort command execution
        favs[emoteName] = twChannel + "-" + emoteName;
        // Save the favorite in the favs list under the emote name with the channel and emote name as value
        fs.writeFileSync('favorite_emotes.json', JSON.stringify(favs));
        // Save the favorites list to the file
        msg.edit(`Emote '${emoteName}' added to favorites!`).then(msg => msg.delete(2000));
        // If emote was found and matched, notify user of success
        return; // ...and abort command execution.
    }
    else {
    // If the channel argument can't be found...
        msg.edit(`Twitch channel '${twChannel}' not found!`).then(msg => msg.delete(2000));
        // ...notify the user...
        return; // ...and abort command execution.
    };
};

exports.desc = "Add a twitch subscriber emote to your favorites"; // Export command description
exports.syntax = "<channelname> <emotename>"; // Export command syntax 