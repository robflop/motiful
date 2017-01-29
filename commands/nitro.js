const Discord = require('discord.js'); // For defining the embed
var Commands = require('../command_handler.js'); // Load command handler

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "nitro";
    var embed = new Discord.RichEmbed();
    // Define the embed
    msg.delete();
    // Delete the command call
    embed.setColor(5267072) // Set the embed properties
         .setAuthor(`Discord Nitro message`, 'https://cdn.discordapp.com/emojis/263043051339907072.png')
         .setDescription('Discord Nitro is required to view this message.')
         .setThumbnail('https://cdn.discordapp.com/emojis/264287569687216129.png')
    msg.channel.sendEmbed(embed);
    // Send the embed to the channel the command call came from
};

exports.desc = "Send a fake Nitro embed"; // Export command description
exports.syntax = "" // Export command syntax 