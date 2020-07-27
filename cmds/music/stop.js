const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);
module.exports.run = async message => {
    if(!message.member.voiceChannel) return await message.reply("you have to be in voice channel to stop music!");
    message.member.voiceChannel.leave();
};