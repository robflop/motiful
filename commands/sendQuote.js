const config = require('../userconfig/config.json');
const Discord = require('discord.js');
const quotes = require('../userconfig/saved_quotes.json');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "sendQuote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify a quote name!').then(msg => msg.delete(2000));
    var quoteName = msgArray[1];
    if(!quotes.hasOwnProperty(quoteName)) return msg.edit(`Quote '${quoteName}' not found!`).then(msg => msg.delete(2000));
    msg.delete();
    var embed = new Discord.RichEmbed();
    var quote = quotes[quoteName];
    embed.setColor((Math.random() * 10e4).toFixed(5)) // randomize color
         .setAuthor(quote["author"], quote["avatar"])
         .setDescription(quote["content"]);
    msg.channel.sendEmbed(embed);
};

exports.desc = "Post a saved quote";
exports.syntax = "<quoteName>";