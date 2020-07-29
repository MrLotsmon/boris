const ytdl = require('ytdl-core')
const play = require('./play.js');
const { client } = require('../../bot.js');
const queue = play.queue;
const s = play.skip;

module.exports.run = async message => {
    let connection = client.voiceConnections.get(message.guild.id);
    let guild_queue = queue.get(message.guild.id)
    if (!guild_queue) guild_queue = queue.set(message.guild.id, {songs: []}).get(message.guild.id)
    console.log(guild_queue.songs);
    s(connection, guild_queue.songs);
    message.channel.send(`Skiped...`);
    let info = ytdl.getInfo(guild_queue.songs[1]);
    message.channel.send(`Now playing: ${(await info).title}`);
}
