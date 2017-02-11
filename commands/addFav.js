const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const subEmotes = require('../twitchemotes/subscriber.json'); // Load subscriber emote list
const favs = require('../userconfig/favorite_emotes.json'); // Favorite emotes object
const bttv = require('../twitchemotes/bttv.json') // Load bttv emote list

exports.main = function(selfbot, msg, msgArray) { // Export command function
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
        fs.writeFileSync('userconfig/favorite_emotes.json', JSON.stringify(favs));
        // Save the favorites list to the file
        msg.edit(`Emote '${emoteName}' added to favorites!`).then(msg => msg.delete(2000));
        // If emote was found and matched, notify user of success
        return; // ...and abort command execution.
    }
    else if(twChannel.toLowerCase() == "ffz") {
        require('request').get(`http://api.frankerfacez.com/v1/emoticons?q=${emoteName}&page=1&private=on`, function(error, response, body) {
        // ...search FrankerFaceZ for the emote name (emote input).
	        if(error) {msg.edit('Error searching FrankerFaceZ emote list occurred: \n\n' + error).then(msg => msg.delete(2000))};
		    // Notify the user of errors|undefined responses
       	    if(response == undefined) {msg.edit('Error contacting website, FrankerFaceZ emote list response undefined').then(msg => msg.delete(2000))};
            if(body) {
            // Once body exists...
                var emoteList = JSON.parse(body);
                // ...define the emote list as parsed body...
                for(var i = 0; i < emoteList["emoticons"].length; i++) {
                // ...loop through the list of emotes from the body...
                    if(emoteList["emoticons"][i]["name"] == emoteName) {
                    // ...and if the emote name matches up with the argument....
                        emoteFound = true;
                        // ...set the found value to true.
                        favs[emoteName] = twChannel + "-" + emoteName;
                        // Save the favorite in the favs list under the emote name with the channel and emote name as value
                        fs.writeFileSync('userconfig/favorite_emotes.json', JSON.stringify(favs));
                        // Save the favorites list to the file
                        msg.edit(`Emote '${emoteName}' added to FFZ favorites!`).then(msg => msg.delete(2000));
                        // If emote was found and matched, notify user of success
                        return; // Abort command execution to prevent multi-post of emotes with same name
                    };
                };
                if(!emoteFound) {msg.edit(`Emote '${emoteName}' not found on FrankerFaceZ!`).then(msg => msg.delete(2000)); return};
                // If emote was not found, notify user and abort command execution
            };
        });
    }
    else if(twChannel.toLowerCase() == "bttv") {
    // If the favorite is a bttv emote...
                for(var i = 0; i < bttv["emotes"].length; i++) {
                // ...loop through the list of emotes...
                    if(bttv["emotes"][i]["code"] == emoteName) {
                    // ...and if the emote name matches up with the argument...
                        emoteFound = true;
                        // ...set the found value to true.
                        favs[emoteName] = twChannel + "-" + emoteName;
                        // Save the favorite in the favs list under the emote name with the channel and emote name as value
                        fs.writeFileSync('userconfig/favorite_emotes.json', JSON.stringify(favs));
                        // Save the favorites list to the file
                        msg.edit(`Emote '${emoteName}' added to BTTV favorites!`).then(msg => msg.delete(2000));
                        // If emote was found and matched, notify user of success
                        return; // Abort command execution to prevent multi-post of emotes with same name
                    };
                };
                if(!emoteFound) {msg.edit(`Emote '${emoteName}' not found on BetterTwitchTV!`).then(msg => msg.delete(2000)); return};
                // If emote was not found, notify user and abort command execution                     
    }
    else {
    // If the channel argument can't be found...
        msg.edit(`Twitch channel / Extension '${twChannel}' not found!`).then(msg => msg.delete(2000));
        // ...notify the user...
        return; // ...and abort command execution.
    };
};

exports.desc = "Add a twitch subscriber, FrankerFaceZ or BetterTwitchTV emote to your favorites, allowing you to use it without naming the channel/source it is from"; // Export command description
exports.syntax = "<channelname or ffz/bttv> <emotename>"; // Export command syntax 