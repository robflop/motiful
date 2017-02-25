const config = require('../userconfig/config.json'); // Import configuration

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "eval";
    if(!config.eval) {msg.edit('Eval has been disabled in the config.').then(msg => msg.delete(2000))};
    // If eval disabled in config, notify user and set auto-delete to 2s.
    var input = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"'));
    // Define eval input out of the message content
    if(input == '' || input == '"' || input == '""') {msg.edit("No input given. Maybe you forgot to enclose it with \"quotes?\"").then(msg => {return msg.delete(2000);});
    // If input is empty or none was given, notify user and set auto-delete to 2s.
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
            // ...define the escaped token under usage of the escape regex function...
            var regex = new RegExp(escapedToken, "g");
            // ...define the regex object to check for the user token from the escaped token...
            output = output.replace(regex, "<token>");
            // ...and finally replace all occurences of the user token with "<token>".
        };
        if(output.length + input.length > 1950) {
        // If the output + input is longer than 1950 characters...
            return msg.edit("Output too long! Try another script.").then(msg => msg.delete(2000));
            // ...notify user, then set auto-delete to 2s and abort command execution
        };
        msg.edit(`INPUT:\`\`\`js\n${input}\n\`\`\`\n\nOUTPUT: \`\`\`js\n${output}\n\`\`\``);
        // Send the message with the evaluated output
    }
    catch(error) {
    // If there is an error evaluating the input...
        msg.edit(`INPUT:\`\`\`js\n${input}\n\`\`\`\n\nERROR: \`\`\`js\n${error}\n\`\`\``);
        // ...notify the user.
    };
};

exports.desc = "Evaluate javascript input -- USE WITH CAUTION."; // Export command description
exports.syntax = "<input to evaluate enclosed by \"quotes\">"; // Export command syntax 