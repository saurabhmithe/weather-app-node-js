const request = require('request');

var geocodeAddress = (address) => {
    var formattedAddress = encodeURIComponent(address.trim());

    request({
        url: `http://dev.virtualearth.net/REST/v1/Locations?q=${formattedAddress}&key=AvUg7T5TTyuHWQvN81XnrK_V5Ajuyd_BSzvD6e137SsK704drtRzDdQ1yiIXWOj5`,
        json: true
    }, (error, response, body) => {
        if(error) {
            console.log('Unable to connect to the server.');
        } else if (body.resourceSets[0].resources.length === 0) {
            console.log('Invalid address.');
        } else if (response.statusCode == 200) {
                // success
                var name = body.resourceSets[0].resources[0].name;
                var lat = body.resourceSets[0].resources[0].point.coordinates[0];
                var lon = body.resourceSets[0].resources[0].point.coordinates[1];

                console.log(`Address: ${name}`);
                console.log(`Latitude: ${lat}`);
                console.log(`Longitude: ${lon}`);

        } else {
            // failure
            console.log(body);
            console.log('Something went wrong.');
        }
    });
}

module.exports = {
    geocodeAddress: geocodeAddress
}
