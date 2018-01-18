const yargs = require('yargs');
const axios = require('axios');
// Config yargs:
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
// Command args:
const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
// This can be changed with fetch:
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS' || response.data.error_message) {
        throw new Error('Unable to find address.');
    }
    const weatherUrl = `https://api.darksky.net/forecast/49a0d39f8000c7ec1ff0d6f9f30363a1/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`;
    console.log(response.data.results[0].formatted_address);
    // return a promise to start the next process:
    return axios.get(weatherUrl)
}).then((response) => {
    const temp = response.data.currently.temperature;
    console.log(temp);
}).catch((err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});
