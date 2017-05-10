import fetch from './helpers/fetch';

const { WEATHER_API_KEY } = process.env;

export default function getSanFranciscoWeather() {
  // https://mixpanel.com/help/reference/jql/api-reference
  return fetch.get(`http://api.openweathermap.org/data/2.5/weather?zip=94103,US&appid=${WEATHER_API_KEY}`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

getSanFranciscoWeather();