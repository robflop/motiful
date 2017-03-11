const Discord = require('discord.js'); // For defining the embed

exports.main = function(selfbot, msg, msgArray, chalk) { // Export command function
    var command = "nitro";
    var embed = new Discord.RichEmbed();
    // Define the embed as new RichEmbed
    msg.delete();
    // Delete the command call
    embed.setColor(5267072)
         .setAuthor(`Discord Nitro Message`, 'https://cdn.discordapp.com/emojis/264287569687216129.png ')
         .setDescription('[Discord Nitro](https://discordapp.com/nitro) is **required** to view this message.')
         .setThumbnail('https://cdn.discordapp.com/attachments/194167041685454848/272617748876492800/be14b7a8e0090fbb48135450ff17a62f.png');
    // Set the embed properties
    msg.channel.sendEmbed(embed);
    // Send the embed to the channel the command call came from
};

exports.desc = "Send a fake Nitro embed"; // Export command description
exports.syntax = ""; // Export command syntax