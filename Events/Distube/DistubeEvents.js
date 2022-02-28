const client = require("../../Structures/index");
const { MessageEmbed } = require("discord.js");

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds:[new MessageEmbed()
        .setTitle("Playing " + song.name)
        .setURL(song.url)
        .addField("Duration", `\`${song.formattedDuration}\``)
        .setColor("GREEN")
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        .addField("QueueStatus", status(queue))
    ]}
    ))

    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setTitle("Added " + song.name)
        .setURL(song.url)
        .addField("Duration", `\`${song.formattedDuration}\``)
        .setColor("GREEN")
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        .addField(`${queue.songs.length} Songs in the Queue`, `Duration: ${queue.formattedDuration}`)
    ]}
    ))

    .on("playList", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setTitle("Playing " + song.name)
        .setURL(playlist.url)
        .addField("Duration", `\`${song.formattedDuration}\``)
        .setColor("GREEN")
        .setFooter(`Requested by: ${playlist.user.tag}`, playlist.user.displayAvatarURL({dynamic: true}))
        .addField(`${queue.songs.length} Songs in the Queue`, `Duration: ${queue.formattedDuration}`)
    ]}
    ))
    
    .on("addList", (queue, playlist, song) => queue.textChannel.send({embeds: [new MessageEmbed()
        .setTitle("Added " + playlist.name)
        .setURL(playlist.url)
        .addField("Duration", `\`${playlist.formattedDuration}\``)
        .setColor("GREEN")
        .setFooter(`Requested by: ${playlist.user.tag}`, playlist.user.displayAvatarURL({dynamic: true}))
        .addField(`${queue.songs.length} Songs in the Queue`, `Duration: ${queue.formattedDuration}`)
    ]}
    ))

    .on("error", (channel, e) => {
        console.error("❌ ERROR | " + e)
        channel.send("❌ ERROR | " + e)
    });