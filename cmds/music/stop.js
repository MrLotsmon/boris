const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);
const ytdl = require('ytdl-core')
const play = require('./play.js');
const { client } = require('../../bot.js');
const queue = play.queue;
const st = play.stop;

module.exports.run = async message => {
    let connection = client.voiceConnections.get(message.guild.id);
    let guild_queue = queue.get(message.guild.id)
    if (!guild_queue) guild_queue = queue.set(message.guild.id, {songs: []}).get(message.guild.id)
    console.log(guild_queue.songs);
    st(connection, guild_queue.songs)
};