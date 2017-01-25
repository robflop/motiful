const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const globalEmotes = require('../twitchemotes/global.json'); // Load global emotes list
const subEmotes = require('../twitchemotes/subscriber.json') // Load subscriber emote list
const favs = require('../favorite_emotes.json'); // Favorite emotes object

exports.main = function(selfbot, msg, msgArray) { // Export command's function
    var command = "emote";
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
    var emoteURL = "";
    // Assign emote URL placeholder
    var emoteSize = msgArray[3];
    // Assign emote size out of array
    var emoteID = "";
    // Define subscriber emoteID placeholder
    msg.delete();
    // Delete the command call
    if(emoteSize == undefined || ( emoteSize !== "1.0" && emoteSize !== "2.0" && emoteSize !== "3.0" )) { emoteSize = "1.0" };
    // Default to 1 emote size if none given
    var isGlobalEmote = false;
    var isSubscriberEmote = false;
    var isCustomEmote = false;
    var isFavoriteEmote = false;
    // For deciding whether emote is global, sub-based, custom or favorite
    var customPath = require("path").join(__dirname, "../customemotes/");
    // Set path to pull custom emotes from
    if(globalEmotes["emotes"][msgArray[1]] !== undefined) {
    // If the emote name can be found within the global emotes...
        isGlobalEmote = true;
        // ...set to true...
         emoteName = msgArray[1];
         /*
		 ...change the order of array objects...		
		*/
        emoteSize = msgArray[2];
        if(msgArray[2] == undefined || ( msgArray[2] !== "1.0" && msgArray[2] !== "2.0" && msgArray[2] !== "3.0" )) { msgArray[2] = "1.0" };
        emoteSize = msgArray[2];
        // Default to 1.0 emote size if none given
        twChannel = "";
        // ...and empty the twitch channel argument.
    };
    if(subEmotes["channels"][twChannel.toLowerCase()] !== undefined || favs.hasOwnProperty(twChannel)) {
    // If the channel argument can be found within the subscriber emotes or the favorites list...
        if(favs.hasOwnProperty(twChannel)) {
        // If the emote is on the favorites list...
            isFavoriteEmote = true;
            // set to true.
            emoteName = favs[twChannel].substring(favs[twChannel].indexOf("-")+1);
            twChannel = favs[twChannel].substring(0,favs[twChannel].indexOf("-"));
            // Redefine twChannel and emoteName to favorite values
            if(msgArray[2] == "2.0" || msgArray[2] == "3.0") {emoteSize = msgArray[2];}
            // Redefine emote size from message array, if one was given
        }
        else {
        // If emote is not a favorite...
            isSubscriberEmote = true; 
            // ...set to true.
        };
    };
    require('request').get(`http://api.frankerfacez.com/v1/emoticons?q=${twChannel}&page=1&private=on`, function(error, response, body) {
    // Search FrankerFaceZ for the twChannel (emote input)
	    if(error) {console.log('Error searching FrankerFaceZ emote list occurred: ' + error)};
		// Log any errors|undefined responses
       	if(response == undefined) {console.log('FrankerFaceZ emote list response undefined')};
        if(body) {
        // Once body exists...
            emoteName = twChannel;
            // ...reassign emoteName to channel value...
            if(msgArray[2] == undefined || ( msgArray[2] !== "1" && msgArray[2] !== "2" && msgArray[2] !== "4" )) { msgArray[2] = "1" };
            // ...check the value of the 2nd argument, if it not 1, 2 or 4 default to 1
            emoteSize = msgArray[2];
            // ...reassign emoteSize to name value...
            twChannel = "";
            // ...empty channel value...
            var emoteList = JSON.parse(body);
            // ...define the emote list as parsed body...
            for(var i = 0; i < emoteList["emoticons"].length; i++) {
            // ...loop through the list of emotes from the body...
                if(emoteList["emoticons"][i]["name"] == emoteName && emoteID == "") {
                // ...and if the emote name matches up with the argument while the emoteID is not yet assigned...
                    emoteID = emoteList["emoticons"][i]["id"];
                    // ...specify the emote id of the matched emote as emoteID...
                    emoteURL = `http://cdn.frankerfacez.com/emoticon/${emoteID}/${emoteSize}`
                    // ...assign the emoteURL accordingly...
                    isFFZEmote = true;
                    // ...and set to true.
                    msg.channel.sendFile(emoteURL, emoteName + ".png");
                    return; // Abort command execution to prevent multi-post of emotes with same name
                };
            };
        };
    });
    if(fs.existsSync(`${customPath + twChannel}.png`) || fs.existsSync(`${customPath + twChannel}.jpg`) || fs.existsSync(`${customPath + twChannel}.gif`)) {
    // If the channel argument can be found within the custom emotes as png, jpg or gif...
        isCustomEmote = true;
        // set to true...
        if(fs.existsSync(`${customPath + twChannel}.png`)) {
        // ... 1) and if the file is a png file...
            emoteURL =  customPath + twChannel + ".png";
            // ...set emoteURL to the emote path and add the png extension...
        };
        if(fs.existsSync(`${customPath + twChannel}.jpg`)) {
        // ... 2) and if the file is a jpg file...
            emoteURL =  customPath + twChannel + ".jpg";
            // ...set emoteURL to the emote path and add the jpg extension...
        };
        if(fs.existsSync(`${customPath + twChannel}.gif`)) {
        // ... 3) and if the file is a gif file...
            emoteURL =  customPath + twChannel + ".gif";
            // ...set emoteURL to the emote path and add the gif extension...
        };
        emoteName = emoteURL.replace(customPath, '');
        // ...and then define emote name as the filename.
    };
    if(isGlobalEmote) {
    // If the emote is global...
        emoteID = globalEmotes["emotes"][emoteName]["image_id"];
        emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`
        // ...grab the emote's ID out of the global emotes list..
        msg.channel.sendFile(emoteURL, `${emoteName}.png`);
        // ...send the emote into the channel the command was called in...
        return; // ...and abort command execution.
    } 
    else if(isSubscriberEmote) {
    // If the emote is sub-based...
        twChannel = twChannel.toLowerCase();
        // Make twitch channel input lowercase
        for(var i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
        // ...loop through the specified channel's emotes...
            if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) {
                // ...if the emote name matches up with the argument...
                emoteID = subEmotes["channels"][twChannel]["emotes"][i]["image_id"];
                emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`
                // ...specify the image id of the matched emote as emoteID...
            };
        }
        if(emoteID == "") {return};
        // If emoteID is empty (no name could be matched, emote not found), abort command execution 
        msg.channel.sendFile(emoteURL, emoteName + ".png");
        // ...send the emote into the channel the command was called in...
        return; // ...and abort command execution.
    }
    else if(isCustomEmote) {
    // If the emote is custom...
        msg.channel.sendFile(emoteURL, emoteName);
        // ...send the emote into the channel the command was called in...
        return; // ...and abort command execution.
    }
    else if(isFavoriteEmote) {
    // If the emote is a favorite...
        for(var i = 0; i < Object.keys(subEmotes["channels"][twChannel]["emotes"]).length; i++) {
        // ...loop through the specified channel's emotes...
            if(subEmotes["channels"][twChannel]["emotes"][i]["code"] == emoteName) {
                // ...if the emote name matches up with the argument...
                emoteID = subEmotes["channels"][twChannel]["emotes"][i]["image_id"];
                emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/${emoteSize}`
                // emoteURL = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/1.0`
                // ...specify the image id of the matched emote as emoteID...
            };
        };
        msg.channel.sendFile(emoteURL, emoteName + ".png");
        // ...send the emote into the channel the command was called in...
        return; // ...and abort command execution.
    };
};

exports.desc = "Post a twitch (global or subscriber) emote, FrankerFaceZ emote or custom emote into chat"; // Export command description
exports.syntax = "<global emote, FrankerFaceZ emote, custom emote, favorite emote or twitch channel> <channel emote if twitch channel or emote size if global, fav emote or FFZ emote> <emote size if subscriber emote>" // Export command syntax 
