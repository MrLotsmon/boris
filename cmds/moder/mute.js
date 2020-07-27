const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);
module.exports.run = async message => {
    let tomute = message.mentions.members.first();
    let moderator = message.member;
    if(!tomute)
        return message.reply("Mention user!");
    if(!moderator.hasPermission("BAN_MEMBERS"))
        return message.reply("You can't mute members!");
    if(moderator.calculatedPosition <= tomute.calculatedPosition)
        return message.reply("You can't mute this member!");
    if(tomute == moderator)
        return message.reply("You can't mute yourself!");
    let minutes = message.content.split(" ")[2];
    let reason = message.content.split(" ").slice(3).join(" ");
    let muterole = message.guild.roles.find("name", "MUTE");
    let name = message.author.username;
    await tomute.addRole(muterole).then(() => {
        let embed = new discord.RichEmbed()
            .setColor([255,125,0])
            .setDescription(`${moderator} muted ${tomute} for ${minutes}min, because ${reason}`)
            .setTitle("Shut up please!")
            .setAuthor(name, message.author.avatarURL,null)
            .setTimestamp();
        message.channel.send(embed);
        message.guild.channels.find("name", "log").send(embed);
        setTimeout(() => {
            tomute.removeRole(muterole).catch(() => console.log("Unmuted"));
        }, 1000*60*minutes);
    });
};