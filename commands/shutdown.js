const config = require('../userconfig/config.json');
const moment = require('moment');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "shutdown";
	const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
	msg.edit("motiful shutting down!").then(msg => msg.delete(1000));
	setTimeout(function() {
		client.destroy().then(() => {
			console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful signed out!`); process.exit(0)
		});
	}, 2000);
};

exports.desc = "Shut down the client remotely";
exports.syntax = "";