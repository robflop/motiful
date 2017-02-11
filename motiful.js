const Discord = require('discord.js'); // Obvious selfbot base
const selfbot = new Discord.Client(); // Initialize selfbot instance
const config = require('./userconfig/config.json'); // Import configuration
var Commands = require('./command_handler.js'); // Load command handler
var Events = require('./event_handler.js'); // Load event handler
var disabledCommands = require('./userconfig/disabled_commands.json') // Load array of disabled commands

selfbot.once('ready', () => { // Ready message once selfbot is loaded
	Events.ready(selfbot);
});

selfbot.on('error', () => { // Listen to errors
	Events.error(selfbot);
}); 

selfbot.on('message', msg => { // Listen to all messages sent
    if(msg.author.id !== config.ownerID) { return; }; // Don't listen to anyone but the owner
    if(!msg.content.startsWith(config.commandPrefix)) { return; }; // Don't listen to messages not starting with selfbot prefix
    if(msg.content == config.commandPrefix) { return; }; // Ignore empty commands (messages containing just the prefix)

    var actualCmd = msg.content.replace(config.commandPrefix, '').trim().split(' ')[0].toLowerCase();
    /*	
	Replace (cut out) selfbot prefix, cut out whitespaces at start and end, split prefix, command
	and arg into array, convert to lowercase and select the command part ([0] of the array)
	*/
	var msgArray = msg.content.replace(config.commandPrefix, '').trim().split(' ');
    // Remove prefix from the message content, then split command parts and store them in an array
	if(disabledCommands.indexOf(actualCmd) > -1) {
	// If the command is found in the array of disabled commands...
		msg.delete(); // ... delete the command call...
		return; // ...and don't execute the command (duh). (Else proceed as usual.)
	};
    if(Object.keys(Commands.commands).indexOf(actualCmd) > -1) { 
	// If the given command is an actual command that is available...
		Commands.commands[actualCmd].main(selfbot, msg, msgArray, Commands);
		// ...run the command.
	};
	if(actualCmd == "reload") {
	// Reload command
		var arg = msg.content.substr(config.commandPrefix.length + actualCmd.length + 1);
		/* 
		Cut out the name of the command to be reloaded
		INFO: The additional 2 spaces added are the whitespaces between one, the prefix and the command, and two, between the command and the argument.
		Example: "robbot, reload emote" -> cut out the length of the prefix and " reload ". 
		*/
		if(arg == "") {
		// If no command to reload is given...
            msg.edit('Specify a command to reload!').then(msg => msg.delete(2000));
                // ...notify the user, set auto-delete to 2s...
			return; // ...and abort command execution.
		};
		// Otherwise...
		try {
		// ...try reloading the command.
			var cmdFile = Commands.commands[arg.toLowerCase()].filename;
			// Define the file to reload, based on the commands object
			delete require.cache[require.resolve(`./commands/${cmdFile}`)];
			delete require.cache[require.resolve('./commands/help.js')];
			delete require.cache[require.resolve('./command_handler.js')];
			/*
			Delete the command's cache, the 'help' cache and the command handler's cache...
			('help' cache deleted to update the command's info if command added/removed/changed)
			*/
			Commands = require('./command_handler.js');
			// ...then re-require the command handler which then reloads the command.
    	}
		catch(error) {
		// If there is an error while reloading...
			msg.edit(`Error while reloading the '${arg}' command: \`\`\`${error}\`\`\`\n(Command may not exist, check for typos)`).then(msg => msg.delete(2000));
			// ...notify the user of the error and set auto-delete to 2s
			return; // ...and abort command execution.
		};
		// If there is no error...
		msg.edit(`Command '${cmdFile.slice(0, -3)}' successfully reloaded!`).then(msg => msg.delete(2000));
		// Notify the user of success and set auto-delete to 2s
	};
	process.on("unhandledRejection", err => {
  		return;
	});
	// Log unhandled errors
	return; // Just in case, return empty for anything else.
});
selfbot.login(config.token); // Log the selfbot in