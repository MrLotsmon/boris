//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const main = new Module({
    "name": "Information", 
    "description": "Module for inforamtion commands",
    "rusdescription": "Модуль с информацией о командах",
});
//Commands
const help = new Command({
    "name": "help", 
    "description": "Showing Boris's command list",
    "rusdescription": "Показывает список команд BORIS", 
    "file": "./cmds/main/help.js",
    "usage": "+help"
});
main.addCommand(help);
