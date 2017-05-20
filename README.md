# Motiful

A Discord selfbot written using discord.js.

Motiful also uses the snekfetch, chalk and moment packages, plus some standard node modules.

## Self-hosting usage

(It is assumed you have [node.js](https://nodejs.org/en/) on at least version 7.6 installed)

- Rename `config.example.json` in the `src/` folder to `config.json`
- Get your token from within Discord Dev Tools (Opened via CTRL+SHIFT+I/Command+Option+I inside Discord) -> Instructions [here](http://i.imgur.com/OhBVCoA.png)
- Fill out your token and change the ownerID in config.json to your devmode discord ID (Settings -> Appearance -> Toggle Developer Mode on -> Rightclick on yourself -> Press "Copy ID")
- Adjust other config settings to your liking
- run `npm install` in a command window located in the directory you downloaded motiful in to install necessary packages
- (Feel free to ignore any "unmet dependency" warnings)
- Start the bot using `node motiful.js` in a command window located in the directory you downloaded motiful in to!

### Adding commands

Adding commands to Motiful is very easy. The command handler will automatically register any .js file within the commands folder so
the only thing you have to do is make your command file, write the code for it(*), and restart the selfbot.

That's all, now your command is available under the name you gave the js file. 
Use it with `<prefix> <command>`. It will also be listed in the `help` command.

(\*) *Commands extend the Command class located in `structures/` and must at least provide the name property in the constructor aswell as a `run()` function outside the constructor or errors will happen. See existing commands for usage examples.*

#### Information

- The default command prefix is `--`.
- Commands are case **insensitive**, emotes are case **sensitive**.
- The `eval` command is disabled by default and needs to be activated in `config.json`. It is not toggleable using the `toggle` command until it is enabled in the config.
- User config files (favorites, quotes, toggled commands list, custom emote files) are saved in the `data/` file.

#### License

Licensed under the [MIT License](https://github.com/robflop/motiful/blob/master/LICENSE.md).

## Out-of-the-box Commands

| Command       | Effect                                                                                            |
|-------------  |-------------------------------------------------------------------------------------------------  |
| help          | List all currently available commands (Spammy in public channels, use with caution)               |
| setGame       | Change your own playing status (only shows up for others)                                         |
| toggle        | Toggle a command (on/off)                                                                         |
| shutdown      | Shut down the selfbot remotely                                                                    |
| emote         | Post a global/subscriber twitch, frankerfacez, bettertwitchtv or custom emote into chat           |
| addEmote      | Add a custom emote                                                                                |
| delEmote      | Delete a custom emote                                                                             |
| listEmotes    | List all currently available custom Emotes                                                        |
| addFav        | Add an emote to your favorites list                                                               |
| delFav        | Remove an emote from your favorites list                                                          |
| listFavs      | List all your favorite emotes                                                                     |
| eval          | Have the selfbot evaluate javascript input and output the results (async possible)                |
| indicator     | Have the selfbot spell a phrase in regional indicators                                            |
| ping          | Measure the delay between command calls and command execution in ms                               |
| nitro         | Have the selfbot post a fake embed about a "Nitro-only message"                                   |
| purge         | Purge a given amount of your own message out of the last 100 overall messages                     |
| sub           | Replace a chosen part of one of your messages with another (out of 100 last overall messages)     |
| quote         | Quote another user's post (out of 100 last overall messages) and optionally attach a reply to it  |
| addQuote      | Save a quote of another user's post (out of last 100 overall messages)                            |
| sendQuote     | Send a saved quote into the channel the command is used in                                        |
| delQuote      | Delete a saved quote from the list                                                                |
| listQuotes    | Output a list of all saved quotes                                                                 |
| aesthetics    | Have the selfbot make a phrase aesthetic                                                          |
| ascii         | Spell out your input in ascii art (Spammy, use with caution)                                      |