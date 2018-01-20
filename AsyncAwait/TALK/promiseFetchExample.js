import request from 'request';

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (err, res, body) => {
            if (err) {
                reject('Unable to connect to google service');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address')
            } else if (body.error_message) {
                reject(body.error_message);
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

const getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/49a0d39f8000c7ec1ff0d6f9f30363a1/${lat},${lng}`,
            json: true
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                resolve(body.currently);
            } else {
                reject('Unable to fetch weather.');
            };
        });
    });
};

geocodeAddress('92103')
    .then((res) => {
        console.log('Address', res);
        return getWeather(res.lat, res.lng);
    }).then((res) => {
        console.log('Current Weather', res);
    }).catch((err) => {
        console.log(err);
    });