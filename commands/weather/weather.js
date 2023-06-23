const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('meteo')
		.setDescription('Les meilleurs temps est à Nantes!')
        .addStringOption(option => option.setName('location').setDescription('La localisation est').setRequired(true)),
        async execute(interaction) {
        const { options } = interaction;
        const localisation = options.getString('location');

        await interaction.reply({ content : `<a:Vous pouvez rager mais je charge:1087045463980658751>`});

        await weather.find( { search: `${localisation}`}, async function(err, result){
            setTimeout(() => {
                if(err){
                    console.log(err);
                    interaction.editReply({content: `${err} |  because il y a une erreur`})
                } else {
                    if(result.length == 0){
                        return interaction.editReply({content: `pas de météo pour Le Mans ou pour ${localisation}`});
                    }
                else {
                    const temp = result[0].current.temperature;
                    const type = result[0].current.skytext;
                    const name = result[0].location.name;
                    const feel = result[0].current.feelslike;
                    const icon = result[0].current.imageUrl;
                    const wind = result[0].current.winddisplay;
                    const day = result[0].current.day;
                    const alert = result[0].location.alert ||'none'; 

                    const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`Météo pour ${name}`)
                    .addFields({name: 'Temperature', value: `${temp}`})
                    .addFields({name: 'Ressenti', value: `${feel}`})
                    .addFields({name: 'Temps', value: `${type}`})
                    .addFields({name: 'Alerte', value: `${alert}`})
                    .addFields({name: `Aujourd'hui nous sommes`, value: `${day}`})
                    .addFields({name: 'Vitesse du vent et direction', value: `${wind}`})
                    .setThumbnail(icon)

                    interaction.editReply({content:``, embeds: [embed]});

                }
                }
            }, 2000)
        })

         }

};