const { blue, cyan, magenta, red, yellow } = require('chalk');
const moment = require('moment');
const { writeFile, appendFile } = require('fs');
const { join } = require('path');

class Logger {
	static info(data) {
		return console.log(`${blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${cyan(data)}`);
	}

	static debug(data) {
		return console.log(`${magenta(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${cyan(data)}`);
	}

	static warn(data) {
		return console.warn(`${yellow(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${cyan(data)}`);
	}

	static error(data) {
		return console.error(`${red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)} ${cyan(data)}`);
	}

	static writeJSON(content, path, prettified = true) {
		const joinedPath = join(__dirname, '..', path);
		const data = prettified ? JSON.stringify(content, null, 4) : JSON.stringify(content);
		return new Promise((resolve, reject) => {
			writeFile(joinedPath, data, 'utf-8', error => {
				if (error) reject(error);
				else resolve(data);
			});
		});
	}

	static writeLog(content, path) {
		const joinedPath = join(__dirname, '..', path);
		return new Promise((resolve, reject) => {
			appendFile(joinedPath, content, error => {
				if (error) reject(error);
				else resolve(content);
			});
		});
	}
}

module.exports = Logger;