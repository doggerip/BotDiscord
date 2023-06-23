const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const today = moment(); 
const { getConditionEmoji } = require('./emojiConditions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meteo')
        .setDescription('Les meilleurs temps est à Nantes!')
        .addStringOption(option => option.setName('localisation').setDescription('La localisation est').setRequired(true))
        .addStringOption(option =>option.setName('jour').setDescription('météo de demain').setRequired(false)
        .addChoices(
            { name: "Aujourd'hui", value: '0' },
            { name: 'Demain', value: '1' },
            { name: 'Dans 2 jours', value: '2' },
            { name: 'Dans 3 jours', value: '3' }
        ))
        .addStringOption(option => option.setName('hour').setDescription('Heure').setRequired(false)
        .addChoices(
            { name: '0h', value: '0' },
            { name: '1h', value: '1' },
            { name: '2h', value: '2' },
            { name: '3h', value: '3' },
            { name: '4h', value: '4' },
            { name: '5h', value: '5' },
            { name: '6h', value: '6' },
            { name: '7h', value: '7' },
            { name: '8h', value: '8' },
            { name: '9h', value: '9' },
            { name: '10h', value: '10' },
            { name: '11h', value: '11' },
            { name: '12h', value: '12' },
            { name: '13h', value: '13' },
            { name: '14h', value: '14' },
            { name: '15h', value: '15' },
            { name: '16h', value: '16' },
            { name: '17h', value: '17' },
            { name: '18h', value: '18' },
            { name: '19h', value: '19' },
            { name: '20h', value: '20' },
            { name: '21h', value: '21' },
            { name: '22h', value: '22' },
            { name: '23h', value: '23' }
        )
    ),


    async execute(interaction) {
        const { options } = interaction;
        const location = options.getString('localisation');
        const hour = options.getString('hour');
        const jour = options.getString('jour');
        const apiKey = '2307dae448684d268ef134320232306';

        const dateFuture = today.add(jour, 'days').format('YYYY-MM-DD'); 
        let forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${jour}&aqi=yes&alerts=yes&lang=fr`;
        if (hour) {
            forecastUrl += `&hour=${hour}`;
        };
        if(jour) {
            forecastUrl +=`&dt=${dateFuture}`;

        }
        await interaction.reply({ content: `Chargement . . .` });

        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            const forecastAlert = data;
            const forecastDay = data.forecast.forecastday[0].day;
            const forecastAstro = data.forecast.forecastday[0].astro;
            const forecastHour = data.forecast.forecastday[0].hour[0];

            // Date de la météo
            const laDate = moment(forecastHour.time).locale('fr').format('LLLL').toString();
   
            // Température
            const temperature = forecastHour.temp_c;

            // Vitesse du vent
            const windSpeed = forecastHour.wind_kph;

            // Orientation du vent
            const windDirection = forecastHour.wind_dir;

            // Rafales de vent en km/h
            const windRafale = forecastHour.gust_kph;

            //Visibilté en km/h
            const visibilite = forecastHour.vis_km;

            //Point de rosée
            const pointderose = forecastHour.dewpoint_c

            //Risque de pluie en %
            const precipitationPluie  = forecastHour.chance_of_rain;

            //Risque de neige en %
            const precipitationNeige = forecastHour.chance_of_snow;

            //Risque de pluie boolean
            const risquedepluie = forecastHour.will_it_rain === 0 ? "Non" : "Oui"

            //Risque de neige boolean
            const risquedeneige = forecastHour.will_it_snow === 0 ? "Non" : "Oui"

            //Conditions météorologiques (ensoleillé, pluie, etc.)
            const condition = forecastHour.condition.text ;
            const conditionCode = forecastHour.condition.code;
            const conditionEmoji = getConditionEmoji(conditionCode)
            const conditionIcon = "http:"+forecastHour.condition.icon;
            // Pression barométrique
            const pressure = forecastHour.pressure_mb;

            //Indice UV
            const indiceUV = forecastHour.uv;
            let niveauUV;
            
            switch (true) {
                case indiceUV <= 2:
                    niveauUV = "Faible";
                    break;
                case indiceUV <= 5:
                    niveauUV = "Modéré";
                     break;
                case indiceUV <= 7:
                    niveauUV = "Élevé";
                    break;
                case indiceUV <= 10:
                     niveauUV = "Très élevé";
                    break;
                default:
                    niveauUV = "Extrême";
                    break;
            }


            // Qualité de l'air      
            const airQuality = forecastHour.air_quality;
            const airQualityDescription = airQuality['us-epa-index'] <= 2 ? 'Bonne' : 'Mauvaise';
            let airQualityEmoji = "";
            switch (airQuality["us-epa-index"]) {
            case 1:
                airQualityEmoji = "😊"; 
                break;
            case 2:
                airQualityEmoji = "🙂"; 
                break;
            case 3:
                airQualityEmoji = "😷"; // Mauvaise qualité de l'air
                break;
            default:
                airQualityEmoji = "❓"; // Valeur inconnue ou non définie
            }
            //Humidité moyenne 
            const humidite = forecastDay.avghumidity;
            const humiditeEmojis = {
                "0-24": "💧",
                "25-49": "💧💧",
                "50-74": "💧💧💧",
                "75-99": "💧💧💧💧",
                "100": "💧💧💧💧💧"
            };
            let humiditeEmoji = "❓";
            for (const range in humiditeEmojis) {
                const [min, max] = range.split("-");
                if (humidite >= min && humidite <= max) {
                    humiditeEmoji = humiditeEmojis[range];
                    break;
                }
            }


            //Phase de la lune
            const moonPhase = forecastAstro.moon_phase;
            const moonPhaseEmojis = {
                "New Moon": "🌑",
                "Waxing Crescent": "🌒",
                "First Quarter": "🌓",
                "Waxing Gibbous": "🌔",
                "Full Moon": "🌕",
                "Waning Gibbous": "🌖",
                "Last Quarter": "🌗",
                "Waning Crescent": "🌘"
            };
            
            const moonPhaseEmoji = moonPhaseEmojis[moonPhase];

            //Illumination de la lune
            const moonIllumination = forecastAstro.moon_illumination;
            let moonIlluminationEmoji = "❓";
            const moonIlluminationEmojis = {
                "0-9": "🌑",
                "10-19": "🌒",
                "20-29": "🌓",
                "30-39": "🌔",
                "40-49": "🌕",
                "50-59": "🌖",
                "60-69": "🌗",
                "70-79": "🌘",
                "80-89": "🌑",
                "90-100": "🌑"
            };
            
            for (const range in moonIlluminationEmojis) {
                const [min, max] = range.split("-");
                if (moonIllumination >= parseInt(min) && moonIllumination <= parseInt(max)) {
                    moonIlluminationEmoji = moonIlluminationEmojis[range];
                    break;
                }
            }
                
            // Lever du jour
            const sunrise = moment(forecastAstro.sunrise, 'hh:mm A').locale('fr').format('LT'); 

            // Couché du soleil
            const sunset = moment(forecastAstro.sunset, 'hh:mm A').locale('fr').format('LT');


            //Alerte
            const alert = forecastAlert.alert && forecastAlert.alert.alert && forecastAlert.alert.alert.length > 0?   forecastAlert.alert.alert:"Aucune alerte"
            




            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(`Météo de ${location} pour le ${laDate}`)
                .setThumbnail(conditionIcon)
                .addFields(
                    { name: 'Température', value: `${temperature} °C`},
                    { name: 'Vitesse du vent', value: `${windSpeed} km/h` },
                    { name: 'Orientation du vent', value: windDirection },
                    { name: 'Rafales de vent', value: `${windRafale} km/h` },
                    { name: 'Visibilité', value: `${visibilite} km` },
                    { name: 'Point de rosée', value: `${pointderose} °C` },
                    { name: 'Précipitations (pluie)', value: `${precipitationPluie}%` },
                    { name: 'Précipitations (neige)', value: `${precipitationNeige}%` },
                    { name: 'Risque de pluie', value: risquedepluie },
                    { name: 'Risque de neige', value: risquedeneige },
                    { name: 'Conditions météorologiques', value: `${condition} ${conditionEmoji}`  },
                    { name: 'Pression barométrique', value: `${pressure} mb` },
                    { name: 'Indice UV', value: `${indiceUV} (${niveauUV})` },
                    { name: 'Qualité de l\'air', value: `${airQualityDescription} ${airQualityEmoji}` },
                    { name: 'Humidité', value: `${humidite}% ${humiditeEmoji}` },
                    { name: 'Phase de la lune', value: `${moonPhase} ${moonPhaseEmoji}` },
                    { name: 'Illumination de la lune', value: `${moonIllumination}% ${moonIlluminationEmoji}` },
                    { name: 'Lever du jour', value: sunrise },
                    { name: 'Couché du soleil', value: sunset },
                    { name: 'Alertes', value: `${alert}` }
                );
               
            interaction.editReply({ content: '', embeds: [embed] })

        } catch (error) {
            console.log(`Une erreur s'est produite`, error);
            interaction.editReply({ content: `Une erreur s'est produite bordel, encore un coup des Manceaux  .` });
        }
    }
};
