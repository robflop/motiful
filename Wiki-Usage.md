# addEmote

#### Syntax: `addemote <emoteName> <url>`

#### Explanation:
 - emoteName: The name you wish to save the emote under.
 - url: The link to the file you wish to save as emote -- if saving an attachment, url does not need to be provided.

# addFav

#### Syntax: `addfav <channelName> <emoteName>`

#### Explanation:
 - channelName: The name of the channel on twitch, e.g. robflop98 OR name of the extension.
    * Supported extensions: ffz and bttv standing for FrankerFacez and BetterTwitchTV respectively.
 - emoteName: The name of the emote itself. It is **case-sensitive**.

# addQuote

#### Syntax: `addquote <quoteName> <user> <snippet>`

#### Explanation:
 - quoteName: The name you wish to save the quote under.
 - user: A mention, start of the username, or ID of the user that wrote the message you wish to quote.
 - snippet: A part of the message you wish to quote.

# aesthetics

#### Syntax: `aesthetics <input>`

#### Explanation:
 - input: The text you wish to turn a e s t h e t i c.

# ascii

#### Syntax: `ascii <input>`

#### Explanation:
 - input: The text you wish to ascii-fy.

# delEmote

#### Syntax: `delemote <emoteName>`

#### Explanation:
 - emoteName: The name of the emote you wish to delete.

# delFav

#### Syntax: `delfav <emoteName>`

#### Explanation:
 - emoteName: The name of the emote you wish to remove from your favorites.

# delQuote

#### Syntax: `delquote <quoteName>`

#### Explanation: 
 - quoteName: The name of the quote you wish to delete.

# emote

#### Syntax: `emote <channelName> <emoteName> <emoteSize>`

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

#### Syntax: `eval <asyncFlag> <code>`

#### Explanation:
 - asyncFlag: If you provide `async` as the value of this argument, the following code will be executed asynchronically and you will be able to use await/async syntax.
    * If yo do not provide `async` as the value for this argument, it will simply be regarded as part of the `code` argument and will be appended.
 - code: The code you wish to evaluate.

# help

#### Syntax: `help`

#### Explanation:
 - None

# indicators

#### Syntax: `indicators <input>`

#### Explanation:
 - input: The text you to spell out in indicator emotes.

# listEmotes

#### Syntax: `listemotes`

#### Explanation:
 - None

# listFavs

#### Syntax: `listfavs`

#### Explanation:
 - None

# listQuotes

#### Syntax: `listquotes`

#### Explanation:
 - None

# nitro

#### Syntax: `nitro`

#### Explanation:
 - None

# ping

#### Syntax: `ping`

#### Explanation:
 - None

# purge

#### Syntax: `purge <amount>`

#### Explanation:
 - amount: The amount of your own messages you wish to purge.

# quote

#### Syntax: `quote <user> <snippet>`

#### Explanation:
 - user: A mention, start of the username, or ID of the user that wrote the message you wish to quote.
 - snippet: A part of the message you wish to quote.

# sendQuote

#### Syntax: `sendquote <quoteName>`

#### Explanation:
 - quoteName: The name of the saved quote to send.

# setGame

#### Syntax: `setgame <input>`

#### Explanation:
- input: The text you wish to set your `Playing ...` status to. Leaving this empty will clear your status.

# shutdown

#### Syntax: `shutdown`

#### Explanation:
 - None

# sub

#### Syntax: `sub <input>`

#### Explanation:
 - input: Both the parts you wish to replace, and what you wish to replace them with. Former and latter are seperated by a vertical bar (`|`), individual words or phrases in the former or latter are seperated by semicolons (`;`).

# toggle

#### Syntax: `toggle <targetCommand>`

#### Explanation:
 - targetCommand: The command you to disable or enable.