const request = require('request');

const geocodeAddress = (address, next) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            next('Unable to connect to google service');
        } else if (body.status === 'ZERO_RESULTS' || body.error_message) {
            next('Unable to find that address')
        } else if (body.status === 'OK') {
            next(undefined, {
                address: res.body.results[0].formatted_address,
                lat: res.body.results[0].geometry.location.lat,
                lng: res.body.results[0].geometry.location.lng
            });
        };
    });
};

module.exports = {
    geocodeAddress
};

