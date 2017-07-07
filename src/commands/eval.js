const Command = require('../structures/Command');
const { inspect } = require('util');

class EvalCommand extends Command {
	constructor() {
		super({
			name: 'eval',
			description: 'Evaluate javascript code',
			aliases: ['ev'],
			args: [
				{
					type: 'string',
					name: 'asyncFlag',
					defaultVal: ''
				},
				{
					type: 'string',
					name: 'code',
					defaultVal: ''
					/*
					may seem weird that this is by default emtpy
					but it's because asyncFlag gets appended to code
					if it does not equal "async" anyway
					*/
				}
			]
		});
	}

	/*
    Credit for all of the below goes to 1Computer1 on GitHub
    ily ❤ - from comp
    */

	async run(message, args) {
		const { token } = message.client;
		args.asyncFlag === 'async' ? '' : args.code = `${args.asyncFlag} ${args.code}`;

		const evaled = {}; // Stores outputs
		const logs = []; // Stores logs

		const tokenRegex = new RegExp(token.replace(/\./g, '\\.').split('').join('.?'), 'g'); // Regex for tokens

		// This is put here instead of outside the command execution because we need a reference to the message and other things
		const print = (...a) => { // ...a means all arguments
			const cleaned = a.map(o => {
				if (typeof o !== 'string') o = inspect(o, { depth: 0 });
				return o.replace(tokenRegex, '[TOKEN]');
			});
			// If the evaled object does not have an output, that means the message has not been edited yet
			// So we push to the logs array which gets prepended in the then() or catch()
			if (!evaled.output) return void logs.push(...cleaned); // eslint-disable-line no-void

			// If it is after we evaled, i.e. setTimeout(), then we do this
			// The evaled.output has the thing that will be printed to it appended to it, so it persists throughout prints
			evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`; // newline check
			const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**'; // Error check title change

			if (evaled.output.length + args.code.length > 1900) evaled.output = 'Output too long.';
			return evaled.message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`);
		};

		let result;

		if (args.asyncFlag === 'async') result = new Promise(resolve => resolve(eval(`(async () => { ${args.code} })()`)));
		else result = new Promise(resolve => resolve(eval(args.code)));
		// Async and non-async versions
		const cb = '```';

		return result.then(output => {
			if (typeof output !== 'string') output = inspect(output, { depth: 0 });
			output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
			// Prepend the logs to the output with a check for undefined to make things prettier
			output = output.replace(tokenRegex, '[TOKEN]');

			return message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`)
				.then(message => {
					evaled.errored = false;
					evaled.output = output;
					evaled.message = message;
				});
		}).catch(err => {
		// console.error(err);
			err = err.toString();
			err = `${logs.join('\n')}\n${logs.length && err === 'undefined' ? '' : err}`;
			err = err.replace(tokenRegex, '[TOKEN]');

			return message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => {
				evaled.errored = true;
				evaled.output = err;
			});
		});
	}
}

module.exports = EvalCommand;