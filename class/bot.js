class Bot
{
    constructor(message, config)
    {
        let name        = undefined;
        let type        = undefined;
        let server      = undefined;
        let channel     = undefined;
        let channelName = undefined;
        
        this.message     = message;
        this.prefix      = config.prefix;
        this.name        = name;
        this.type        = type; 
        this.server      = server;
        this.channel     = channel;
        this.channelName = channelName;
    }
    sayReady()
    {
        this.say = "I am ready!";
        return this.say;
    }
    setActivity(param1, param2)
    {
        this.name = param1;
        this.type = param2;

        return this;

        // client.user.setActivity(`on ${client.guilds.size} servers`);
        // client.user.setActivity("Bliep bliep!", { type: 'WATCHING' });
    }
    showServeSize(param1, param2)
    {
        return `Ready to serve on ${param1} servers, for ${param2} users.`;
    }
    login(param)
    {
        return `Logged in as ${param}!`
    }
    findChannelOn()
    {
        this.channel = this.server.channels.find("name", "bot-channel");
    }
    setCreateChannel(){}
    createChannel() {
        this.server.createChannel("bot-channel", "text", [
            { id: this.server.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
            { id: this.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] }])
    }
    unsetCreateChannel(){}
    nowTime()
    {
      const theTime = new Date()
      return theTime.getHours().toString() + `:` + (theTime.getMinutes()<10?'0':'').toString() + theTime.getMinutes().toString();
    }
}

module.exports = Bot;