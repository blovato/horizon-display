import { Meteor } from 'meteor/meteor';
import fetch from './helpers/fetch';

const { WEATHER_API_KEY } = process.env;
if (!WEATHER_API_KEY && Meteor.isServer) console.error('Missing required WEATHER_API_KEY');
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

Meteor.methods({
  'weather.getSanFrancisco'() {
    if (Meteor.isServer) {
      return fetch.get(`${baseUrl}?zip=94103,US&appid=${WEATHER_API_KEY}`);
    }
  },
});
