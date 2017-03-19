const config = require('../userconfig/config.json');
const fs = require('fs');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "delEmote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) return msg.edit('Specify an emoteName!').then(msg => msg.delete(2000));
    var emoteName = "";
    // placeholder
    if(msgArray[1].startsWith('"')) emoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
    // multi-word emote
    else emoteName = msgArray[1];
    // single-word emote
    var customPath = require("path").join(__dirname, "../customemotes/");
    var emotePath = "";
    if(fs.existsSync(`${customPath + emoteName}.png`) || fs.existsSync(`${customPath + emoteName}.jpg`) || fs.existsSync(`${customPath + emoteName}.gif`)) {
        if(fs.existsSync(`${customPath + emoteName}.png`)) emotePath =  customPath + emoteName + ".png";
        if(fs.existsSync(`${customPath + emoteName}.jpg`)) emotePath =  customPath + emoteName + ".jpg";
        if(fs.existsSync(`${customPath + emoteName}.gif`)) emotePath =  customPath + emoteName + ".gif";
    };
    fs.unlink(emotePath, function (error) {
        if(error) return msg.edit(`Error deleting emote!: \`\`\`${error}\`\`\``).then(msg => msg.delete(2000));
        msg.edit(`Successfully deleted emote '${emoteName.replace(/_/g," ")}'!`).then(msg => msg.delete(2000));
    });
};

exports.desc = "Delete a custom emote - Multi-word custom emotes need to be enclosed by \"quotes\".";
exports.syntax = "<emoteName>";