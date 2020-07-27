//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const music = new Module({
    "name": "Music",
    "description": "Sounds good, aren't it?\nOnly radio supported, because YT sucks"
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
const connect = new Command({
    "name": "connect",
    "file": "./cmds/music/connect.js",
    "usage": "+connect",
    "description": "Connect voice channel"
});
music.addCommand(connect);
const disconnect = new Command({
    "name": "disconnect",
    "file": "./cmds/music/disconnect.js",
    "usage": "+disconnect",
    "description": "Disconnect voice channel"
});
music.addCommand(disconnect);
