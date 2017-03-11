const config = require('../userconfig/config.json'); // Import configuration
const util = require('util'); // For turning objects etc to strings

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "eval";
    if(!config.eval) {msg.edit('Eval has been disabled in the config.').then(msg => {return msg.delete(2000);})};
    // If eval disabled in config, notify user and set auto-delete to 2s.
    var input = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"'));
    // Define eval input out of the message content
    if(input == '' || input == '"' || input == '""') {msg.edit("No input given. Maybe you forgot to enclose it with \"quotes?\"").then(msg => {return msg.delete(2000);})};
    // If input is empty or none was given, notify user and set auto-delete to 2s.

  	/*
    Credit for all of the below goes to 1Computer1 on GitHub
    ily ❤ - from comp
    */

	const evaled = {}; // Stores outputs
    const logs = []; // Stores logs

    const tokenRegex = new RegExp(selfbot.token.replace(/\./g, '\\.').split('').join('.?'), 'g'); // Regex for tokens

  	// This is put here instead of outside the command execution because we need a reference to the message and other things
    const print = (...a) => { // ...a means all arguments
        const cleaned = a.map(o => {
            if (typeof o !== 'string') o = util.inspect(o, {depth: 0}); // Turn to string
            return o.replace(tokenRegex, '[TOKEN]'); // Replace tokens
        });

      	// If the evaled object does not have an output, that means the message has not been edited yet
    	// So we push to the logs array which gets prepended in the then() or catch()
        if (!evaled.output) return void logs.push(...cleaned);

      	// If it is after we evaled, i.e. setTimeout(), then we do this
      	// The evaled.output has the thing that will be printed to it appended to it, so it persists throughout prints
        evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`; // Check for newline, because I'm OCD
        const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**'; // Change title depending on whether it errored or not

        if (evaled.output.length + input.length > 1900) evaled.output = 'Output too long.'; // Make sure it fits
        return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`); // Re-edit
    };

    var result; // Define result placeholder

    if(msgArray[1] == "async") {
        result = new Promise(resolve => resolve(eval(`(async () => { ${input} })()`)));
        // This version is wrapped in an async function
  	    // So in order for something to show up in the output, you have to return it
        // Unlike the other one, the last statement does not show up automatically
  	    // But it lets you use await!
    }
    else {
        result = new Promise(resolve => resolve(eval(input)));
        // Non-async promise, no need to return everything manually
    }

    const cb = '```'; // Shortcut for codeblock syntax

  	return result.then(output => {
        if (typeof output !== 'string') output = util.inspect(output, {depth: 0}); // Inspect to turn to string if not one
        output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`; // Prepend the logs to the output with a check for undefined to make things prettier
        output = output.replace(tokenRegex, '[TOKEN]'); // Replace tokens

        if (output.length + input.length > 1900) output = 'Output too long.'; // Make sure output fits

        return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`).then(() => { // Edit message
            evaled.errored = false; // Did not error
            evaled.output = output; // Save output for later
        });
    }).catch(err => {
        console.error(err); // Log error
        err = err.toString(); // Get error message
        err = `${logs.join('\n')}\n${logs.length && err === 'undefined' ? '' : err}`; // Prepend the logs
        err = err.replace(tokenRegex, '[TOKEN]'); // Replace tokens

        return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => { // Edit message
            evaled.errored = true; // Did error
            evaled.output = err; // Save for later
        });
    });
};

exports.desc = "Evaluate javascript input, provide async argument to use async function -- USE COMMAND WITH CAUTION."; // Export command description
exports.syntax = "<\"async\", optional> <input to evaluate enclosed by \"quotes\">"; // Export command syntax