const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Userinfo",
    options: [
        {
            name: "target", 
            description: "Select a target.",
            type: "USER",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
        const { options } = interaction;
        const target = options.getMember("target")

        const Response = new MessageEmbed()
            .setColor("AQUA")
            .setThumbnail(target.user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .addField("ID", `${target.user.id}`, true)
            .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
            .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
            .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

            .addField("Avatar", `[\`Link to avatar\`](${target.user.displayAvatarURL({dynamic:true, size: 512})})`,true)
            .setTimestamp()

            interaction.reply({embeds: [Response]})

    }
}