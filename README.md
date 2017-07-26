# Motiful

 [![Build Status](https://travis-ci.org/robflop/motiful.svg?branch=master)](https://travis-ci.org/robflop/motiful)

A Discord selfbot written using discord.js.

Motiful also uses the snekfetch, chalk and moment packages, plus some standard node modules.

## Self-hosting usage

(It is assumed you have [node.js](https://nodejs.org/en/) on at least version 7.6 installed)

- Rename `config.example.json` in the `src/` folder to `config.json`
- Get your token from within Discord Dev Tools (Opened via CTRL+SHIFT+I/Command+Option+I inside Discord) -> Instructions [here](http://i.imgur.com/OhBVCoA.png)
- Fill out your token and change the ownerID in config.json to your devmode discord ID (Settings -> Appearance -> Toggle Developer Mode on -> Rightclick on yourself -> Press `Copy ID`)
- Adjust other config settings to your liking
- run `npm install` in a command window located in the directory you downloaded motiful in to install necessary packages
- (Feel free to ignore any `unmet peer dependency` or `... requires a peer of...` warnings)
- Navigate into the `src/` folder
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

Refer to the [Wiki Usage page](https://github.com/robflop/motiful/wiki/Usage) for more in-depth explanations.

| Command       | Effect                                                                                            |
|-------------  |-------------------------------------------------------------------------------------------------  |
| addEmote      | Add a custom emote                                                                                |
| addFav        | Add an emote to the favorites list                                                                |
| addQuote      | Save a quote of a message (Out of the last 100 overall messages)                                  |
| aesthetics    | Make your input a e s t h e t i c                                                                 |
| ascii         | Turn your input into ascii text                                                                   |
| delEmote      | Delete a custom emote                                                                             |
| delFav        | Delete an emote from the favorites list                                                           |
| delQuote      | Delete a saved quote                                                                              |
| emote         | Post a twitch (global or subscriber [sub disabled]), FrankerFaceZ, BetterTwitchTV or custom emote into chat      |
| eval          | Evaluate javascript code                                                                          |
| help          | Get usage help                                                                                    |
| indicators    | Turn input text into indicator-emoji text                                                         |
| listEmotes    | List all custom emotes                                                                            |
| listFavs      | List all saved favorite emotes                                                                    |
| listQuotes    | List all saved quotes                                                                             |
| nitro         | Send a fake embed about Discord Nitro                                                             |
| ping          | Measure the delay between command call and execution                                              |
| purge         | Purge your messages (In the last 100 overall Messages)                                            |
| quote-id      | Quote a message using a message ID                                                                |
| quote-react   | Quote a message by using a 💬 message reaction                                                    |
| quote         | Quote a message (Out of the last 100 overall messages)                                            |
| reload        | Reload a command                                                                                  |
| sendQuote     | Send a saved quote                                                                                |
| setGame       | Set the game you\'ll be shown to be playing                                                       |
| shutdown      | Shut down motiful                                                                                 |
| sub           | Replace a part of one of your messages (Only from last 100 overall Messages)                      |
| toggle        | Toggle a command on or off                                                                        |