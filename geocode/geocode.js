const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        var formattedAddress = encodeURIComponent(address.trim());

        request({
            url: `http://dev.virtualearth.net/REST/v1/Locations?q=${formattedAddress}&key=AvUg7T5TTyuHWQvN81XnrK_V5Ajuyd_BSzvD6e137SsK704drtRzDdQ1yiIXWOj5`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to the server.');
            } else if (body.resourceSets[0].resources.length === 0) {
                reject('Invalid address.');
            } else if (response.statusCode == 200) {
                    var name = body.resourceSets[0].resources[0].name;
                    var lat = body.resourceSets[0].resources[0].point.coordinates[0];
                    var lon = body.resourceSets[0].resources[0].point.coordinates[1];

                    resolve({
                        name: name,
                        lat: lat,
                        lon: lon
                    });

            } else {
                reject('Something went wrong.');
            }
        });
    });
}

module.exports = {
    geocodeAddress: geocodeAddress
}
