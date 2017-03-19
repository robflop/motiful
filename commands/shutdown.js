const config = require('../userconfig/config.json');
const moment = require('moment');
var timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

exports.main = function(client, msg, msgArray, chalk) {
	var command = "shutdown";
	msg.edit("motiful shutting down!").then(msg => msg.delete(1000));
	setTimeout(function() {
		client.destroy().then(() => {
			console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful signed out!`); process.exit(0)
		});
	}, 2000);
};

exports.desc = "Shut down the client remotely";
exports.syntax = "";