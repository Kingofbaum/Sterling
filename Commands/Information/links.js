const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "links",
    description: "Useful links.",
    /**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
    async execute(interaction, client){
        const linksEmbed = new MessageEmbed()
        .setTitle("Useful Links")
        .addField("Vote", "https://top.gg/bot/810972148709457931/vote", true)
        .addField("Invite", "https://top.gg/bot/810972148709457931/invite", true)
        .addField("Support Server", "https://discord.gg/tDbZu7qkQQ", true)

        interaction.reply({embeds: [linksEmbed]})
    }
}