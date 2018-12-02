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
var formattedAddress = encodeURIComponent(address.trim());
var geocodeUrl = `http://dev.virtualearth.net/REST/v1/Locations?q=${formattedAddress}&key=AvUg7T5TTyuHWQvN81XnrK_V5Ajuyd_BSzvD6e137SsK704drtRzDdQ1yiIXWOj5`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.resourceSets[0].resources.length === 0) {
        throw new Error('Invalid address.');
    }
    var name = response.data.resourceSets[0].resources[0].name;
    var lat = response.data.resourceSets[0].resources[0].point.coordinates[0];
    var lon = response.data.resourceSets[0].resources[0].point.coordinates[1];
    console.log(name);
    console.log(lat);
    console.log(lon);

    var weatherUrl = `https://api.darksky.net/forecast/78de4c40a433dcef8701b952ff5e28ec/${lat},${lon}`;
    return axios.get(weatherUrl);
}).then((response) => {
    if (response.data.statusCode === 400) {
        throw new Error('Unable to fetch weather.');
    }
    var summary = response.data.daily.summary;
    var temperature = response.data.currently.temperature;
    console.log(summary);
    console.log(`Current temperature: ${temperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
