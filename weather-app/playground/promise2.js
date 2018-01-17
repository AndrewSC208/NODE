const request = require('request');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (err, res, body) => {
            if (err) {
                reject('Unable to connect to google service');
            } else if (body.status === 'ZERO_RESULTS' || body.error_message) {
                reject('Unable to find that address')
            } else if (body.status === 'OK') {
                resolve({
                    address: res.body.results[0].formatted_address,
                    lat: res.body.results[0].geometry.location.lat,
                    lng: res.body.results[0].geometry.location.lng
                });
            };
        });
    });
};

geocodeAddress('92103')
    .then((location) => {
        console.log(location);
    })
    .catch((err) => {
        console.log(err);
    })