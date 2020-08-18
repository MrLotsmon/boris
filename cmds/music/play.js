const ytdl = require('ytdl-core')
const searchYoutube = require('yt-search');
const discord = require('discord.js');
const queue = new Map();
exports.play = play;
exports.skip = skip;
exports.queue = queue;
let dispatcher, connect;
let guild_queue;
let msg;

module.exports.run = async message => {
    const s = message.content.split(" ");
    let song = s[1], voice = message.member.voiceChannel, url

    if (!song) return message.channel.send('Provide a link to the track')
    if (!voice) return message.channel.send('Join the voice channel')
    connection = await voice.join()
    guild_queue = queue.get(message.guild.id)
    if (!guild_queue) guild_queue = queue.set(message.guild.id, {songs: []}).get(message.guild.id)
    msg = message;

    let valid = ytdl.validateURL(song)
    if (!valid) {
        var args = message.content.slice(process.env.prefix.length).trim().split(" ");
        args.splice(0, 1);
        var mesg = args.join(" ");
        searchYoutube(mesg, function ( err, r ) {
            if(!err)
            {
                url = r.videos[0].videoId;
                console.log(mesg+' '+url);
                ytdl.getInfo(`${url}`,{range: {start: 0, end: 1}}, (err, info) => {
                    if(err) console.log(err);
                    if (!err) {
                        if(info.videoDetails.isLiveContent) return message.channel.send('Broadcasts not supported')
                        let songtittle = info.title;
                        url = info.video_url;
                        var dur = info.videoDetails.lengthSeconds, imgurl = info.videoDetails.thumbnail.thumbnails[0].url;
                        guild_queue.songs.push({url: url, title: info.title, requester: message.author.username, songduration: getTime(dur), preview: imgurl})
                        let embed = new discord.RichEmbed()
                        .setTitle(info.title)
                        .setURL(url)
                        .setAuthor('Added to queue', message.member.user.avatarURL)
                        .addField('Channel', message.channel.name, true)
                        .addField('Song Duration', getTime(dur), true)
                        .setThumbnail(imgurl)
                        .setColor(0x252525)
                        message.channel.send(embed)
                        console.log(guild_queue.songs);
                        if (guild_queue.songs.length < 2) play(guild_queue.songs)
                    }
                });
            }
          })
    }
    else{
        url = song;
        ytdl.getInfo(`${url}`, (err, info) => {
            if(err) console.log(err);
            if (!err) {
                if(info.videoDetails.isLiveContent) return message.channel.send('Broadcasts not supported')
                let songtittle = info.title;
                url = info.video_url;
                var dur = info.videoDetails.lengthSeconds, imgurl = info.videoDetails.thumbnail.thumbnails[0].url;
                guild_queue.songs.push({url: url, title: info.title, requester: message.author.username, songduration: getTime(dur), preview: imgurl})
                let embed = new discord.RichEmbed()
                .setTitle(info.title)
                .setURL(url)
                .setAuthor('Added to queue', message.member.user.avatarURL)
                .addField('Channel', message.channel.name, true)
                .addField('Song Duration', getTime(dur), true)
                .setThumbnail(imgurl)
                .setColor(0x252525)
                message.channel.send(embed)
                console.log(guild_queue.songs);
                if (guild_queue.songs.length < 2) play(guild_queue.songs)
            }
        });
    }
}

function getTime(timeInSeconds){
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);
    if(hours <= 0) return pad(minutes, 2) + ':' + pad(seconds, 2);
    else return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

async function play(songs) {
    let music = await ytdl(songs[0].url, {filter: 'audioonly'})

    dispatcher = connection.playStream(music, {volume: 0.3, passes: 5})
    dispatcher.setBitrate(320);
    dispatcher.on('end', () => {
        songs.shift()
        if (songs.length > 0) play(songs)
        else {
            if(msg.member.roles.find(rl => rl.name === 'RUS')){
                msg.channel.send('Очередь пуста')
            }else{
                msg.channel.send('Queue is empty')
            }
            connection.disconnect();
        }
    });
}

function skip(songs) {
    if (songs.length > 1){
        if(msg.member.roles.find(rl => rl.name === 'RUS')){
            msg.channel.send('Пропущено.')
        }else{
            msg.channel.send('Skipped.')
        }
        dispatcher.end();
    }
}