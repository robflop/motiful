const Discord = require('discord.js');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "nitro";
    var embed = new Discord.RichEmbed();
    msg.delete();
    embed.setColor(5267072)
         .setAuthor(`Discord Nitro Message`, 'https://cdn.discordapp.com/emojis/264287569687216129.png ')
         .setDescription('[Discord Nitro](https://discordapp.com/nitro) is **required** to view this message.')
         .setThumbnail('https://cdn.discordapp.com/attachments/194167041685454848/272617748876492800/be14b7a8e0090fbb48135450ff17a62f.png');
    msg.channel.send('', {embed: embed});
};

exports.desc = "Send a fake Nitro embed";
exports.syntax = "";