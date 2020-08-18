const discord = require("discord.js");
const { modules } = require("../../bot");
const { send } = require("process");
const bot = require(`${process.cwd()}/bot.js`);
module.exports.run = async message => {
    if(message.member.roles.find(rl => rl.name === 'RUS')){
    await bot.modules.forEach(element => {
        let embed = new discord.RichEmbed()
                .setColor([60,255,0])
                .setTitle(element.name)
                .setDescription(element.rusdescription)
                .setThumbnail(element.image);
                element.commands.forEach(element => {
                embed.addField(element.usage, element.rusdescription, element.isInline);
            });
                switch(element.name){
                    case 'Information':
                        message.author.send(embed)
                        .catch(function(err) {
                        if(err != "(node:8428) UnhandledPromiseRejectionWarning: DiscordAPIError: Cannot send messages to this user")
                        message.reply(`:no_entry_sign: Пожалуйста, включите это для личных сообщений - Настройки пользователя-> Конфиденциальность и безопасность-> Разрешить личные сообщения от участников сервера. :no_entry_sign:`);
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
        }
        else {
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
                                if(err != "(node:8428) UnhandledPromiseRejectionWarning: DiscordAPIError: Cannot send messages to this user")
                                message.reply(`:no_entry_sign: Please turn on this for Private Messaging - User Settings->Privacy & Safety->Allow direct message from server member. :no_entry_sign:`);
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
        }
};  