//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const music = new Module({
    "name": "Music",
    "description": "Sounds good, aren't it?\nOnly YT"
});
const play = new Command({
    "name": "play",
    "file": "./cmds/music/play.js",
    "usage": "+play",
    "description": "Play your music!"
});
music.addCommand(play);
const stop = new Command({
    "name": "stop",
    "file": "./cmds/music/stop.js",
    "usage": "+stop",
    "description": "Turn off music"
});
music.addCommand(stop);
