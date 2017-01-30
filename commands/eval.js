const config = require('../config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "eval";
    if(!config.eval) {msg.edit('Eval has been disabled in the config.').then(msg => msg.delete(2000))};
    // If eval disabled in config, notify user and then set auto-delete to 2s.
    var input = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"'));
    // Define eval input
    if(input == '' || input == '"' || input == '""') {msg.edit("No input given.").then(msg => msg.delete(2000)); return;};
    try {
    // Try evaluating the input
        var output = eval(input);
        // Define output as the evaluated input
        if(typeof output !== "string") {
        // If the output isn't a string (object, array, etc)...
            output = require('util').inspect(output);
            // ...inspect it and turn it into a string.
        };
        if(typeof output == "string" && output.indexOf(config.token) > -1) {
        // If the output is a string and contains the user token...
            function escapeRegExp(str) {return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");};
            // ...define function to escape the token's special characters...
            var escapedToken = escapeRegExp(config.token);
            // ...then assign the escaped token under usage of the escape regex function...
            var regex = new RegExp(escapedToken, "g");
            // ...then define the regex object to check for the user token from the escaped token...
            output = output.replace(regex, "<token>");
            // ...and finally replace all occurences of the user token with "<token>".
        };
        if(output.length + input.length > 1950) {
        // If the output + input is longer than 1950 characters...
            msg.edit("Output too long! Try another script.").then(msg => msg.delete(3000));
            // ...notify user, then set auto-delete to 3s.
            return; // Abort command execution
        };
        msg.edit(`INPUT:\`\`\`${input}\`\`\`\n\nOUTPUT: \`\`\`${output}\`\`\``);
        // Send the message with the eval output
    }
    catch(error) {
    // If there is an error evaluating the input...
        msg.edit(`INPUT:\`\`\`${input}\`\`\`\n\nERROR: \`\`\`${error}\`\`\``);
        // ...notify the user.
    };
};

exports.desc = "Evaluate user javascript input -- **USE WITH CAUTION.**" // Export command description
exports.syntax = "<input to evaluate enclosed by quotes>" // Export command syntax 