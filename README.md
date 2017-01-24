# Motiful
A Discord selfbot written using discord.js.

The selfbot also uses the request and moment packages, plus some standard node modules.

## Self-hosting usage
(It is assumed you have node.js installed)

- Get your token from within Discord Dev Tools -> Instructions [here](http://i.imgur.com/OhBVCoA.png)
- Fill out your token and change the ownerID in config.json to your devmode discord ID (Enable Developer Mode -> Rightclick on yourself -> Copy ID)
- Adjust other config settings to your liking 
- run ``npm install`` to install necessary packages
- Start the bot using ``node motiful.js``!

**IMPORTANT INFO:**

If you change one of the folder paths, you actually have to create the folder aswell. 
Otherwise the selfbot WILL crash. I will not provide support for such cases.

### Adding commands
Adding commands to Motiful is very easy. The command handler will automatically register any .js file within the commands folder so
the only thing you have to do is make your command file, write the code for it(*), and restart the selfbot. 

That's all, now your command is available under the name you gave the js file. 
Use it with ``<prefix> <command>``. It will also be listed in the 'help' command.

###### (**) Your code must export the contents in a function which passes ``selfbot, msg, msgArray`` under ``exports.main``, aswell as a command description under ``exports.desc`` and a command syntax under ``exports.syntax``, see existing commands for examples.*

#### Information
- The default version of the bot loads commands from ``commands/``.
- The default command prefix is ``--``.
- Commands are case **insensitive**, emotes are case **sensitive**.
- The ``eval`` command is disabled by default and needs to be activated in ``config.json``. It is not toggleable using the ``toggle`` command until it is enabled in the config.

#### License

Licensed under the [MIT License](https://github.com/robflop/motiful/blob/master/LICENSE.md).

## Out-of-the-box Commands:
| Command     	| Effect                                                                                    	    |
|-------------	|-------------------------------------------------------------------------------------------------	|
| help        	| List all currently available commands                                                          	|
| about       	| Get general info about the selfbot                                                               	|
| setStatus     | Change your own playing status (only shows up for others)                                       	|
| setAvatar   	| Change your own avatar                                                                           	|
| setUsername   | Change your own username                                                                         	|
| setNickname   | Change your own server-wide nickname                                                              |
| toggle        | Toggle a command (on/off)                                                                         |
| shutdown    	| Shut down the selfbot remotely                                                                  	|
| emote         | Make the selfbot post a global/subscriber twitch emote or custom emote into chat                  |
| addEmote      | Add a custom emote                                                                                |
| delEmote      | Delete a custom emote                                                                             |
| listEmotes    | List all currently available custom Emotes                                                      |
| addFav        | Add an emote to your favorites list
| delFav        | Remove an emote from your favorites list
| listFavs      | List all your favorite emotes
| eval          | Have the selfbot evaluate javascript input and output the results                                 |
| indicator     | Have the selfbot spell a phrase in regional indicators                                            |
| ping          | Measure the delay between command calls and command execution in ms                               |
| nitro         | Have the selfbot post a fake embed about a "Nitro-only message"                                   |