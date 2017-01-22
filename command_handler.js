const config = require('./config.json'); // Import configuration
const fs = require('fs'); // For reading the command files
var normalizedPath = require("path").join(__dirname, config.commandPath); // Fix the path to be used in condition checks
var commands = {}; // Object of existing commands

// Load all commands from the commandPath (below) -- command handler courtesy of RShadowhand on Github
fs.readdirSync(normalizedPath).forEach(function(file) { 
	// Look at all the files in the specificed folder
	if(file.substr(-3, 3) == ".js") {
	// If the file is a .js file...
		var ModuleName = file.slice(0, -3).toLowerCase();  
		// ...remove ".js" bit from the file names, convert it to lowercase,..
		commands[ModuleName] = require("./"+config.commandPath+"/" + file); 
		commands[ModuleName].filename = file;
		// ...and then require the files as commands.
	};
});
exports.commands = commands;  // Export available commands object