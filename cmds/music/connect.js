const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);

module.exports.run = async message => {
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.reply('Join voice channel!');
    voiceChannel.join();
};