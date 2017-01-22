exports.main = function(selfbot, msg, msgArray) { // Export command's function
	var command = "about";
	msg.edit(`Motiful made by robflop#2174. Made mostly for easy (custom) emotes.\nCheck out the Github repo at <https://github.com/robflop/motiful>.`).then(msg => msg.delete(5000));
};
exports.desc = "Get general info about the selfbot"; // Export command description
exports.syntax = "" // Export command syntax