# Boonsky-Bot

| commands                                  | description                                           |
| ----------------------------------------- |:-----------------------------------------------------:|
| !logger on                                | turns role on for user on discord.                    |
| !logger off                               | turns role off for user on discord.                   |
| !keystone on                              | turns role on for user on discord.                    |
| !keystone off                             | turns role off for user on discord.                   |
| !guild tag on                             | Administrator can turn on guild tag for role members. |
| !guild tag off                            | Administrator can turn off guild tag for role members.|
| !Add Network - Guild:  guild name         | Administrator can add role to main guild network.     |
| !SyncMembers                              | Administrator can synq roles cross network guilds.    |
| !KeystoneServer                           | Administrator to create channel category for server.  |


## Setup
Creating a new bot account

1. Head over to the [applicatons page.](https://discordapp.com/developers/applications/me) 
2. Click “new application”. Give it a name, picture and description.
3. Click “Create Bot User” and click “Yes, Do It!” when the dialog pops up.
4. Copy down the token. This is what is used to login to Boonsky-Bot.

Find client ID for your bot and replace 000000000000000000 in the link below.

You can invite the bot using this link afther your replaced 000000000000000000 with your client id of your bot.
https://discordapp.com/api/oauth2/authorize?client_id=000000000000000000&permissions=487668817&scope=bot

## Information Boonsky-Bot
When bot joins a server and has the right permissions, it should create a text channel: #bot-channel. and add the following roles to the server: Boonsky-Bot, Keystone, Raider.

If a user join a voice channel or leave a voice channel and there is no show-logger-on role yet it will create that role, and make a category channel: Logger and a text channel: #announce-voice-channel-user.
I havent made it yet it ordens the channels so you will have to drag #announce-voice-channel-user channel to its parent category channel: Logger to be com a sub channel.

The user can use the command !logger on or !logger off to show or hide the channel.
When sumbudy joins, leaves, switches channel the bot will send a messsage to #announce-voice-channel-user and if you have that text channel selected it will read out in Text-To-Speach (TTS) who joined or leaved or switched witch channel.
