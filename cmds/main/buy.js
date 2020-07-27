const discord = require("discord.js");
const { client } = require("../../bot");
const bot = require(`${process.cwd()}/bot.js`);
module.exports.run = async message => {
        let embed = new discord.RichEmbed()
            .setColor([255,255,125])
            .setTitle(`${message.author.username}, the application has been sent for consideration.`)
            .setDescription("Wait for a moderator to contact you.")
            .setFooter("1 week - 0.35$ | 1 month - 1$ | 3 months - 2.3$");
            message.reply(embed);
        console.log(`${message.author.username} отправил заявку`);
        let afp = message.guild.channels.find("name", "applications-for-purchase");
        afp.send(`Application from ${message.member}`);
};