//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const moderator = new Module({
    "name": "Moderator",
    "description": "Cool commands for moderation!"
});
//Commands
const clear = new Command({
    "name":"clear",
    "description": "Clears a lot of messages",
    "file": "./cmds/moder/clear.js",
    "usage": "+clear <messages>"
});
moderator.addCommand(clear);
const mute = new Command({
    "name":"mute",
    "description": "Mute user",
    "file": "./cmds/moder/mute.js",
    "usage": "+mute <user> <minutes> <reason>"
});
moderator.addCommand(mute);
