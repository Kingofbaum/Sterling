const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Gives you more Information about the bot.",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const BotInfoEmbed = new MessageEmbed()
        .setTitle(client.user.username)
        .setDescription(client.user.username+" is a bot for moderation, music and general managment.", true)
        .addField("ID", client.user.id, true)
        .addField("Username", client.user.tag, true)
        .addField("Prefix", "/", true)
        .addField("Tags", "Moderation, Music, Managment", true)
        .addField("<:Developer:934471183594815529> Owner", "Kingofbaum#0588", true)
        .addField("<:Developer:934471183594815529> Contributer", "T-Nation#8338", true)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512}))

        interaction.reply({embeds: [BotInfoEmbed]})
    }
}