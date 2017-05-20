const { exec } = require('child_process');

function disconnect(client, event) {
	if (event.code === 1000) {
		client.logger.info(`Automatically restarting due to WS error code ${event.code}...`);
		// Restart if disconnect code is 1000 (gracefully exited) because it won't reconnect automatically
		return client.config.pm2 ? process.exit(0) : client.destroy().then(() => client.login(client.config.token));
	}
	else {
		client.logger.error(`Disconnected with WS error code ${event.code}, exiting!`);
		// Stop the pm2 task on other critical errors, exit process if no pm2
		return client.config.pm2 ? exec('pm2 stop motiful') : process.exit(0);
	}
}

module.exports = disconnect;