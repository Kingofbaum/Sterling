const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/TicketSetup")

module.exports = {
    name: "ticketsetup",
    description: "Setup your ticketing message.",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: "channel",
            description: "Select the ticket creation channel.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
        },
        {
            name: "category",
            description: "Select the ticket channel's creation category.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_CATEGORY"],
        },
        {
            name: "transcripts",
            description: "Select the transcripts channel.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
        },
        {
            name: "handlers",
            description: "Select the ticket handler's role.",
            required: true,
            type: "ROLE",
        },
        {
            name: "description",
            description: "Set the description of the ticket creation channel.",
            required: true,
            type: "STRING",
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");
            const Category = options.getChannel("category");
            const Transcripts = options.getChannel("transcripts");
            const Handlers = options.getRole("handlers");
            const Everyone = guild.id;

            const Description = options.getString("description");

            await DB.findOneAndUpdate(
                {GuildID: guild.id},
                {
                    Channel: Channel.id,
                    Category: Category.id,
                    Transcripts: Transcripts.id,
                    Handlers: Handlers.id,
                    Everyone: Everyone,
                    Description: Description
                },
                {
                    new: true,
                    upsert: true,
                }
            );
            const Embed = new MessageEmbed()
            .setAuthor({
                name: guild.name + " | Ticketing System",
                iconURL: guild.iconURL({dynamic: true, size: 512})
            })
            .setDescription(Description)
            .setColor("#36393f");
    
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("player")
                .setLabel("Player Report")
                .setStyle("PRIMARY")
                .setEmoji("🎟"),
                new MessageButton()
                .setCustomId("bug")
                .setLabel("Bug Report")
                .setStyle("SECONDARY")
                .setEmoji("🐞"),
                new MessageButton()
                .setCustomId("other")
                .setLabel("Other Report")
                .setStyle("SECONDARY")
                .setEmoji("🙍‍♀️"),
            );
    
            await guild.channels.cache
            .get(Channel.id)
            .send({embeds: [Embed], components: [Buttons] });
    
            interaction.reply({ content: "Done", ephemeral: true });
        } catch (err) {
            const errEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ | An error occured while setting up your ticket system.`);
            console.log(err);
            interaction.reply({embeds: [errEmbed]});
        }
    },
};