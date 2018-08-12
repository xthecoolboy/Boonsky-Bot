// Import the discord.js module
const Discord     = require("discord.js");
const Network     = require("./class/network");
const Raider      = require("./class/raider");
const Keystone    = require("./class/keystone");
const Announce    = require("./class/announce");
const BoonBot     = require("./class/bot");
const Guild       = require("./class/guild");
const ShowLogger  = require("./class/ShowLogger");

// Create an instance of a Discord client
const client = new Discord.Client();


// const person = new Person();
// person.log("I am a person!");

// Moved to the config file:
// The token of your bot - https://discordapp.com/developers/applications/me
const config = require("./config.json"); // "create your config.json file" and rename it to config.json
const boonBot = new BoonBot(undefined, config);
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on("ready", () => {

  console.log(
    "\n", boonBot.sayReady(), "\n", boonBot.showServeSize(client.guilds.size, client.users.size), "\n", boonBot.login(client.user.tag), "\n", boonBot.login(client.user.username)
  );

  boonBot.setActivity("Bliep bliep!", { type: 'WATCHING'})

  client.user.setActivity
  (
    boonBot.name, 
    boonBot.type
  );
    
});

const guildOne = new Guild;
const guildTwo = new Guild;
const guildServer = new Guild;
const guildRaids = new Guild;
const boonBotGuilds = [
  guildOne.setServerName(config.discord_guild["0"].servername).setServerID(config.discord_guild["0"].id),
  guildTwo.setServerName(config.discord_guild["1"].servername).setServerID(config.discord_guild["1"].id),
  guildServer.setServerName(config.discord_guild["2"].servername).setServerID(config.discord_guild["2"].id),
  guildRaids.setServerName(config.discord_guild["3"].servername).setServerID(config.discord_guild["3"].id)
];

client.on("ready", () => {

  var i;

  for (i = 0; i < boonBotGuilds.length; i++) {
   // console.log(boonBotGuilds[i].name+", "+boonBotGuilds[i].id);

    // if(client.guilds.find("name", boonBotGuilds[i].name).id === boonBotGuilds[i].id)
    // {
    //   console.log(client.guilds.get(boonBotGuilds[i].id).name);
    // }

    if(i === 0){
      console.log(client.guilds.get(boonBotGuilds[i].id).name);               // show guild name
      let guildserver = client.guilds.get(boonBotGuilds[i].id);               // get Guild collection by guild ID
      guildserver.members.forEach(function(member){                           // get all members
        let role = member.guild.roles.find(role => role.name === "Keystone"); // find Keystone Role collection
        if(member.roles.has(role.id)){                                        // check if member has role ID
          console.log(member.user.tag)                                        // log are member with that role ID
        }
      });
    }

  }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(client.channels.exists("name", "announce-voice-channel-user"))
  {

    const channelAnnounce = new Announce;
 
    function sendGuildAnnouncement(client, option)
    {
          client.guilds.forEach((guild) => {

            // list all channels of guild in a array.
            const listedChannels = []; 

            guild.channels.forEach(channel => { 
              if(channel.permissionsFor(newMember).has('VIEW_CHANNEL')) listedChannels.push(channel.id);
            });

            // hoofd channel id ophalen
            // client.channels.find("name", "announce-voice-channel-user").id;

            // Guild channel id ophalen van announce-voice-channel-user
            try {
            channelAnnounce.setChannelID(guild.channels.find("name", "announce-voice-channel-user").id);
            }
            catch(error) {
              
              const setupguild = new Guild;
              const setupshowlogger = new ShowLogger(undefined, config)
             

              function setupLoggerChannel(guild){
                
                let server = guild;
                // https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=createChannel
                // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS

                function resolveAfter(funcion, time)
                {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      resolve(
                        funcion
                      );
                    }, time);
                  });   
                }

                async function asyncCall() {
                  console.log('Setting up server:' + guild.name);
                  if(!server.roles.exists("name", "Guild Member")){
                    await resolveAfter(setupguild.createRole(server), 2000);
                  }
                  if(!server.roles.exists("name", "show-logger-on")){
                    await resolveAfter(setupshowlogger.createRole(server), 2000);
                  }
                  if(!server.channels.exists("name", "Logger"))
                  {
                    await resolveAfter(setupshowlogger.createChannelsCategory(client, server, guild), 8000);
                  }
                  if(!server.channels.exists("name", "announce-voice-channel-user"))
                  {
                    await resolveAfter(channelAnnounce.createChannelsAnnounce(client, server, guild), 8000);
                    await resolveAfter(setupguild.informationEind(client, guild), 9000);
                  }
                }
                asyncCall();

              }
              setupLoggerChannel(guild);
            }

            var i_listedChannels;

            for (i_listedChannels = 0; i_listedChannels < listedChannels.length; i_listedChannels++) {
          
              if(newMember.voiceChannelID === listedChannels[i_listedChannels])
              {
                // send message to announce-voice-channel-user channel.
                if(option === "Connected")
                {
                  channelAnnounce.setDisplay(client, newMember, oldMember);
                  channelAnnounce.sendUserConnectedMessage();
                }
                if(option === "Switched")
                {
                  channelAnnounce.setDisplay(client, newMember, oldMember);
                  channelAnnounce.sendUserswitchesMessage();
                }
                if(option === "Disconnected")
                {
                  channelAnnounce.setDisplay(client, newMember, oldMember);
                  channelAnnounce.sendUserDisconnectMessage();
                }
              }

              if(oldMember.voiceChannelID === listedChannels[i_listedChannels])
              {
                if(option === "Disconnected")
                {
                  channelAnnounce.setDisplay(client, newMember, oldMember);
                  channelAnnounce.sendUserDisconnectMessage();
                }
              }

            }

            listedChannels.join(',');
          });
    }

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
      // User Joins a voice channel
      sendGuildAnnouncement(client, "Connected");
    } 
    
    if(newUserChannel === undefined){
      // User leaves a voice channel
      sendGuildAnnouncement(client, "Disconnected");
    }
  
    if (oldUserChannel !== undefined && newUserChannel !== undefined) {
      // User switches channel
      sendGuildAnnouncement(client, "Switched");
    } 
  }
  
});

// Create an event listener for messages
client.on("message", (message) => {

  const cmdBot      = new BoonBot(message, config);                                                // set object of Bot.
  const cmdlogger   = new ShowLogger(message, config);                                             // set object of ShowLogger.
  const cmdkeystone = new Keystone(message, config);                                               // set object of Keystone.
  const cmdNetwork  = new Network();                                                               // set object of Network.
  const cmdRaid     = new Raider();                                                                // set object of Raider.

  i = 0;                                                                                           // we set i value to 0 here.
  let CreateRoleList = [                                                                           // list of objects, to setup channels.
    cmdBot,                                                                                        // part of object list.
    cmdkeystone,                                                                                   // part of object list.
    cmdRaid,                                                                                       // part of object list.
  ]
  for (i = 0; i < CreateRoleList.length; i++) {
    // creating bot-channel on server.                                                                                                    ####
    if(i === 0){
      CreateRoleList[i].findChannelOn(
        CreateRoleList[i].server = message.guild
      )
      if(CreateRoleList[i].channel === null){
        CreateRoleList[i].setCreateChannel(
          CreateRoleList[i].client = message.client,
          CreateRoleList[i].user   = client.user
        );
        CreateRoleList[i].createChannel();
        CreateRoleList[i].unsetCreateChannel(
          CreateRoleList[i].client = undefined, 
          CreateRoleList[i].user   = undefined, 
          CreateRoleList[i].server = undefined
        );
      }
    }
    // Creating roles Keystone, Raider on a guild server.                                                                                   ####
    if(i === 1 || i === 2){
      CreateRoleList[i].findRoleOn(                                                               // find roleName
        CreateRoleList[i].server = message.guild                                                  // set guild server
      );
      if(CreateRoleList[i].role === null){                                                        // Check role set to null.
        CreateRoleList[i].createRole();                                                           // Create Role.
        CreateRoleList[i].server = undefined;                                                     // server set: undefined.
      }
    }
  }

  // Bot stuff                                                                                                                              ####                                                                                
  if(message.author.bot){
    cmdlogger.setRoleToggle();                                                                    // bot can add or remove role show-logger-on with command !logger see guild class.
    
    // cmdNetwork.setCommandListenerToggle(config.prefix, message);

    // Bot networkGuildAdd command sets role on server here, then sends guild info badge to channel.                                        ####
    if(message.content.startsWith(config.prefix + "networkGuildAdd")){                            // message starts prefix + command
      let input = message.content;                                                                // content string, to find "Network -  Guild:"
      let userInput = input.substr('16');                                                         // extracted part of the text, start 16
      let guildIDstring = input.substr('17', '18');                                               // extracted part of the text, start 17 length 18
      let guildName = input.substr('36');                                                         // extracted part of the text, start 36
      if(userInput === ''){ 
        console.log('empty input set here!')                                                      // output to console.
      } else {                                                                                    
        console.log(`New Network connected guild role from server ID : ${guildIDstring}`);        // output to console.
        cmdNetwork.server = message.guild;                                                        // set server.
        cmdNetwork.setNetworkGuildRolenew(guildName);                                             // generate class rolename with user input, returns roleName.
        cmdNetwork.findRoleOn();                                                                  // findrole roleName, returns role.
        if(cmdNetwork.role === null)
        {                
          function resolveAfter(funcion, time)
          {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                  funcion
                );
              }, time);
            });   
          }
          
          // delay time
          async function asyncCall()
          {
            function guildBadgeCreate(guildIDstring, guildName, createGuild, server, channelsinfo){

              createGuild.server = server.get(config.discord_guild["0"].id);                      // get guild id and set server.
              createGuild.setNetworkGuildRolenew(guildName);                                      // generate class rolename with user input, returns roleName.
              createGuild.findRoleOn(guildName);                                                  // findrole roleName, returns role. 
              if(createGuild.role !== null){                                                      // if role null false set role and send a message
              
                  console.log(`New network role ID on main server: ${createGuild.role.id}`);      // output to console.
                  let channelid;                                                                  // unset value channelid.
                  let extrainfo1;                                                                 // unset value extrainfo1.
                  extrainfo1 = server.get(guildIDstring);                                         // set Guild ID get collection Guild.
                  channelid = extrainfo1.channels.find("name", "bot-channel").id;                 // find channel id and set channelid.
                  createGuild.param1 = config.main_server["0"].channelid;                         // set param1: channel id, use to send message to.
                  extrainfo1.channels.get(channelid).createInvite({ maxAge: 0, maxUses: 0, reason: "Creating network invite link."})
                  .then(invite =>  channelsinfo.get(createGuild.param1).send(`
                  \n\nRole Members: Currently none.\nRole label: <@&${createGuild.role.id}> \nInvite link: https://discordapp.com/invite/${invite.code}
                `))
                .catch(console.error); 
              }

            }

            // Create roll on main server for other network server.
            await resolveAfter(cmdNetwork.createRole(), 2000);
            // post guild badge.
            await resolveAfter(guildBadgeCreate(guildIDstring, guildName, new Network(), client.guilds, client.channels), 7500);
          }
          
          asyncCall();                                                                          // async functions: createRole, guildBadgeCreate
        }
      }
    }
    // User remove role on there own server here, bot then sends role to own server with message string command.                          #### 
    if(message.content.startsWith(config.prefix + "networkGuildRemove")){                       // message starts prefix + command
      cmdNetwork.server = message.guild,                                                        // set server
      // er was iets hier...
      cmdNetwork.setNetworkGuildRolenew("Test")                                                 // generate class rolename with user input, returns roleName. 
      cmdNetwork.findRoleOn();                                                                  // findrole roleName, returns role. 
      if(cmdNetwork.role !== null){                                                             // if role null false               
        cmdNetwork.removeRole();                                                                // remove role "Network - Guild: userInput".
      }
    }
  }
  // sets role on multiple servers the same as assigning server.                                                                          ####
  if(message.content.startsWith(config.prefix + "SyncMembers")){                                // message starts prefix + command
    const listRaid        = message.client.guilds.get(guildRaids.id);                           // set ID get collection guild.
    const listKeystone    = message.client.guilds.get(guildTwo.id);                             // set ID get collection guild.
    const listGuildserver = message.client.guilds.get(guildServer.id);                          // set ID get collection guild.

    console.log('[Start sync Data]');                                                           // output in console
    // Raid server
    // Iterate through the collection of GuildMembers from the Guild getting the username property of each member 
    listKeystone.members.forEach(                                                               
      // # Keystone server members collection sets members Keystone role to listRaid members #
      // # member => cmdkeystone.MemberCompare(member.user.tag, listA) #
      function(member){
        cmdkeystone.MemberCompare(member.user.tag, listKeystone) // deze hoeft er niet bij te staan maar om iedereen ook aan te zetten op keystone server doen we dit wel.
        cmdkeystone.MemberCompare(member.user.tag, listRaid)                                    // set members with role from are Keystone server to other server.
        cmdkeystone.resetMemberCompare(member.user.tag, listGuildserver);                       // unset members with role on other server.

        cmdkeystone.roleName = config.discord_guild["1"].rolename;                              // set rolename: Keystone
        let roleKeystone = member.guild.roles.find(role => role.name === cmdkeystone.roleName); // findrole roleName
        if(member.roles.has(roleKeystone.id))                                                   // if member role id true
        {       
          // # console.log(`Keystone member: ${member.user.tag}`) #
          cmdkeystone.MemberCompare(member.user.tag, listGuildserver)                           // set members with role from are Keystone server to other server.
        }
      }
    );

    listRaid.members.forEach(
      function(member){ 
        cmdRaid.MemberCompare(member.user.tag, listRaid)  // deze hoeft er niet bij te staan maar om iedereen ook aan te zetten op raider server doen we dit wel.
        cmdRaid.MemberCompare(member.user.tag, listKeystone)                                    // set members with role from are Raid server to other server.
        cmdRaid.MemberCompare(member.user.tag, listGuildserver)                                 // set members with role from are Raid server to other server.
      }
    );

    const cmdGuild = new Guild;                                                                 // set object of Guild.
    listGuildserver.members.forEach(function(member){
      cmdGuild.roleName = config.discord_guild["2"].rolename;                                   // set roleName of guild object with config data.
      let role = member.guild.roles.find(role => role.name === cmdGuild.roleName);              // findrole roleName.
      if(member.roles.has(role.id)){                                                            // if role id true.
        cmdGuild.MemberCompare(member.user.tag, listRaid);                                      // set members with role from are guild server to other server.
        cmdGuild.MemberCompare(member.user.tag, listKeystone);                                  // set members with role from are guild server to other server.
      }

    });

    console.log('[End sync Data]');                                                             // output in console
  }
  // User create role on there own server here, bot then sends role to own server with message string command.                            ####   
  if(message.content.startsWith(config.prefix + "Add Network - Guild:")){                       // message starts prefix + command
    if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR")){                    // if member is administrator true.
      let input = message.content;                                                              // message content.
      let userInput = input.substr('21');                                                       // get content afther "!Add Network - Guild:".
                                                                       
      const createGuild = new Network();                                                        // set object of Network.
      createGuild.setNetworkGuildRolenew(userInput);                                            // generate class rolename with user input, returns roleName.
      createGuild.server = message.guild;                                                       // set server.
      createGuild.findRoleOn();                                                                 // findrole roleName, returns role.
      if(createGuild.role === null){                                                            // if role null.
         createGuild.createRole();                                                              // create role "Network - Guild: userInput".
  
        if(!message.author.bot){                                                                // if bot false.
          createGuild.server = message.guild.channels;                                          // set server. - maintain?
          createGuild.client = message.client.channels;                                         // set client. - maintain?
          createGuild.param1 = config.main_server["1"].channelid;                               // set param1: channel id, use to send message to.

          client.channels.get(createGuild.param1).send('!networkGuildAdd ' + message.guild.id + ' ' + userInput); // string message command, setting instructions, then send to main server.
        }
      }

    } 
  }
  // for testing purpose.                                                                                                                 ####
  if(message.content.startsWith(config.prefix + "test")){
    if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR")){                      // if member is administrator true.
      // To send message template set server, client
      cmdNetwork.server = message.guild.channels;                                                 // set server.
      cmdNetwork.client = message.client.channels;                                                // set client.
      // Template version on
      cmdNetwork.sendMessageToMainOn(                                                             // sending message here to main server.
        config.main_server["0"].channelid,                                                        // set param1: channel id, use to send message to.
        config.main_network["0"].roleid,                                                          // set param2: role id on Main server example role.
        config.main_network["1"].roleid,                                                          // set param3: role id example guild server.
      );   
      // Template version off
      cmdNetwork.sendMessageToMainOff(                                                            // sending message here to main server.
        config.main_server["0"].channelid,                                                        // set param1: channel id, use to send message to.
        config.main_network["0"].roleid,                                                          // set param2: role id on Main server example role.
        config.main_network["1"].rolename,                                                        // set param3: guildName example guild server.
      );
    } 
  }
  // Create Keystone category channel                                                                                                     ####
  if(message.content.startsWith(config.prefix + "KeystoneServer")){                             // message starts prefix + command. 
    if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR")){                    // if member is administrator true. 
      cmdkeystone.setServer(message.guild);                                                     // set server.
      cmdkeystone.findChannelOn();                                                              // find channel Keystone.
      if(cmdkeystone.channel === null){                                                         // if channel Keystone null.
        cmdkeystone.setClient(message.client);                                                  // set client here.
        cmdkeystone.setClientUser(client.user);                                                 // set user here.
        cmdkeystone.createChannelsCategory();                                                   // create category on this channel.
        cmdkeystone.setClient(undefined);                                                       // unset client.
        cmdkeystone.setClientUser(undefined);                                                   // unset user.
        cmdkeystone.setServer(undefined);                                                       // unset server.
      }
    }
  }
  // Afther we use a command we clean up the command from user or the bot sending them.                                                   ####
  let commandlist = [                                                                           // we set value commandlist as array here.
    "guild tag on",                                                                             // command tag on.
    "guild tag off",                                                                            // command tag off.
    "keystone on",                                                                              // command tag on.
    "keystone off",                                                                             // command tag off.
    "logger on",                                                                                // command tag on.
    "logger off",                                                                               // command tag off.
    "Add Network - Guild:",                                                                     // command create role current and main server.
    "SyncMembers",                                                                              // command set role on collection members of network servers.
    "KeystoneServer",                                                                           // command setup.
    "test"                                                                                      // command for testing purpose.
  ]
  i = 0;                                                                                        // we set i value to 0 here.
  for (i = 0; i < commandlist.length; i++) {                                                    // count 0 to the last in command list.
    if(message.content.startsWith(config.prefix + commandlist[i])){                             // message starts prefix + command list.
      message.delete(1);                                                                        // delete one message.
    }
  }

  // set command tag on or off, can be set by user or bot.                                                                                ####
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;                 // clients can join roles with command aswel.
    cmdlogger.setRoleToggle();                                                                  // logger   on or off.
    cmdkeystone.setCommandListenerToggle();                                                     // keystone on or off.
    // if(message.member.roles.find("name", "Guild Member")){                                      // findrole Guild Member.
    //   const cmdGuild = new Guild;                                                               // set object of guild.
    //   const cmdBot = new BoonBot(message, config);                                              // set object of boonbot.
    //   cmdBot.server = message.guild;                                                            // set server.
    //   cmdBot.findChannelOn()                                                                    // find channel bot-channel.
    //   // trouble on Shameless Tree House server with changing .setNickname()
    //   if(cmdBot.channel !== null) {                                                             // if channel null false 
    //     if(cmdBot.channel.id === config.discord_guild["2"].channelid){                          // compare channel id
    //       cmdGuild.setGuildTagToggle(config.prefix, message, config.main_network["1"].rolename);// Guild tag on or off, Role: Guild Member, GuildTag
    //     }                                                          
    //   }
    //   cmdBot.server = undefined;                                                                // unset server.
    // }

});

// Log our bot in                                                                                                                         ####
client.login(config.token);

client.on("error", (e) => console.error(e));
client.on("warn",  (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
