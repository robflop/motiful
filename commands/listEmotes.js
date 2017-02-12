const config = require('../userconfig/config.json'); // Import configuration
const fs = require('fs'); // For custom emotes

exports.main = function(selfbot, msg, msgArray) { // Export command function   
    var command = "listEmotes";
    var customPath = require("path").join(__dirname, "../customemotes/");
    // Set the path the custom emotes are stored in
    var emotes = [];
    // Define emotes array placeholder
    fs.readdirSync(customPath).forEach(function(file) {
	// Look at all the files in the specificed folder
	    if(file.substr(-4, 4) == ".png" || file.substr(-4, 4) == ".jpg" || file.substr(-4, 4) == ".gif") {
	    // If the file is a png, jpg or gif file...
		    var emoteFile = file.slice(0, -4).replace(/_/g," ");  
		    // ...grab the pure filename without ext and make it lowercase...
		   emotes.push(emoteFile);
		    // ...and then put it in the emotes array.
	    };
    });
    if(emotes == 0) {msg.edit("No custom emotes have been added.").then(msg => msg.delete(5000)); return;};
    // If no custom emotes have been added, post that instead of the list and auto-delete after 5 seconds
    msg.edit(`Available custom emotes are: \`\`\`${emotes.join(", ")}\`\`\``).then(msg => msg.delete(30000));
    // Send the emotes list and delete it after 30 seconds
};

exports.desc = "List all custom emotes available"; // Export command description
exports.syntax = ""; // Export command syntax 