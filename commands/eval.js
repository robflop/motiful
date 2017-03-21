const config = require('../userconfig/config.json');
const util = require('util');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "eval";
	if(!config.eval) return msg.edit('Eval has been disabled in the config.').then(msg => msg.delete(2000));
	var input = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"'));
	if(input == '' || input == '"' || input == '""') return msg.edit("No input given. Maybe you forgot to enclose it with \"quotes?\"").then(msg => msg.delete(2000));
	/*
    Credit for all of the below goes to 1Computer1 on GitHub
    ily ❤ - from comp
    */

	const evaled = {}; // Stores outputs
	const logs = []; // Stores logs

	const tokenRegex = new RegExp(client.token.replace(/\./g, '\\.').split('').join('.?'), 'g'); // Regex for tokens

	// This is put here instead of outside the command execution because we need a reference to the message and other things
	const print = (...a) => { // ...a means all arguments
		const cleaned = a.map(o => {
			if(typeof o !== 'string') o = util.inspect(o, {depth: 0}); // Turn to string
			return o.replace(tokenRegex, '[TOKEN]');
		});
		// If the evaled object does not have an output, that means the message has not been edited yet
		// So we push to the logs array which gets prepended in the then() or catch()
		if(!evaled.output) return void logs.push(...cleaned);

		// If it is after we evaled, i.e. setTimeout(), then we do this
		// The evaled.output has the thing that will be printed to it appended to it, so it persists throughout prints
		evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`; // newline check
		const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**'; // Error check title change

		if(evaled.output.length + input.length > 1900) evaled.output = 'Output too long.';
		return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`);
	};

	var result;

	if(msg.content.substring(config.commandPrefix.length + command.length + 1, msg.content.indexOf('"')).trim() == "async") {
		result = new Promise(resolve => resolve(eval(`(async () => { ${input} })()`)));
	}
	else result = new Promise(resolve => resolve(eval(input)));
    // Async and non-async versions
	const cb = '```';

	return result.then(output => {
		if(typeof output !== 'string') output = util.inspect(output, {depth: 0});
		output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
        // Prepend the logs to the output with a check for undefined to make things prettier
		output = output.replace(tokenRegex, '[TOKEN]');

		if(output.length + input.length > 1900) output = 'Output too long.';

		return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`).then(() => {
			evaled.errored = false;
			evaled.output = output;
		});
	}).catch(err => {
		console.error(err);
		err = err.toString();
		err = `${logs.join('\n')}\n${logs.length && err === 'undefined' ? '' : err}`;
		err = err.replace(tokenRegex, '[TOKEN]');
		return msg.edit(`📥\u2000**Input**${cb}js\n${input}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => {
			evaled.errored = true;
			evaled.output = err;
		});
	});
};

exports.desc = "Evaluate javascript input, provide async argument to use async function -- USE COMMAND WITH CAUTION.";
exports.syntax = "<\"async\", optional> <input to evaluate enclosed by \"quotes\">";