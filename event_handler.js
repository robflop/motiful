const config = require('./userconfig/config.json');
const moment = require('moment');
var timestamp;

module.exports = {
	"ready": function ready(client, chalk) {
		timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
		client.user.setStatus('invisible').then(() => console.log(`[${timestamp}]${chalk.green("[POWER]")} motiful ready!`));
		// appear offline when not online as actual user
	},
	"error": function error(client, error, chalk) {
		timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
		console.log(`[${timestamp}]${chalk.red("[CONNECTION]")} motiful encountered a "serious connection error"! | ${error.code}`);
	},
	"disconnect": function disconnect(client, error, chalk) {
		timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
		console.log(`[${timestamp}]${chalk.red("[CONNECTION]")} motiful was disconnected! | ${error.code}`);
		if(error.code == 1000) {
			console.log(`[${timestamp}]${chalk.green("[POWER]")} Automatically restarting...`);
			client.destroy().then(() => client.login(config.token));
			// Restart selfbot if disconnect code is 1000 (gracefully exited) because it won't reconnect automatically
		};
	},
};