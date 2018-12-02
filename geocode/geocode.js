const request = require('request');

var geocodeAddress = (address, callback) => {
    var formattedAddress = encodeURIComponent(address.trim());

    request({
        url: `http://dev.virtualearth.net/REST/v1/Locations?q=${formattedAddress}&key=AvUg7T5TTyuHWQvN81XnrK_V5Ajuyd_BSzvD6e137SsK704drtRzDdQ1yiIXWOj5`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to the server.');
        } else if (body.resourceSets[0].resources.length === 0) {
            callback('Invalid address.');
        } else if (response.statusCode == 200) {
                var name = body.resourceSets[0].resources[0].name;
                var lat = body.resourceSets[0].resources[0].point.coordinates[0];
                var lon = body.resourceSets[0].resources[0].point.coordinates[1];

                callback(undefined, {
                    name: name,
                    lat: lat,
                    lon: lon
                });

        } else {
            callback('Something went wrong.');
        }
    });
}

module.exports = {
    geocodeAddress: geocodeAddress
}
