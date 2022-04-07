const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=9617312e9f1120ad3d25f4eba16bc45d&query=';
    url  = encodeURI(weatherURL + lat +',' + long + '&units=f');

    request({url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, 'It is currently ' + response.body.current.weather_descriptions[0].toLowerCase() + " and " + response.body.current.temperature + " degrees (feels like " + response.body.current.feelslike + " degrees) " + ". The humidity is " + response.body.current.humidity + "%");
        }
    });
}
module.exports = { forecast };
