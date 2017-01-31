exports.main = function(selfbot, msg, msgArray) { // Export command function
	var command = "about";
	msg.edit(`Motiful made by robflop#2174. Made mostly for easy (custom) emotes.\nCheck out the Github repo at <https://github.com/robflop/motiful>.`);
};
exports.desc = "Get general info about motiful"; // Export command description
exports.syntax = ""; // Export command syntax