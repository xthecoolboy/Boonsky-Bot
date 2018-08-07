const Network  = require("./network");

class Keystone {
    constructor(message, config)
    {
        let member = undefined;
        let role = undefined;
        let roleName = Keystone.name;
        let server = undefined;
        let channal = undefined;

        this.message = message;
        this.server = server;
        this.channel = channal;
        this.prefix = config.prefix;
        this.member = member
        this.role = role;
        this.roleName = roleName;
    }
    MemberCompare(MemberB, listA, roleName)
    {
        const obj = new Network();
        roleName = this.roleName;
        obj.MemberCompare(MemberB, listA, roleName);
    }
    resetMemberCompare(MemberB, listA, roleName)
    {
        const obj = new Network();
        roleName = this.roleName;
        obj.resetMemberCompare(MemberB, listA, roleName);
    }
    setServer(obj)
    {
        this.server = obj;
    }
    setClient(obj)
    {
        this.client = obj;
    }
    setClientUser(obj)
    {
        this.user = obj;
    }
    createRole() { 
        this.server.createRole({ name: this.roleName, color: '#206694'});
    }
    createChannelsCategory() {
        // https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=setChannelPosition
            this.server.createChannel(this.roleName, "category", [
                { id: this.server.id, deny: ['VIEW_CHANNEL'] },
                { id: this.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] },
                { id: this.server.roles.find("name", this.roleName).id, allow: ['VIEW_CHANNEL'] }])
    }
    findRoleOn()
    {
        this.role = this.server.roles.find("name", this.roleName);
    }
    findChannelOn()
    {
        this.channel = this.server.channels.find("name", this.roleName);
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
    setCommandListenerToggle()
    {
        // If the message is "prefix set to ! + turn on"
        if (this.message.content.startsWith(this.prefix + "keystone on")) {
            this.setCommandListenerOn();
        }
        // If the message is "prefix set to ! + turn off"
        if (this.message.content.startsWith(this.prefix + "keystone off")) {
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
module.exports = Keystone;