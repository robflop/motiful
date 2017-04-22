const config = require('./userconfig/config.json');
const fs = require('fs');
const normalizedPath = require("path").join(__dirname, config.commandPath);
const commands = {};

// Command handler courtesy of RShadowhand on Github
fs.readdirSync(normalizedPath).forEach(function(file) {
	if(file.substr(-3, 3) == ".js") {
		const ModuleName = file.slice(0, -3).toLowerCase();
		commands[ModuleName] = require("./"+config.commandPath+"/" + file);
		commands[ModuleName].filename = file;
	};
});
exports.commands = commands;