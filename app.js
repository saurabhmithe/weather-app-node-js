const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 4));

        weather.getForecast(results.lat, results.lon, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(weatherResults, undefined, 4));
            }
        });
    }
});

// url: 'https://api.darksky.net/forecast/78de4c40a433dcef8701b952ff5e28ec/37.330910,-121.904997'
