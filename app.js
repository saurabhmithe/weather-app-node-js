const request = require('request');
const yargs = require('yargs');

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

// var body = JSON.parse('{"authenticationResultCode": "ValidCredentials","brandLogoUri": "http://dev.virtualearth.net/Branding/logo_powered_by.png","copyright": "Copyright © 2018 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.","resourceSets": [{"estimatedTotal": 1,"resources": [{"__type": "Location:http://schemas.microsoft.com/search/local/ws/rest/v1","bbox": [47.636186625738,-122.137440519157,47.6439120608793,-122.122154036524],"name": "1 Microsoft Way, Redmond, WA 98052","point":{"type": "Point","coordinates": [47.6400493433086,-122.12979727784]},"address": {"addressLine": "1 Microsoft Way","adminDistrict": "WA","adminDistrict2": "King County","countryRegion": "United States","formattedAddress": "1 Microsoft Way, Redmond, WA 98052","locality": "Redmond","postalCode": "98052"},"confidence": "High","entityType": "Address","geocodePoints": [{"type": "Point","coordinates": [47.6400493433086,-122.12979727784],"calculationMethod": "InterpolationOffset","usageTypes": ["Display"]},{"type": "Point","coordinates": [47.6400677681917,-122.129858154585],"calculationMethod": "Interpolation","usageTypes": ["Route"]}],"matchCodes": ["Good"]}]}],"statusCode": 200,"statusDescription": "OK","traceId": "3e06cf6e36b64225a19503d4e2713c03|CO3FC7B7B4|7.7.0.0|Ref A: DB4BBEED57A9409CBFDEC8219DCA23CB Ref B: CO1EDGE0311 Ref C: 2018-12-02T04:57:31Z"}');

// var name = body.resourceSets[0].resources[0].name;
// var lat = body.resourceSets[0].resources[0].point.coordinates[0];
// var lon = body.resourceSets[0].resources[0].point.coordinates[1];

// console.log(`Address: ${name}`);
// console.log(`Latitude: ${lat}`);
// console.log(`Longitude: ${lon}`);

// http://dev.virtualearth.net/REST/v1/Locations/US/WA/98052/Redmond/1%20Microsoft%20Way?key=AvUg7T5TTyuHWQvN81XnrK_V5Ajuyd_BSzvD6e137SsK704drtRzDdQ1yiIXWOj5'

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


// url: 'https://api.darksky.net/forecast/78de4c40a433dcef8701b952ff5e28ec/37.330910,-121.904997'
