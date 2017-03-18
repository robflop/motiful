const config = require('../userconfig/config.json');
const fs = require('fs');
const quotes = require('../userconfig/saved_quotes.json');

exports.main = function(selfbot, msg, msgArray, chalk) {
    var command = "delQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
    var quoteName = msgArray[1];
    if(quotes.hasOwnProperty(quoteName)) {
        delete quotes[quoteName];
        fs.writeFileSync('userconfig/saved_quotes.json', JSON.stringify(quotes));
        return msg.edit(`Quote '${quoteName}' successfully deleted!`).then(msg => msg.delete(2000));
    }
    else return msg.edit(`Quote '${quoteName}' not found on quotes list!`).then(msg => msg.delete(2000));
};

exports.desc = "Delete a saved quote";
exports.syntax = "<quoteName>";