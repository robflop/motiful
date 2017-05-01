const config = require('../userconfig/config.json');
const moment = require('moment');

exports.main = function(client, msg, msgArray, chalk) {
	const command = "shutdown";
	const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
	msg.edit("motiful shutting down!").then(msg => msg.delete(1000));
	if(config.pm2) {
		setTimeout(() => {
			console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful signed out! (PM2 process killed)`);
			require('child_process').exec('pm2 stop motiful', (err, stdout, stderr) => {});
		}, 2000);
	}
	else {
		setTimeout(() => {
			console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful signed out!`);
			process.exit(0);
		}, 2000);
	};
};

exports.desc = "Shut down the client remotely";
exports.syntax = "";