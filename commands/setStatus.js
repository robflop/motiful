const config = require('../config.json'); // Import configuration
var Commands = require('../command_handler.js'); // Load command handler

exports.main = function(selfbot, msg, msgArray) { // Export command's function
    var command = "setStatus";
    var args = msgArray.shift()
    var fullarg = msgArray.join(" ");
    // Define argument to set user playing status to
    if(fullarg == "") {
    // If argument is empty...
        selfbot.user.setGame();
        // ...empty the playing status...
        msg.edit("Successfully cleared your status!\n").then(msg => msg.delete(2000)); 
        // ...notify the user of success...
        return;
        // ...and abort further command execution.
    };
    selfbot.user.setGame(fullarg);
    // Set the user's playing status to the arg
    msg.edit(`Successfully set my game to '${fullarg}' !\n(May not have worked if ratelimit has been capped)`).then(msg => msg.delete(2000)); 
    // Notify the user of successful change
};

exports.desc = "Change your current status" // Export command description
exports.syntax = "<status to set to>" // Export command syntax 