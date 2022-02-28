const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Feeling lost ❓',
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		const help = new MessageEmbed()
			.setTitle('<:generalChat:934476109989425252>'+client.user.username+'Help Menu')
			.setColor('BLUE')
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setDescription('To see all my cmds press the buttons below')
			.setFields(
				{
					name: '❓ Info',
					value: `\`6 Information cmds\``,
					inline: true
				}, {
				name: '⚙ Utility',
				value: `\`1 Utility cmds\``,
				inline: true
			}, {
				name: '📝 Ticket',
				value: `\`3 Ticket cmds\``,
				inline: true
			}, {
				name: '🔨 Moderation',
				value: `\`10 Moderation cmds\``,
				inline: true
			}, {
				name: '🎵 Music',
				value: `\`10 Music cmds\``,
				inline: true
			}
			)
			.setTimestamp()
			.setFooter({ text: 'Thank you for choosing '+client.user.username })

		const embed1 = new MessageEmbed()
			.setTitle('Information Commands')
			.setDescription(`\`botinfo\`, \`help\`, \`links\`, \`status\`, \`serverinfo\`, \`userinfo\``)
			.setColor('2e3137')
			.setTimestamp()

		const embed2 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Utility Commands')
			.setDescription(`\`translate\`, \`suggest\`, \`giveaway\``)
			.setTimestamp()

		const embed4 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Ticket Commands')
			.setDescription(`\`ticket\`, \`ticketsetup\``)
			.setTimestamp()

		const embed5 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Moderation Commands')
			.setDescription(`\`ban\`, \`kick\`, \`unban\`, \`clear\`, \`lock\`, \`unlock\`, \`nickname\`, \`say\`, \`slowmode\``)
			.setTimestamp()

		const embed6 = new MessageEmbed()
			.setColor('2e3137')
			.setTitle('Music Commands')
			.setDescription(`\`music play\`,\`music settings \` `)
			.setTimestamp()

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('❓')
					.setCustomId('info'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('⚙')
					.setCustomId('utility'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('935077407554146345')
					.setCustomId('📝'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('🔨')
					.setCustomId('moderation'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('🎵')
					.setCustomId('music')


			)

		const row3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setEmoji('930143460277751808')
					.setURL('https://discord.com/api/oauth2/authorize?client_id=912773129183563776&permissions=1099917896758&scope=bot%20applications.commands')
					.setLabel('Invite '+client.user.username)
			)

		const row4 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('❓')
					.setCustomId('info'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('⚙')
					.setCustomId('utility'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('📝')
					.setCustomId('ticket'),

				new MessageButton()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('🔨')
					.setCustomId('moderation'),
				
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('🎵')
					.setCustomId('music')

			)

		const msg = interaction.reply({ embeds: [help], components: [row] })

		const collector = interaction.channel.createMessageComponentCollector({
			time: 1000 * 60
		});

		collector.on('collect', async interaction => {
			if (interaction.customId === 'info') {
				await interaction.reply({ embeds: [embed1], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'utility') {
				await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true })
			}  else if (interaction.customId === 'ticket') {
				await interaction.reply({ embeds: [embed4], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'moderation') {
				await interaction.reply({ embeds: [embed5], components: [row3], ephemeral: true })
			} else if (interaction.customId === 'music') {
				await interaction.reply({embeds: [embed6], components: [row3], ephemeral: true})
			}
		})

		collector.on('end', async () => {
			interaction.editReply({
				embeds: [help],
				components: [row4]
			})
		})
	}
}