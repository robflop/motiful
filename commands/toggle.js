const config = require('../userconfig/config.json');
const fs = require('fs');
const disabledCommands = require('../userconfig/disabledCommands.json');
const Commands = require('../commandHandler.js');

exports.main = function(client, msg, msgArray, chalk) {
    var command = "toggle";
    var arg = msgArray[1];
    if(!arg) msg.edit("Specify a command to toggle!").then(msg => msg.delete(2000));
    if(arg == "toggle" || arg == "help" || !Object.keys(Commands.commands).includes(arg)) return msg.delete();
    var index = disabledCommands.indexOf(arg);
    if(index == -1) {
        disabledCommands.push(arg);
        fs.writeFileSync('userconfig/disabledCommands.json', JSON.stringify(disabledCommands));
        return msg.edit(`Command '${arg}' successfully disabled!`).then(msg => msg.delete(2000));
    }
    else {
        disabledCommands.splice(index, 1);
        fs.writeFileSync('userconfig/disabledCommands.json', JSON.stringify(disabledCommands));
        return msg.edit(`Command '${arg}' successfully enabled!`).then(msg => msg.delete(2000));
    }
};

exports.desc = "Toggle a command on/off or list toggled commands";
exports.syntax = "<command to toggle OR 'dcom' to list disabled commands>";