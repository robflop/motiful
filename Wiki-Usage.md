# addEmote

#### Description: Add a custom emote.

#### Syntax: `addemote <emoteName> <url>`

#### Aliases: `ae`

#### Explanation:
 - emoteName: The name you wish to save the emote under.
 - url: The link to the file you wish to save as emote -- if saving an attachment, url does not need to be provided.

# addFav

#### Description: Add an emote to the favorites list.

#### Syntax: `addfav <channelName> <emoteName>`

#### Aliases: `af`

#### Explanation:
 - channelName: The name of the channel on twitch, e.g. robflop98 OR name of the extension.
    * Supported extensions: ffz and bttv standing for FrankerFacez and BetterTwitchTV respectively.
 - emoteName: The name of the emote itself. It is **case-sensitive**.

# addQuote

#### Description: Save a quote of a message (Out of the last 100 overall messages).

#### Syntax: `addquote <quoteName> <user> <snippet>`

#### Aliases: `aq`

#### Explanation:
 - quoteName: The name you wish to save the quote under.
 - user: A mention, start of the username, or ID of the user that wrote the message you wish to quote.
 - snippet: A part of the message you wish to quote.

# aesthetics

#### Description: Make your input a e s t h e t i c.

#### Syntax: `aesthetics <input>`

#### Aliases: None

#### Explanation:
 - input: The text you wish to turn a e s t h e t i c.

# ascii

#### Description: Turn your input into ascii text.

#### Syntax: `ascii <input>`

#### Aliases: None

#### Explanation:
 - input: The text you wish to ascii-fy.

# delEmote

#### Description: Delete a custom emote.

#### Syntax: `delemote <emoteName>`

#### Aliases: `de`

#### Explanation:
 - emoteName: The name of the emote you wish to delete.

# delFav

#### Description: Delete an emote from the favorites list.

#### Syntax: `delfav <emoteName>`

#### Aliases: `df`

#### Explanation:
 - emoteName: The name of the emote you wish to remove from your favorites.

# delQuote

#### Description: Delete a saved quote.

#### Syntax: `delquote <quoteName>`

#### Aliases: `dq`

#### Explanation: 
 - quoteName: The name of the quote you wish to delete.

# emote

#### Description: Post a twitch (global or subscriber), FrankerFaceZ, BetterTwitchTV or custom emote into chat.

#### Syntax: `emote <channelName> <emoteName> <emoteSize>`

#### Aliases: `em`

#### Explanation:
 - channelName: The name of the channel on twitch, e.g. robflop98 OR name of the extension.
    * Supported extensions: `ffz` and `bttv` standing for FrankerFacez and BetterTwitchTV respectively.
    * If posting a global, favorite or custom emote, this value is replaced by emoteName.
 - emoteName: The name of the emote itself. It is **case-sensitive**.
    * If posting a global or favorite emote, this value is replaced by emoteSize.
    * If posting a custom emote, this value does not exist.
 - emoteSize: The size of the emote you wish to select. Options are `small`, `medium` and `big`.
    * This value defaults to `small` if no input is provided.
    * If posting a global emote, this value replaces emoteName.
    * If posting a custom emote, this value does not exist.

# eval

#### Description: Evaluate javascript code.

#### Syntax: `eval <asyncFlag> <code>`

#### Aliases: `ev`

#### Explanation:
 - asyncFlag: If you provide `async` as the value of this argument, the following code will be executed asynchronically and you will be able to use await/async syntax.
    * If yo do not provide `async` as the value for this argument, it will simply be regarded as part of the `code` argument and will be appended.
 - code: The code you wish to evaluate.

# help

#### Description: Get usage help.

#### Syntax: `help`

#### Aliases: `h`, `commands`

#### Explanation:
 - None

# indicators

#### Description: Turn input text into indicator-emoji text

#### Syntax: `indicators <input>`

#### Aliases: None

#### Explanation:
 - input: The text you to spell out in indicator emotes.

# listEmotes

#### Description: List all custom emotes.

#### Syntax: `listemotes`

#### Aliases: `le`

#### Explanation:
 - None

# listFavs

#### Description: List all saved favorite emotes.

#### Syntax: `listfavs`

#### Aliases: `lf`

#### Explanation:
 - None

# listQuotes

#### Description: List all saved quotes.

#### Syntax: `listquotes`

#### Aliases: `lq`

#### Explanation:
 - None

# nitro

#### Description: Send a fake embed about Discord Nitro.

#### Syntax: `nitro`

#### Aliases: None

#### Explanation:
 - None

# ping

#### Description: Measure the delay between command call and execution.

#### Syntax: `ping`

#### Aliases: `delay`

#### Explanation:
 - None

# purge

#### Description: Purge your messages (In the last 100 overall Messages).

#### Syntax: `purge <amount>`

#### Aliases: `prune`, `p`

#### Explanation:
 - amount: The amount of your own messages you wish to purge.

# quote-id

#### Description: Quote a message using a message ID

#### Syntax: `quote-id <message> <response>`

#### Aliases: `qid`

#### Explanation:
 - message: The ID of the message you want to quote.
 - response: An optional response to attach to the quote.

# quote-react

#### Description: Quote a message by using a \'💬\' message reaction

#### Syntax: `quote-react <response>`

#### Aliases: `qr`

#### Explanation:
 - response: An optional response to attach to the quote.
    * For clarity: The message selection happens by reacting to it, so no snippet, user or other arguments need to be given.
	* You *must* react using the 💬 emoji for the command to progress.

# quote

#### Description: Quote a message (Out of the last 100 overall messages).

#### Syntax: `quote <user> <snippet>`

#### Aliases: `q`

#### Explanation:
 - user: A mention, start of the username, or ID of the user that wrote the message you wish to quote.
 - input: Both the snippet of the message you wish to quote and optionally a response to attach to the quote, the former and the latter seperated by a vertical line ('|').

# reload

#### Description: Reloads a command.

#### Syntax: `reload <command>`

#### Aliases: `rl`

#### Explanation:
 - command: The name of the command you wish to reload.

# sendQuote

#### Description: Send a saved quote.

#### Syntax: `sendquote <quoteName>`

#### Aliases: `sq`

#### Explanation:
 - quoteName: The name of the saved quote to send.

# setGame

#### Description: Set the game you'll be shown to be playing.

#### Syntax: `setgame <input>`

#### Aliases: `sg`

#### Explanation:
- input: The text you wish to set your `Playing ...` status to. Leaving this empty will clear your status.

# shutdown

#### Description: Shut down motiful.

#### Syntax: `shutdown`

#### Aliases: `kill`

#### Explanation:
 - None

# sub

#### Description: Replace a part of one of your messages (Only from last 100 overall Messages).

#### Syntax: `sub <input>`

#### Aliases: `s`

#### Explanation:
 - input: Both the parts you wish to replace, and what you wish to replace them with. Former and latter are seperated by a vertical bar (`|`), individual words or phrases in the former or latter are seperated by semicolons (`;`).

# toggle

#### Description: Toggle a command on or off.

#### Syntax: `toggle <targetCommand>`

#### Aliases: `t`

#### Explanation:
 - targetCommand: The command you to disable or enable.