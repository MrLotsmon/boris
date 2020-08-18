const ytdl = require('ytdl-core')
const play = require('./play.js');
const { client } = require('../../bot.js');

module.exports.run = async message => {
    let guild_queue = play.queue.get(message.guild.id)
    if (!guild_queue) guild_queue = play.queue.set(message.guild.id, {songs: []}).get(message.guild.id)
    console.log(guild_queue.songs);
    play.skip(guild_queue.songs);
}