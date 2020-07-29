const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);

module.exports.run = async message => {
    const args = message.content.split(" ");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry_sign: You can't clear messages! :no_entry_sign:");
        if(!args[1]) return args[1] = 1;
        let formes = args[1];
        if(args[1] > 100) {
            for (let i = 0; i <= formes / 100; i++) {
                message.channel.bulkDelete(100);
                formes -= i*100;
              }
        }
        else message.channel.bulkDelete(args[1]);
        let embed = new discord.RichEmbed()
        .setColor([255,125,0])
        .setDescription(`${message.member}, Cleared ${args[1]}, messages!`)
        .setAuthor(message.author.username, message.author.avatarURL,null)
        .setTitle(`Channel: ${message.channel.name}`)
        .setTimestamp();
        let log = message.guild.channels.find("name", "log");
        log.send(embed);
        let mesid = await message.reply(`Cleared ${args[1]} messages!`);
        let meslog = await message.channel.fetchMessage(mesid.id);
        setTimeout(() => { meslog.delete();}, 1500);
};
