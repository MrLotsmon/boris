const discord = require("discord.js");
const { modules } = require("../../bot");
const { send } = require("process");
const bot = require(`${process.cwd()}/bot.js`);
module.exports.run = async message => {
    await bot.modules.forEach(element => {
        let embed = new discord.RichEmbed()
                .setColor([60,255,0])
                .setTitle(element.name)
                .setDescription(element.description)
                .setThumbnail(element.image);
                element.commands.forEach(element => {
                embed.addField(element.usage, element.description, element.isInline);
            });
                switch(element.name){
                    case 'Information':
                        message.author.send(embed)
                        .catch(function(err) {
                            str = "Unable to send you the list because you cannot receive DMs.";
                            if(err != "(node:8428) UnhandledPromiseRejectionWarning: DiscordAPIError: Cannot send messages to this user")
                            message.reply(":no_entry_sign: Configure your privacy settings :no_entry_sign:");
                          });
                        break;
                        case 'Music': 
                        message.author.send(embed);
                        break;
                        case 'Moderator': 
                        if(!message.member.hasPermission("MANAGE_MESSAGES")) break;
                        message.author.send(embed);
                        break;
                }
            });
};  