const discord = require("discord.js");
const { client } = require("../../bot");
const bot = require(`${process.cwd()}/bot.js`);

module.exports.run = async message => {
        let embed = new discord.RichEmbed()
            .setColor([255,255,125])
            .setTitle(`My Ping: ${message.client.ping} :satellite:`)
            .setAuthor(message.client.user.username, (message.client.user.displayAvatarURL));
            message.channel.send(embed)
            .then(msg => { msg.delete(5*1000); embed = null; });
}