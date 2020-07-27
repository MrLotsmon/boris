//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const main = new Module({
    "name": "Information", 
    "description": "Module for inforamtion commands"
});
//Commands
const help = new Command({
    "name": "help", 
    "description": "About the bot", 
    "file": "./cmds/main/help.js",
    "usage": "+help"
});
main.addCommand(help);
const buy = new Command({
    "name": "buy", 
    "description": "Buy cheat", 
    "file": "./cmds/main/buy.js",
    "usage": "+buy"
});
main.addCommand(buy);
