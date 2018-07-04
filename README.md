# Motiful

 [![Build Status](https://travis-ci.org/robflop/motiful.svg?branch=master)](https://travis-ci.org/robflop/motiful)

A Discord selfbot written using discord.js.

Motiful also uses the axios, chalk and moment packages, plus some standard node modules.

# Important Disclaimer: Use at your own risk

Selfbots along with some features provided by these bot are not allowed by the Discord Terms of Service. Usage of this selfbot is completely on your own liability. I am not responsible for _**anything**_ you do on your own using it.

## Self-hosting usage

(It is assumed you have [node.js](https://nodejs.org/en/) on at least version 7.6 as well as [git](https://git-scm.com) installed)

- Navigate into the `src/` folder of your motiful folder for all of the following steps
- Rename the `config.example.json` file to `config.json`
- Get your token from within Discord Dev Tools (see below for instructions on how to do this)
- Open `config.json` in a text editor of your choice and fill out the token you got using the instructions below
- Adjust other config settings to your liking
- Move into the `data/` directory (full path is `/src/data`)
- Remove the `.default` from these three filenames: `disabledCommands.default.json`, `favoriteEmotes.default.json`, `savedQuotes.default.json`
- run `npm install` in a command window located in the directory you downloaded motiful in to install necessary packages
- (Feel free to ignore any `unmet peer dependency` or `... requires a peer of...` warnings)
- Start the bot using `node motiful.js` in a command window located in the `src/` directory of your motiful folder

### Adding commands

Adding commands to Motiful is very easy. The command handler will automatically register any .js file within the commands folder so
the only thing you have to do is make your command file, write the code for it(*), and restart the selfbot.

That's all, now your command is available under the name you gave the js file. 
Use it with `<prefix> <command>`. It will also be listed in the `help` command.

(\*) *Commands extend the Command class located in `structures/` and must at least provide the name property in the constructor aswell as a `run()` function outside the constructor or errors will happen. See existing commands for usage examples.*

#### Information

- The default command prefix is `--`.
- Commands are case **insensitive**, emotes are case **sensitive**.
- User config files (favorites, quotes, toggled commands list, custom emote files) are saved in the `data/` file.
- Follow the image instructions to get your token: ![Token instructions](token_instructions.png) (All credits for the image to [TheRacingLion](https://github.com/TheRacingLion/Discord-SelfBot/wiki/Discord-Token-Tutorial))

#### License

Licensed under the [MIT License](https://github.com/robflop/motiful/blob/master/LICENSE.md).

## Out-of-the-box Commands

Refer to the [Wiki Usage page](https://github.com/robflop/motiful/wiki/Usage) for more in-depth explanations.

*In addition: Motiful also includes a tag system not listed here. Refer to above Usage page.*

| Command       | Effect                                                                                                     |
|-------------  |----------------------------------------------------------------------------------------------------------- |
| addEmote      | Add a custom emote                                                                                         |
| addFav        | Add an emote to the favorites list                                                                         |
| addQuote      | Save a quote of a message (Out of the last 100 overall messages)                                           |
| addQuote-id   | Save a quote of a message using a messageID                                                                |
| aesthetics    | Make your input a e s t h e t i c                                                                          |
| ascii         | Turn your input into ascii text                                                                            |
| delEmote      | Delete a custom emote                                                                                      |
| delFav        | Delete an emote from the favorites list                                                                    |
| delQuote      | Delete a saved quote                                                                                       |
| emote         | Post a twitch (global or subscriber [sub disabled]), FrankerFaceZ, BetterTwitchTV or custom emote into chat|
| eval          | Evaluate javascript code                                                                                   |
| help          | Get usage help                                                                                             |
| indicators    | Turn input text into indicator-emoji text                                                                  |
| listEmotes    | List all custom emotes                                                                                     |
| listFavs      | List all saved favorite emotes                                                                             |
| listQuotes    | List all saved quotes                                                                                      |
| nitro         | Send a fake embed about Discord Nitro                                                                      |
| ping          | Measure the delay between command call and execution                                                       |
| purge         | Purge your messages (In the last 100 overall Messages)                                                     |
| quote-id      | Quote a message using a message ID                                                                         |
| quote-react   | Quote a message by using a 💬 message reaction                                                             |
| quote         | Quote a message (Out of the last 100 overall messages)                                                     |
| reload        | Reload a command                                                                                           |
| sendQuote     | Send a saved quote                                                                                         |
| setGame       | Set the game you\'ll be shown to be playing                                                                |
| power         | Restart or shutdown motiful                                                                                |
| sub           | Replace a part of one of your messages (Only from last 100 overall Messages)                               |
| toggle        | Toggle a command on or off                                                                                 |