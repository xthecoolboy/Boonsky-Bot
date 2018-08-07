class Announce 
{
    constructor()
    {
        let responses    = {}
        let client       = undefined;
        let newMember    = undefined;
        let oldMember    = undefined;
        let channel      = undefined;
        let displayName  = undefined;
        let voiceChannel = undefined;
        
        responses = {
            "UserD":  `\n\tUser\tDiscord: ` ,
            "UserDD": `\n\tUser\tDiscord\tdisconnected: `,
            "UserDC": `\n\tUser\tDiscord\tConnected: `,
            "UserAJC":`\nAction: joined channel `,
            "UserALC":`\nAction: left channel `,
            "UserASCT": `\nAction: switched channel to `,
            "UserTime": `\nTime: `
          }
        this.client       = client;
        this.newMember    = newMember;
        this.oldMember    = oldMember;
        this.channel      = channel;
        this.responses    = responses;
        this.displayName  = displayName;
        this.voiceChannel = voiceChannel;
    }
    nowTime()
    {
        const theTime = new Date()
        return theTime.getHours().toString() + `:` + (theTime.getMinutes()<10?'0':'').toString() + theTime.getMinutes().toString();
    }
    setChannelID(number)
    {
      this.channel = number;
      return this
    }
    setDisplay(client, newMember, oldMember)
    {
        let displayName = undefined;
        let voiceChannel = undefined;
        this.client     = client;
        this.newMember = newMember;
        this.oldMember = oldMember;
        this.displayName = displayName;
        this.voiceChannel = voiceChannel;
    }
    sendChannelMessage(responses)
    {
        this.responses = {
            "1": responses["1"],
            "2": responses["2"],
            "3": responses["3"]
        }

        this.client.channels.get(this.channel).send(
            this.responses["1"] + this.displayName + this.responses["2"] + this.voiceChannel + this.responses["3"] + this.nowTime(), { tts: true}
            // changed this.displayName  = this.newMember.displayName to this.displayName  = this.newMember.id `<@${this.displayName}>`;
        );
    }
    sendUserConnectedMessage()
    {
        this.responses = {
            "1": this.responses["UserDC"],
            "2": this.responses["UserAJC"],
            "3": this.responses["UserTime"]
        }
        this.displayName  = this.newMember.displayName;
        this.voiceChannel = this.newMember.voiceChannel;
        
        this.sendChannelMessage(this.responses);
    }

    sendUserDisconnectMessage()
    {
        this.responses = {
            "1": this.responses["UserDD"],
            "2": this.responses["UserALC"],
            "3": this.responses["UserTime"]
        }   
        this.displayName = this.newMember.displayName;
        this.voiceChannel = this.oldMember.voiceChannel;

        this.sendChannelMessage(this.responses);
    }

    sendUserswitchesMessage()
    {
        this.responses = {
            "1": this.responses["UserD"],
            "2": this.responses["UserASCT"],
            "3": this.responses["UserTime"]
        }
        this.displayName  = this.newMember.displayName;
        this.voiceChannel = this.newMember.voiceChannel;

        this.sendChannelMessage(this.responses);
    }

    createChannelsAnnounce(client, server, guild) {
        return server.createChannel("announce-voice-channel-user", "text", [
                { id: guild.id, deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
                { id: client.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] },
                { id: guild.roles.find("name", "show-logger-on").id, allow: ['VIEW_CHANNEL'] }])
      }

}

module.exports = Announce;