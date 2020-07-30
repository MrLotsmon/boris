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
                ytdl.getInfo(`${url}`, (err, info) => {
                    if(err) console.log(err);
                    if (!err) {
                        if(info.videoDetails.isLiveContent) return message.channel.send('Broadcasts not supported')
                        let songtittle = info.title;
                        url = info.video_url;
                        var dur = info.videoDetails.lengthSeconds, minutes = Math.floor(dur / 60), seconds = dur - minutes * 60, time = `${minutes}:${seconds}`, imgurl = info.videoDetails.thumbnail.thumbnails[0].url;
                        guild_queue.songs.push({url: url, title: info.title, requester: message.author.username, songduration: time, preview: imgurl})
                        let embed = new discord.RichEmbed()
                        .setTitle(info.title)
                        .setURL(url)
                        .setAuthor('Added to queue', message.member.user.avatarURL)
                        .addField('Channel', message.channel.name, true)
                        .addField('Song Duration', time, true)
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
            if (!err) {
                if(info.videoDetails.isLiveContent) return message.channel.send('Broadcasts not supported')
                let songtittle = info.title;
                url = info.video_url;
                var dur = info.videoDetails.lengthSeconds, minutes = Math.floor(dur / 60), seconds = dur - minutes * 60, time = `${minutes}:${seconds}`, imgurl = info.videoDetails.thumbnail.thumbnails[0].url;
                guild_queue.songs.push({url: url, title: info.title, requester: message.author.username, songduration: time, preview: imgurl})
                let embed = new discord.RichEmbed()
                .setTitle(info.title)
                .setURL(url)
                .setAuthor('Added to queue', message.member.user.avatarURL)
                .addField('Channel', message.channel.name, true)
                .addField('Song Duration', time, true)
                .setThumbnail(imgurl)
                .setColor(0x252525)
                message.channel.send(embed)
                console.log(guild_queue.songs);
                if (guild_queue.songs.length < 2) play(guild_queue.songs)
            }
        });
    }
}

async function play(songs) {
    let music = await ytdl(songs[0].url, {filter: 'audioonly'})

    dispatcher = connection.playStream(music, {volume: 0.3, passes: 5})
    dispatcher.setBitrate(128);
    dispatcher.on('end', () => {
        songs.shift()
        if (songs.length > 0) play(songs)
        else {
            let embed = new discord.RichEmbed()
            .setAuthor('Queue is empty', msg.client.user.avatarURL)
            msg.channel.send(embed)
            connection.disconnect();
        }
    });
    /*
    dispatcher.on('start', () =>{
        let embed = new discord.RichEmbed()
        .setTitle(songs[0].title)
        .setURL(songs[0].url)
        .setAuthor('Now Playing')
        .addField('Song Duration', songs[0].songduration, true)
        .setThumbnail(songs[0].imgurl)
        .setColor(0x252525)
        msg.channel.send(embed)
    }); process.env
    */
}

function skip(songs) {
    if (songs.length > 1){
        dispatcher.end();
    }
}
