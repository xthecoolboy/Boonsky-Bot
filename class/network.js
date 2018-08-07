const Guild = require("./Guild");

// Template post for this server: 
// Role label: @Network -  Guild: Your Guild Name 
// Role Members: Currently none.

// https://discord.js.org/#/docs/main/master/class/Guild?scrollTo=addMember
// https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=createRole
class Network
{
    constructor()
    {
        let message  = undefined;
        let content  = undefined;
        let prefix   = undefined;
        let invite   = undefined;
        let role     = undefined;
        let roleName = Network.name;
        let MainBotChannelID   = undefined;
        let MainNetworkInfoID  = undefined;

        this.message   = message;
        this.content   = content;
        this.prefix    = prefix;
        this.role      = role;
        this.roleName  = roleName;
        this.invite    = invite;
        
        this.MainBotChannelID  = MainBotChannelID;
        this.MainNetworkInfoID = MainNetworkInfoID;
    }
    ucfirst(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    lcfirst(string) {
        return string[0].toLowerCase() + string.slice(1);
    }
    MemberCompare(MemberB, listA, roleName)
    {
      // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
      listA.members.forEach( function(member){    
        if(MemberB === member.user.tag){
          let role = member.guild.roles.find(role => role.name === roleName);
          member.addRole(role)
          .then(console.log(`[Updating Sync Data] Server: `+ listA.name + ` [${roleName} role] set:`+ member.user.tag ))
          .catch(console.error);
        }
      });
    }
    resetMemberCompare(MemberB, listA, roleName)
    {
      // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
      listA.members.forEach( function(member){    
        if(MemberB === member.user.tag){
          let role = member.guild.roles.find(role => role.name === roleName);
          member.removeRole(role)
          .then(console.log(`[Updating Sync Data] Server: `+ listA.name + ` [${roleName} role] unset:`+ member.user.tag ))
          .catch(console.error);
        }
      });
    }
    findRoleOn()
    {
        this.role = this.server.roles.find("name", this.roleName);
    }
    setNetworkGuildRolenew(roleName)
    {
        this.roleName = `${this.roleName} - ${Guild.name}: ` + roleName;
    } 
    createRole() {
        // Network - Guild: roleName
        this.server.createRole({ name: this.roleName, color: 'BLUE', mentionable: true})
        .then(console.log(`[Guild ${Network.name}] Server: ${this.server.name} [Role Add] Role:`,  this.roleName ))
        .catch(console.error); 
    }
    removeRole() { 
        this.role.delete("networkGuildRemove")
        .then(console.log(`[Guild ${Network.name}] Server: ${this.server.name} [Role Remove] Role:`,  this.roleName))
        .catch(console.error);
    }
    sendMessageToMainOn(param1, param2, param3)
    {
        //client.channels.get(this.channel).send('test');
        // Command: "\@Network - Guild:"   output: in chat channel you can get role id you get <@&000000000000000000>.
        let channelID;
        channelID = this.server.find("name", "bot-channel").id;
        // Create an invite to a channel
        channelID = this.client.get(channelID);
        channelID.createInvite({ maxAge: 0, maxUses: 0, reason: "Creating network invite link."})
        .then(invite => this.client.get(param1).send(`
        Template post for this server:\n\nRole label: __**<@&${param2}>**__  __**Your Guild Name**__\nRole Members: Currently none.\nInvite link: https://discordapp.com/invite/Create-Guild-Invite-Link-to-share\n\n(Pending) Implementation:\n\nRole Members: Currently none.\nRole label: __**<@&${param3}>**__ \nInvite link: https://discordapp.com/invite/${invite.code}
        `))
        .catch(console.error);
    }
    sendMessageToMainOff(param1, param2, param3)
    {
        //client.channels.get(this.channel).send('test');
        // Command: "\@Network - Guild:"   output: in chat channel you can get role id you get <@&000000000000000000>.
        this.client.get(param1).send(`
         Template post for this server:\n\nRole label: __**<@&${param2}>**__  __**Your Guild Name**__\nRole Members: Currently none.\nInvite link: https://discordapp.com/invite/Create-Guild-Invite-Link-to-share\n\n(Pending) Implementation:\n\nRole Members: Currently none.\nRole label: __**<@&${param2}>**__  __**${param3}**__\nInvite link: https://discordapp.com/invite/example
        `);  
    }
}
module.exports = Network;