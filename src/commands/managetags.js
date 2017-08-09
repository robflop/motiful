const Command = require('../structures/Command');
const { RichEmbed } = require('discord.js');

class ManageTagsCommand extends Command {
	constructor() {
		super({
			name: 'managetags',
			description: 'Manage your tags (add, delete, info, list selectors)',
			aliases: ['mt'],
			args: [
				{
					type: 'string',
					name: 'selector',
					defaultVal: 'list',
				},
				{
					type: 'string',
					name: 'tagName',
					defaultVal: 'none'
				},
				{
					type: 'string',
					name: 'tagContent',
					defaultVal: 'none'
				}
			]
		});
	}

	async run(message, args, userData) {
		const { tags } = userData;

		if (args.selector === 'add') {
			if (args.tagName === 'none') return message.edit('Specify a tag name!').then(msg => msg.delete(3000));
			if (tags.hasOwnProperty(args.tagName)) return message.edit('Tag with that name already exists!').then(msg => msg.delete(3000));
			if (args.tagContent === 'none') return message.edit('Specify the tag\'s content!').then(msg => msg.delete(3000));
			tags[args.tagName] = args.tagContent;
			message.client.logger.writeJSON(tags, './data/tags.json')
				.then(tags => {
					message.edit(`Successfully added tag \`${args.tagName}\`!`).then(msg => msg.delete(3000));
				})
				.catch(err => {
					message.channel.send(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
				});
		}

		else if (args.selector === 'delete') {
			if (args.tagName === 'none') return message.edit('Specify a target name!').then(msg => msg.delete(3000));
			if (!tags.hasOwnProperty(args.tagName)) return message.edit('Tag with that name doesn\'t exist!').then(msg => msg.delete(3000));
			delete tags[args.tagName];
			message.client.logger.writeJSON(tags, './data/tags.json')
				.then(tags => {
					message.edit(`Successfully deleted tag \`${args.tagName}\`!`).then(msg => msg.delete(3000));
				})
				.catch(err => {
					message.channel.send(`An error occurred writing to the file: \`\`\`${err}\`\`\``).then(msg => msg.delete(3000));
				});
		}

		else if (args.selector === 'info') {
			if (!tags.hasOwnProperty(args.tagName)) return message.edit('Tag with that name doesn\'t exist!').then(msg => msg.delete(3000));
			const embed = new RichEmbed()
				.setAuthor(`Motiful Tag info for tag '${args.tagName}'`, message.client.user.displayAvatarURL)
				.setDescription(`\`\`\`js\n${tags[args.tagName]}\`\`\``);
			message.edit({ embed }).then(msg => msg.delete(10000));
		}

		else if (args.selector === 'list') {
			if (Object.keys(tags).length === 0) return message.edit('No tags have been saved!').then(msg => msg.delete(3000));
			message.edit(`**__Available tags are:__**\`\`\`${Object.keys(tags).join(', ')}\`\`\``).then(msg => msg.delete(10000));
		}

		else return message.edit('Invalid selector!').then(msg => msg.delete(3000));
	}
}

module.exports = ManageTagsCommand;