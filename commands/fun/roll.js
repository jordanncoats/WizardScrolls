const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Replies with your roll!')
    .addStringOption(option =>
      option.setName('dice')
        .setDescription('#d# format')
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString('dice');
    const [amount, sides] = input.split('d').map(Number);

    if (isNaN(amount) || isNaN(sides) || !Number.isInteger(amount) || !Number.isInteger(sides) || amount < 1 || sides < 2 || amount > 25 || sides > 100) {
      await interaction.reply('Invalid input. Use #d# format with positive integers between 1 and 25 for amount and between 2 and 100 for sides.');
      return;
    }

    const results = Array.from({ length: amount }, () => Math.floor(Math.random() * sides) + 1);
    const total = results.reduce((acc, val) => acc + val, 0);

    await interaction.reply(`You rolled **${input}**: **(${results.join(')**, **(')})** for a total of **${total}**.`);
  },
};
