const config = require('../userconfig/config.json');
const moment = require('moment');
var timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

exports.main = function(selfbot, msg, msgArray, chalk) {
	var command = "shutdown";
	msg.edit("Selfbot shutting down!").then(msg => msg.delete(1000));
	setTimeout(function(){selfbot.destroy().then(()=>{console.log(`[${timestamp}]${chalk.green("[POWER]")} Motiful signed out!`); process.exit(0)})}, 2000);
};

exports.desc = "Shut down the selfbot remotely";
exports.syntax = "";