//Basic classes
const {Command} = require(`${process.cwd()}/classes/Command.js`);
const {Module} = require(`${process.cwd()}/classes/Module.js`);
const bot = require(`${process.cwd()}/bot.js`);
//Creating module
const music = new Module({
    "name": "Music",
    "description": "Sounds good, aren't it?\n  Only YouTube",
    "rusdescription": "Звучит хорошо, правда?\n  Только YouTube"
});
const play = new Command({
    "name": "play",
    "file": "./cmds/music/play.js",
    "usage": "+play <song-url\title>",
    "description": "Playing your music.",
    "rusdescription": "Воспроизведение вашего трека."
});
music.addCommand(play);
const skip = new Command({
    "name": "skip",
    "file": "./cmds/music/skip.js",
    "usage": "+skip",
    "description": "Skip track.",
    "rusdescription": "Пропустить трек."
});
music.addCommand(skip);
const queue = new Command({
    "name": "queue",
    "file": "./cmds/music/queue.js",
    "usage": "+queue",
    "description": "Display queue list.",
    "rusdescription": "Показать список очереди."
});
music.addCommand(queue);
