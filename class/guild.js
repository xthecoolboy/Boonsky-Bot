const Network  = require("./network");
class Guild {
    constructor()
    {
      let name = undefined;
      let id = undefined;
      let channel = undefined;
      let roleName = Guild.name;

      this.name = name;
      this.id = id;
      this.channel = channel;
      this.roleName = roleName;
    }
    setServerName(name)
    {
      this.name = name;
      return this;
    }
    setServerID(number)
    {
      this.id = number;
      return this;
    }
    setChannelID(number)
    {
      this.channel = number
      return this;
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
    informationEind(client, guild)
    {
      client = client;
      guild = guild;
      let respons = "dident seem to be there so i created it!";
      this.setChannelID(guild.channels.find("name", "bot-channel").id);
      client.channels.get(this.channel).send(`Hello <@${guild.owner.user.id}> owner of ${guild.name}\nI have created the following channels:\ncategory channel: Logger ${respons}\ntext channel: announce-voice-channel-user ${respons}`);
      //Can you drag this channel to the Logger channel?

      client.channels.get(this.channel).send('!logger on');
      console.log(guild.name, `channel: dident seem to be there so i created it!`);
    }

    createRole(server) {
      return server.createRole({name: 'Guild Member', color: '#e4b400'});
    }
    setOption(option)
    {
      this.option;
      return this
    }
    findRoleMember(){}
    setGuildTagToggle(prefix, message, guildTag)
    {
      let option;
      this.on  = 'on';                                // on
      this.off = 'off';                               // off
      option = this.setOption( option );              // set option
      this.setGuildTag(prefix, message, option.on, guildTag);   // set guild tag on
      this.setGuildTag(prefix, message, option.off, guildTag);  // set guild tag off
    }
    ucfirst(string) {
      const obj = new Network();
      return obj.ucfirst(string);
    }
    lcfirst(string) {
      const obj = new Network();
      return obj.lcfirst(string);
    }
    setGuildTag(prefix, message, option, guildTag)
    {
      message = message;
      if (message.content.startsWith(prefix + "guild tag "+ option)){

        if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR")){
          //Filtering the guild members only keeping those with the role
          //Then mapping the filtered array to their usernames
          let membersWithRole = message.guild.members.filter(member => { 
            return member.roles.find("name", `Guild Member`);
          }).map(member => {
      
              try {
              
                if(!message.guild.member(member.user.id).hasPermission("ADMINISTRATOR")) {
                  if(option === this.off)
                  {
                    return message.guild.member(member.user.id).setNickname(member.user.username);
                  }
                  if(option === this.on)
                  { 
                    return message.guild.member(member.user.id).setNickname(member.user.username + ` <${guildTag}>`);
                  }              
                } else{
                  console.log(`admin can't be namechanged by bot.`);
                }
                
              }
              catch(error) {
                console.log(`admin can't be namechanged by bot.`);
              }
      
              return member.user.username;
          })
          membersWithRole.join("\n");
        }
        
      }
    }

  }
  module.exports = Guild;