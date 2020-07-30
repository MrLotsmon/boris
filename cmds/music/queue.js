const play = require('./play.js');
const discord = require('discord.js');
let i = 0;

module.exports.run = async message => {
    i = 0;
    let guild_queue = play.queue.get(message.guild.id)
    if (!guild_queue) guild_queue = play.queue.set(message.guild.id, {songs: []}).get(message.guild.id)
    console.log(guild_queue.songs);
    let embed = new discord.RichEmbed()
    embed.setTitle('Queue list')
    guild_queue.songs.forEach(element => {
        i++;
        embed.addField(`${i}. ${element.title}`, element.url)
    });
    message.channel.send(embed);
}