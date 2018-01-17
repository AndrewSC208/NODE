const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch wather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // nested calback: (the beginning of callback hell)
        weather.getWeather(data.lat, data.lng, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
});
