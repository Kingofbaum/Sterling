const { CommandInteraction , MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/LockDown");

module.exports = {
    name: "unlock",
    description: "Lift a lockdownf from a channel",
    permission: "MANAGE_CHANNELS",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, channel } = interaction;

        const Embed = new MessageEmbed();

        if(channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
        return interaction.reply({
            embeds: [
                Embed.setColor("RED").setDescription(
                    "❌ | This chnnael is not lcoked"
                ),
            ],
            ephemeral: true,
        });

        channel.permissionOverwrites.edit(guild.id, {
            SEND_MESSAGES: null,
        });

        await DB.deleteOne({ ChannelID: channel.id });

        interaction.reply({embeds: [Embed.setColor("GREEN").setDescription(
            "🔓 | Lockdown has been lifted."
            ),
        ]
    });
    }
}