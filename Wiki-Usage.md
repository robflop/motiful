# Tags:
Tags in motiful are a feature seperate from commands -- *they **_don't_** use the command prefix, nor do they have a specific "command name" that tells motiful to use them -- all it listens to is the format in which things are written.*

They are saved in a file called ``tags.js`` within the ``src/data`` folder and to update the loaded tags, motiful needs to be restarted.

To trigger a tag, just place it in your message alongside your other content enclosed by brackets, e.g. `My name is [name]!`. This will result in motiful trying to find a tag called `name`, replacing the tag call with the output this tag results in.

Assuming you have a tag called `name`, with value `'robflop'`, the result of the above would be: 

`My name is robflop!`.

If a tag cannot be found (e.g. you do *not* have a tag called `name`), motiful will simply ignore this and leave the text as-is, because you don't always want to use a tag when you use brackets. This is to avoid complications when trying to type text unrelated to the tags system.

In addition to this, it is possible to use on-the-fly evaluation using the `eval` keyword as tag name. To evaluate using this, provide the tag in a fashion such as this:

`My name is [eval: message.client.user.username]!`.

Motiful will then evaluate the code behind the keyword, resulting in a text of `My name is robflop`, if we assume that your username is `robflop`.

If you write more complex tag functions to for example fetch a guild and get any of its properties, you can pass parameters to your function in the same way as you would pass it to eval, each parameter being comma seperated.

For example let's take the above eval and turn it into a tag with parameter:

Your tag function would look like this: 
```js
(message, name) => `My name is ${name}!`
```

and would be used like this: `[name: robflop]`, resulting in the same as the above eval.

**Important notices**:

A tag function _always_ passes the message as first param like above. 
In usage you don't need to pass it (this is done automatically), but in the tag's code you do. See how it's done in the above example tag, that is how you need to do it too.

Only **one** tag is possible per message. This is due to internal workings of scanning the message for tags with complex inputs such as arrays, objects etc.
 
Also, the tags system is generally only meant for simple-ish functions, not a fully fleshed eval command or an entire standalone command. Keep this in mind when writing tags.

You will likely encounter errors if you go too deep into nesting aswell.


___

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
    * _Subscriber emotes disabled until further notice. [26-07-2017]_
 - emoteName: The name of the emote itself. It is **case-sensitive**.

# addQuote

#### Description: Save a quote of a message (Out of the last 100 overall messages).

#### Syntax: `addquote <quoteName> <user> <snippet>`

#### Aliases: `aq`

#### Explanation:
 - quoteName: The name you wish to save the quote under.
 - user: A mention, start of the username, or ID of the user that wrote the message you wish to quote.
 - snippet: A part of the message you wish to quote.

# addQuote-id

#### Description: Save a quote of a message using a messageID.

#### Syntax: `addquote-id <quoteName> <messageID>`

#### Aliases: `aqi`

#### Explanation:
 - quoteName: The name you wish to save the quote under.
 - messageID: ID of the message to save as quote.

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
    * _Subscriber emotes disabled until further notice. [26-07-2017]_
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
 - input: The text you wish to spell out in indicator emotes.

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
	* You *must* react using the 💬 (speech_balloon) emoji for the command to progress.

# quote

#### Description: Quote a message (Out of the last 100 overall messages).

#### Syntax: `quote <user> <input>`

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

# power

#### Description: Restart or shutdown motiful.

#### Syntax: `power <action>`

#### Aliases: `pw`

#### Explanation:
 - action: The action you wish to take, either `shutdown` or `restart`.

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