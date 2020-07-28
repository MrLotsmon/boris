let cmd = new Map();
let modules = new Map();
module.exports.modules = modules;
module.exports.commands = cmd;
const discord = require("discord.js");
const client = new discord.Client();
module.exports.client = client;
const { Console } = require("console");
require("./modules.js");
var queue = {};
const { on } = require("process");
client.login(process.env.token);
client.on("ready", async bot => {
    client.channels.get('737078310219153439').fetchMessage('737309985951973397');
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ game: { name: '+help | BORIS', url: 'https://discord.gg/7yghNJh', type: 'PLAYING' }, status: 'By: Lotsmon' })
});


client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.author == client.user) return;
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        cmd.forEach((value, key, map) => {
            if(message.content.toLowerCase().startsWith(`${process.env.prefix}${value.name}`)) {
                message.delete();
                require(value.file).run(message);
            }
        });
    }
    else
    if(message.channel == message.guild.channels.find("name", "bot-commands")){
        cmd.forEach((value, key, map) => {
            if(message.content.toLowerCase().startsWith(`${config.prefix}${value.name}`)) {
                message.delete();
                require(value.file).run(message);
            }
        });
    }
});

var temporary = []

client.on('voiceStateUpdate', (oldMember, newMember) =>{
    const tCatagory = '737054131520536737';
    const tChannel = '737065678527266817';
    const wCatagory = '737054048527712427';
    const wChannel = '736112565364719639';
    const pCatagory = '736049639425572925';
    const pChannel = '736111935254429706';
    
    if(newMember.voiceChannelID == tChannel){
        newMember.guild.createChannel(`${newMember.user.username}'s team`, {type: 'voice', parent: tCatagory, userLimit: 5})
            .then(async channel => {
                temporary.push({ newID: channel.id, guild: channel.guild })
                newMember.setVoiceChannel(channel.id)
            })
    }
    if(newMember.voiceChannelID == wChannel){
        newMember.guild.createChannel(`${newMember.user.username}'s wingman`, {type: 'voice', parent: wCatagory, userLimit: 2})
            .then(async channel => {
                temporary.push({ newID: channel.id, guild: channel.guild })
                newMember.setVoiceChannel(channel.id)
            })
    }
    if(newMember.voiceChannelID == pChannel){
        newMember.guild.createChannel(`${newMember.user.username}'s public`, {type: 'voice', parent: pCatagory})
            .then(async channel => {
                temporary.push({ newID: channel.id, guild: channel.guild })
                newMember.setVoiceChannel(channel.id)
            })
    }

    if(temporary.length >= 0) for(let i = 0; i < temporary.length; i++) {
        // Finding...
        let ch = temporary[i].guild.channels.find(x => x.id == temporary[i].newID)
        // Channel Found!         
        if(ch.members.size <= 0){

            ch.delete()
            // Channel has been deleted!
            return temporary.splice(i, 1)
        }
    }
})

client.on('messageReactionAdd', (react, user) => {
    if(user.bot) return;
    let msgid = react.message.id;
    let msg = react.message;
    if(msgid == '737309985951973397'){
        if(react.name = ':white_check_mark:'){
            let userid = user.id;
            let welcom = react.message.member.guild.roles.find("name", "NOT CONFIRMED");
            react.message.guild.members.get(userid).removeRole(welcom);
        }
    }
});

client.on('messageUpdate', async (oldmsg, newmsg) => {
    let channel = oldmsg.guild.channels.find(c => c.name == 'log')
    let embed = new discord.RichEmbed()
       .setAuthor('Message changed', newmsg.guild.iconURL)
       .addField('Sender', oldmsg.member, true)
       .addField('Channel', oldmsg.channel, true)
       .addField('Before', oldmsg.content)
       .addField('After', newmsg.content)
       .setColor(0xe19517)
       .setTimestamp();
   await channel.send(embed)
})

client.on('messageDelete', async message => {
    let channel = message.guild.channels.find(c => c.name == 'log')
   let embed = new discord.RichEmbed()
       .setAuthor('Message deleted', client.user.avatarURL)
       .addField('Sender', message.member, true)
       .addField('Channel', message.channel, true)
       .addField('Content', message.content)
       .setColor(0xf04747)
       .setTimestamp()
   await channel.send(embed)
})

client.on('guildMemberRemove', async member => {
   let embed = new discord.RichEmbed()
       .setAuthor('Member left', client.user.avatarURL)
       .setDescription(`${member.user.username}#${member.user.discriminator} (${member.id})`)
       .setColor(0xf04747)
       .setFooter(`ID: ${member.id}`)
       .setTimestamp()
   let channel = member.guild.channels.find(c => c.name == 'log')
   await channel.send(embed)
})

client.on('guildMemberAdd', member => {
    
    const channel = member.guild.channels.find(ch => ch.name === 'public-chat');
    if (!channel) return;
    let welcom = member.guild.roles.find("name", "NOT CONFIRMED");
    member.addRole(welcom).then(() => {
        let afp = member.guild.channels.find("name", "welcome-chat");
        let himes = afp.send(`Welcome to the server, ${member}`);
        setTimeout(() => { himes.delete();}, 10000);
    });
    let channellog = member.guild.channels.find(c => c.name == 'log')
    let embed =  new discord.RichEmbed()
       .setAuthor('Member joined', client.user.avatarURL)
       .setDescription(`${member.user.username}#${member.user.discriminator} (${member})`)
       .setColor(0x41b581)
       .setFooter(`ID: ${member.id}`)
       .setTimestamp()
       channellog.send(embed)
  });

client.on('reconnecting', () => {
    console.log('Reconnecting!');
   });
client.on('disconnect', () => {
    console.log('Disconnect!');
   });
   client.on('error', err =>{
       Console.log("BUGGGG");
   });
