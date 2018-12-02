const request = require('request');

var getForecast = (lat, lon, callback) => {
    request({
        url: `https://api.darksky.net/forecast/78de4c40a433dcef8701b952ff5e28ec/${lat},${lon}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Forecast.io server.');
        } else if (response.statusCode === 400) {
            callback(body.error);
        } else if (!error && response.statusCode == 200) {
                var summary = body.daily.summary;
                var temperature = body.currently.temperature;

                callback(undefined, {
                    summary: summary,
                    temperature: temperature
                });

        } else {
            callback('Unable to fetch weather.');
        }
    });
}

module.exports = {
    getForecast: getForecast
}
