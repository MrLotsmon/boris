const discord = require("discord.js");
const bot = require(`${process.cwd()}/bot.js`);

module.exports.run = async message => {
    const args = message.content.split(" ");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        if(message.member.roles.find(rl => rl.name === 'RUS')){
            message.channel.send("У вас нет прав");
        } else message.channel.send("You have no rights");
        return;
    }
    let count = Number.parseInt(args[1]);
    let mes = "";
    message.channel
    .bulkDelete(count +1 )
    .then(() => {
        if(message.member.roles.find(rl => rl.name === 'RUS')){
            mes = `:wastebasket: Удалено ${count} сообщений`;
        } else mes = `:wastebasket: Deleted ${count} messages`;
        message.channel.send(mes).then(msg => msg.delete(5*1000));
    })
    .catch((err) => {
        if(err == "DiscordAPIError: You can only bulk delete messages that are under 14 days old."){
            if(message.member.roles.find(rl => rl.name === 'RUS')){
                mes = "Вы можете массово удалять только сообщения которым меньше 14 дней.";
            } else mes = "You can only bulk delete messages that are under 14 days old.";
            message.channel.send(mes).then(msg => msg.delete(5*1000))
        }
        console.log(err);
    });
};
