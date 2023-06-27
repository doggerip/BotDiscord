const { SlashCommandBuilder } = require('@discordjs/builders')
const { quizDataFile } = require('../../config.json')

const quizData = require(`../${quizDataFile}`)
module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Lance le quiz.')
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('Selectionner une catégorie')
        .setRequired(true)
        .addChoices(
          { name: 'Insolite', value: 'Insolite' },
          { name: 'Developpement', value: 'Developpement' },
          { name: 'Nourriture', value: 'Nourriture' }
        )
    ),

  async execute (interaction) {
    const selectedCategory = interaction.options.getString('category')
    const questions = quizData.questions[selectedCategory]
    if (questions && questions.length > 0) {
      let score = 0
      let currentQuestionIndex = 0
      const responses = []
      // Déférer la réponse initiale
      await interaction.deferReply()
      while (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex]
        await interaction.editReply({
          content: question.question,
          components: [
            {
              type: 1,
              components: question.options.map((option, index) => ({
                type: 2,
                label: option,
                style: 1,
                custom_id: `option_${index}`
              }))
            }
          ]
        })

        // Attente de la réponse de l'utilisateur
        const userAnswer = await interaction.channel.awaitMessageComponent({
          filter: (interaction) =>
            interaction.user.id &&
            interaction.isButton() &&
            question.options.some(
              (option, index) =>
                index === parseInt(interaction.customId.split('_')[1])
            ),
          time: 30000
        })
        const selectedOption =
          question.options[userAnswer.customId.split('_')[1]]
        if (selectedOption && userAnswer) {
          score++
          responses.push('Bonne réponse !')
        } else {
          responses.push('Mauvaise réponse.')
        }
        currentQuestionIndex++
      }

      await interaction.followUp(
        `Quiz terminé. Votre score : ${score}/${questions.length}`
      )
    } else {
      await interaction.followUp(
        'Aucune question disponible pour cette catégorie.'
      )
    }
  }
}
// fs.writeFileSync(scoreDataFile, JSON.stringify(scoreData, null, 2));
