const { ClientVoiceManager } = require("discord.js");
const moment = require('moment');
const apiKey = '2307dae448684d268ef134320232306';
const location = 'Nantes';
require('moment/locale/fr'); // Importer la locale française
// Requête pour obtenir les informations météorologiques
const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&dt=2023-06-24&q=${location}&days=1&aqi=yes&alerts=yes`;
http://api.weatherapi.com/v1/forecast.json?key={2307dae448684d268ef134320232306}&q={Nantes}&days=1&aqi=yes&alerts=yes
fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    // Extraire les informations nécessaires de la réponse JSON
    const forecast = data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0 ? data.forecast.forecastday[0] : null;
    console.log(forecast)
    console.log("dateeee",data.location.localtime)
    // Alertes
    const alerts = data.alerts;
  // Date de la météo
  const laDate = moment(forecast.date).locale('fr').format('LLLL').toString();
  // Température
  const temperature = forecast.temp_c;

  // Température maximum
  const temperatureMax = forecast.maxtemp_c;

  // Température minimum
  const temperatureMin = forecast.mintemp_c;

  // Moyenne de temperature
  const temperatureMoy = forecast.avgtemp_c;

  // Vitesse du vent
  const windSpeed = forecast.maxwind_mph;

  //Visibilté moyenne en km
  const visibilite = forecast.avgvis_km;

  //Humidité moyenne 
  const humidite = forecast.avghumidity;
  const humiditeEmojis = {
      "0": "💧",
      "25": "💧💧",
      "50": "💧💧💧",
      "75": "💧💧💧💧",
      "100": "💧💧💧💧💧"
    };
  const humiditeEmoji = humiditeEmojis[humidite];

  //Précipitation pluie en mm
  const precipitationPluie = forecast.totalprecip_mm;

  //Précipitation neige en cm
  const precipitationNeige = forecast.day.totalsnow_cm;
  console.log(precipitationNeige)
  //Risque de pluie
  const risquedepluie = forecast.daily_chance_of_rain && forecast.daily_chance_of_rain == 0 ? "Non" : "Oui"

  //Risque de neige
  const risquedeneige = forecast.day.daily_chance_of_snow && forecast.daily_chance_of_snow == 0 ? "Non" : "Oui"
  console.log(risquedeneige)

  //Conditions météorologiques (ensoleillé, pluie, etc.)
  const condition = forecast.day.condition ;
console.log(condition.text)
  const conditionIcon = "http:"+forecast.day.condition.icon;

  //Indice UV
  const indiceUV = forecast.uv;
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
  //Phase de la lune
  const moonPhase = forecast.moon_phase;
  const moonPhaseEmojis = {
      "New Moon": "🌑",
      "First Quarter": "🌓",
      "Full Moon": "🌕",
      "Last Quarter": "🌗"
    };
  const moonPhaseEmoji = moonPhaseEmojis[moonPhase];

  //Illumination de la lune
  const moonIlluminationEmojis = {
      "0": "🌑",
      "10": "🌒",
      "20": "🌓",
      "30": "🌔",
      "40": "🌕",
      "50": "🌖",
      "60": "🌗",
      "70": "🌘",
      "80": "🌑",
      "90": "🌑",
      "100": "🌑"
    };
    const moonIllumination = forecast.moon_illumination;
    const moonIlluminationEmoji = moonIlluminationEmojis[moonIllumination];
  // Pression barométrique
  const pressure = forecast.pressure_mb;

  // Direction du vent
  const windDirection = forecast.wind_dir;

  // Qualité de l'air
  const airQuality = forecast.air_quality;
  const airQualityDescription = airQuality['us-epa-index'] <= 2 ? 'Bonne' : 'Mauvaise';

  // Lever du jour
  const sunrise = moment(forecast.astro.sunrise, 'hh:mm A').locale('fr').format('LT'); 

  // Couché du soleil
  const sunset = moment(forecast.astro.sunset, 'hh:mm A').locale('fr').format('LT');


    console.log("jour",data.forecast.forecastday)
    // Affichage des informations
    console.log('Alertes:', alerts);
    console.log('Température:', temperature,"°C");
    console.log('Vitesse du vent:', windSpeed,"Km/h");
    console.log('Ressentie', feelLike)
    console.log('Lever du jour', sunrise);
    console.log('coucher du soleil', sunset)
    console.log('Humidité:', humidity,"%");
    console.log('Conditions météorologiques:', condition);
    console.log('Précipitations:', precipitation,"cm");
    console.log('Pression barométrique:', pressure);
    console.log('Tendance barométrique:', pressureTrend);
    console.log('Direction du vent:', windDirection);
    console.log('Qualité de l\'air:', airQualityDescription);
    console.log('Qualité de l\'air:', airQuality);
    


    // Données spécifiques de l'heure à venir
    const nextHour = forecast.hour[17];

    // Affichage des informations de l'heure à venir
    console.log('Prévision pour l\'heure à venir :');
    console.log('Heure :', moment(nextHour.time).locale('fr').format('HH:mm'));
    console.log('Température :', nextHour.temp_c, '°C');
    console.log('Condition :', nextHour.condition.text);
    console.log('Icône :', nextHour.condition.icon);
    console.log('Vent :', nextHour.wind_kph, 'km/h');
    console.log('Humidité :', nextHour.humidity, '%');
    console.log('Précipitations de pluie :', nextHour.will_it_rain);
    console.log('Probabilité de pluie :', nextHour.chance_of_rain, '%');
    console.log('Précipitations de neige :', nextHour.will_it_snow);
    console.log('Probabilité de neige :', nextHour.chance_of_snow, '%');


  })
  .catch(error => {
    console.log('Une erreur s\'est produite:', error);
  });
