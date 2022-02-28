const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Create a suggestion in an organized matter.",
    options: [
        {
            name: "type",
            description: "Select the type.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Discord",
                    value: "Discord"
                },
                {
                    name: "Community",
                    value: "Community"
                },
                {
                    name: "Staff Team",
                    value: "Staff Team"
                },
                {
                    name: "Other",
                    value: "Other"
                },
            ]
        },
        {
            name: "name",
            description: "Provide a name for your suggestion.",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "Describe the functionality of this suggestion",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`${interaction.member} has suggested a ${type}`)
        .addField("Name", `${name}`, true)
        .addField("Functionality", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("✔")
        message.react("❌")
    }
}