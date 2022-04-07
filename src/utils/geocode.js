const request = require('postman-request');

const getGeoCode = (location, callback) => {
    const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const accessToken = 'pk.eyJ1IjoibXNoYW56ZXIiLCJhIjoiY2wxamdoaHlwMXlmaTNxcWlyeGR6ejBkZyJ9.63j4vLjzIvzyVel6qrWg_w';
    url = encodeURI(mapURL + location + '.json?access_token=' + accessToken);
     request({url, 
         json: true}, (error, {body} = {} ) => {
             if (error) {
                 callback(error, undefined);
             } else if (body.message) {
                 callback(body.message, undefined);
             } else if (body.features.length == 0) {
                 callback("No response found", undefined);
             } else {
                 const data = {name: body.features[0].place_name, 
                                lat: body.features[0].center[1], 
                                long: body.features[0].center[0]};
                callback(undefined, data);
            }
         });
}
module.exports = { getGeoCode };

