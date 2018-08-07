class ShowLogger {
    constructor(message, config)
    {
        let member = undefined;
        let role = undefined;

        this.message = message;
        this.prefix = config.prefix;
        this.member = member
        this.role = role;
    }
    createRole(server) { 
        return server.createRole({ name: 'show-logger-on'});

    }
    createChannelsCategory(client, server, guild) {
        return server.createChannel("Logger", "category", [
                { id: guild.id, deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
                { id: client.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] },
                { id: guild.roles.find("name", "show-logger-on").id, allow: ['VIEW_CHANNEL'] }])
    }
    findRoleOn()
    {
        let role = "show-logger-on";
        this.role = this.message.guild.roles.find("name", role);
    }
    setMember()
    {
        // the person who made the command: 
        this.member = this.message.member;
        // Add the role!
        this.member.addRole(this.role);
    }
    unsetMember()
    {
        // the person who made the command: 
        this.member = this.message.member;
        // remove the role!
        this.member.removeRole(this.role);
        // unset member propertie
        this.member = undefined;
    }
    setRoleToggle()
    {
        // If the message is "prefix set to ! + turn on"
        if (this.message.content.startsWith(this.prefix + "logger on")){
            this.setCommandListenerOn();
        }
        // If the message is "prefix set to ! + turn off"
        if (this.message.content.startsWith(this.prefix + "logger off")){
            this.setCommandListenerOff();
        }
    }
    setCommandListenerOn()
    {
        this.findRoleOn();
        this.setMember();
        
    }
    setCommandListenerOff()
    {
        this.findRoleOn();
        this.unsetMember();
    }
}
module.exports = ShowLogger;