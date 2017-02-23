const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes
const request = require('request'); // For saving files

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "addEmote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) { 
    // If no emote was specified...
        msg.edit('Specify arguments!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution
    };
    var emoteName, emoteURL, emoteExt, attachment;
    // Define placeholders
    if(msgArray[1].startsWith('"')) {
    // If the emote name is a multi-word emote...
        emoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
        // ...assign the emote value to the cut-out "" part and replace all spaces with underscores...
        if(msg.attachments.size>0) {
        // ...1) and if the message has an attached file...
            attachment = msg.attachments.first();
            // ...assign the attachment to the placeholder...
            emoteURL = attachment.url;
            // ...and assign its url as the emoteURL.
        }
        else {
        // ...2) and if there is no attachment...
            emoteURL = msg.content.substring(msg.content.lastIndexOf('"')+2);
            // ...assign the emoteURL out of the remaining message content.
        };
    }
    else {
    // If the emote is a single-word emote...
        emoteName = msgArray[1];
        // ...assign the emote value out of the array...
        if(msg.attachments.size>0) {
        // ...1) and if the message has an attached file...
            attachment = msg.attachments.first();
            // ...assign the attachment to the placeholder...
            emoteURL = attachment.url;
            // ...and assign its url as the emoteURL.
        }
        else {
        // ...2) and if there is no attachment...
            emoteURL = msgArray[2];
            // ...assign the emote url out of the array.
        };
    };
    if((emoteName.startsWith("http") || (msg.attachments.size>0)) && !emoteURL) {
    // If the emote name starts with http (so is a url in most cases) or has an attachment and no name or URL...
        if(msg.attachments.size>0) {
            emoteName = attachment.url.substring(attachment.url.lastIndexOf("/")+1, attachment.url.lastIndexOf("."));
            // ...assign name based on attachment url...
            emoteURL = attachment.url;
            // ...and assign the url based on the attachment's own url.
        }
        else {
            emoteName = msgArray[1].substring(msgArray[1].lastIndexOf("/")+1, msgArray[1].lastIndexOf("."));
            // ...assign name based on emote url... 
            emoteURL = msgArray[1];
            // ...and re-assign URL from msg array.
        };
    };
    if(emoteURL && emoteURL.startsWith("http")) { emoteExt = emoteURL.substr(-4, 4); }
    // Assign emote extension based on the URL, if the url exists
    if(emoteExt !== ".png" && emoteExt !== ".jpg" && emoteExt !== ".gif") {
    // If the passed file isn't a jpg, png or gif...
        msg.edit("Only PNGs, JPGs and GIFs are accepted, sorry.").then(msg => msg.delete(2000)); 
        // ...notify the user of rejection and set auto-delete to 2s.
        return; // Abort command execution
    };
    var customPath = require("path").join(__dirname, "../customemotes/");
    // Set the path the custom emotes are stored in
    if(fs.existsSync(customPath + emoteName + emoteExt)) {
        msg.edit('Emote with that name already exists!').then(msg => msg.delete(2000));
        // Notify user and set auto-delete to 2s
        return; // Abort command execution
    };
    var getFile = request.get(emoteURL, function(error, response, body) {
    // Request (download) the emote file
        if(!response || error) {
        // If there is an error or no response...
            msg.edit('Error contacting website!').then(msg => msg.delete(2000));
            // ...notify the user and set auto-delete to 2s.
            return; // Abort command execution
        };        
    }).pipe(fs.createWriteStream(customPath + emoteName + emoteExt));
    // Pipe the request to a write stream and write the contents to a file named after the emote name
    setTimeout(function() {
    // Set timeout for closing the stream
        getFile.close(); 
        // Close the stream once timeout hits
        /*
        INFO: This is done so that in the case you provide an invalid file with 
        proper syntax (e.g. "https://picture.png"), the stream will stop trying
        to write anything to the file after 60 seconds, allowing you to delete
        the faulty emote. You can't delete a file that's still being written to,
        after all. (And if it takes you 60 seconds to download an emote, it 
        probably shouldn't be an emote anyway.)
        */
    }, 60000);
    // Set Timeout to 60s
    getFile.on('error', () => {
    // If there is an error writing the file...
        msg.edit(`Error writing file for the '${emoteName.replace(/_/g," ")}' emote!`).then(msg => msg.delete(2000));
        // ...notify the user and set auto delete to 2s...
        getFile.end();
        // ...and end the filestream.
    });
    getFile.on('finish', () => {
    // Once the transfer is done (writing to file has been completed)...
        msg.edit(`Successfully added emote '${emoteName.replace(/_/g," ")}'!`).then(msg => msg.delete(2000));
        // ...notify user of success and set auto-delete to 2s.
    });
};

exports.desc = "Add a custom emote - Multi-word custom emotes need to be enclosed by \"quotes\"."; // Export command description
exports.syntax = "<emoteName or url if no name> <url if name specified>"; // Export command syntax 