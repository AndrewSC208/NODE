import request from 'request';

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
}

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

geocodeAddress('92103', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // nested calback: (the beginning of callback hell)
        console.log('Address: ', data);
        getWeather(data.lat, data.lng, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Current Weather: ', data);
            }
        })
    }
});


