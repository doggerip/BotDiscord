const { ClientVoiceManager } = require("discord.js");
const moment = require('moment');
const apiKey = '2307dae448684d268ef134320232306';
const location = 'Nantes';
require('moment/locale/fr'); // Importer la locale française
// Requête pour obtenir les informations météorologiques
const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=yes`;

fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    // Extraire les informations nécessaires de la réponse JSON
    const current = data.current;
    const forecast = data.forecast.forecastday[0];

    // Alertes
    const alerts = data.alerts;

    // Température
    const temperature = current.temp_c;

    // Vitesse du vent
    const windSpeed = current.wind_kph;

    //Ressentie
    const feelLike = current.feelslike_c;

    // Humidité
    const humidity = current.humidity;

    // Conditions météorologiques (ensoleillé, pluie, etc.)
    const condition = current.condition.text;

    // Précipitations
    const precipitation = current.precip_mm;

    // Pression barométrique
    const pressure = current.pressure_mb;

    // Tendance barométrique
    const pressureTrend = current.pressure_trend;

    // Direction du vent
    const windDirection = current.wind_dir;

    // Qualité de l'air
    const airQuality = current.air_quality;
    const airQualityDescription = airQuality['us-epa-index'] <= 2 ? 'Bonne' : 'Mauvaise';
    //lever du jour
    const sunrise = moment(current.sunrise).locale('fr').format('LT');

    //Couché du soleil
    const sunset = moment(current.sunset).locale('fr').format('LT');

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
