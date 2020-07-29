const ytdl = require('ytdl-core')
const searchYoutube = require('yt-search');
const { commands } = require('../../bot');
const queue = new Map();

module.exports.run = async message => {
    const s = message.content.split(" ");
    let song = s[1], voice = message.member.voiceChannel, url

    if (!song) return message.channel.send('Provide a link to the track')
    if (!voice) return message.channel.send('Join the voice channel')

    let connection = await voice.join()
    let guild_queue = queue.get(message.guild.id)
    if (!guild_queue) guild_queue = queue.set(message.guild.id, {songs: []}).get(message.guild.id)

    let valid = ytdl.validateURL(song)
    if (!valid) {
        var args = message.content.slice(process.env.prefix.length).trim().split(" ");
        args.splice(0, 1);
        var mesg = args.join(" ");
        /*
        var options = {
            q: mesg,
            part: 'snippet',
            type: 'video'
        };
        console.log(options);
        */
        console.log(mesg);
        searchYoutube(mesg, function ( err, r ) {
            if(!err)
            {
                url = r.videos[0].videoId;
                console.log(url);
                ytdl.getInfo(`${url}`, (err, info) => {
                    if(err) console.log(err);
                    if (!err) {
                        let songtittle = info.title;
                        guild_queue.songs.push(url)
                        message.channel.send("Track added to queue ```"+songtittle+"```")
                        if (guild_queue.songs.length < 2) play(connection, guild_queue.songs)
                    }
                });
            }
          } )
        /*
        searchYoutube('AIzaSyCtG_oxN7C94nbyOPoZalmTt6tbJd-IVj4', options, function(err, result){
            console.log(err);
            console.log(result);
            if (err) {
                console.log(err);
            } else {
                url = result.items[0].id.videoId;
                ytdl.getInfo(url, (err, info) => {
                    if (!err) {
                        let songtittle = info.title;
                        guild_queue.songs.push(url)
                        message.channel.send("Track added to queue ```"+songtittle+"```")
                        if (guild_queue.songs.length < 2) play(connection, guild_queue.songs)
                    }
                });
            }
        });
        */
    }
    else{
        url = song;
        ytdl.getInfo(`${url}`, (err, info) => {
            if(err) console.log(err);
            if (!err) {
                let songtittle = info.title;
                guild_queue.songs.push(url)
                message.channel.send("Track added to queue ```"+songtittle+"```")
                if (guild_queue.songs.length < 2) play(connection, guild_queue.songs)
            }
        });
    }
}

async function play(connection, songs) {
    let music = await ytdl(songs[0], {filter: 'audioonly'})

    connection.playStream(music, {volume: 0.5})
    .on('end', () => {
        songs.shift()
        if (songs.length > 0) play(connection, songs)
        else connection.disconnect()
    })
}