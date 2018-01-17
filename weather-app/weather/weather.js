const request = require('request');

const getWeather = (lat, lng, next) => {
    request({
        url: `https://api.darksky.net/forecast/49a0d39f8000c7ec1ff0d6f9f30363a1/${lat},${lng}`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            next(undefined, body.currently);
        } else {
            next('Unable to fetch weather.', undefined)
        }
    });
};

module.exports = {
    getWeather
};