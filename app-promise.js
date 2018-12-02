const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const axios = require('axios');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).
help().
argv;

var address = argv.a;
var lat, lon;

geocode.geocodeAddress(address).then((results) => {
    console.log(JSON.stringify(results, undefined, 4));
    return weather.getForecast(results.lat, results.lon);
}).then((weatherResults) => {
    console.log(JSON.stringify(weatherResults, undefined, 4));
}).catch((errorMessage) => {
    console.log(errorMessage);
});
