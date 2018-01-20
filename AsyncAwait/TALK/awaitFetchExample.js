import fetch from 'node-fetch';

async function geocodeAddress(address) {
    try {
        const res  = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`);
        const data = await res.json();
        if(data.status !== 'OK') {
            throw new Error(data.error_message)
        }
        const { formatted_address } = data.results[0];
        const { lat } = data.results[0].geometry.location;
        const { lng } = data.results[0].geometry.location;
        const geo = {
            address: formatted_address,
            lat,
            lng
        };
        return geo;
    } catch (err) {
        console.log(err);
    }
}

async function getWeather(lat, lng) {
    try {
        const res  = await fetch(`https://api.darksky.net/forecast/49a0d39f8000c7ec1ff0d6f9f30363a1/${lat},${lng}`);
        const data = await res.json();
        const { currently } = data;
        return currently;
    } catch (err) {
        console.log(err);
    }
}

async function currentTemp(address) {
    const geoAddress     = await geocodeAddress(address);
    const currentWeather = await getWeather(geoAddress.lat, geoAddress.lng);
    console.log('Address: ', geoAddress)
    console.log('Current weather: ', currentWeather);
    return {
        geoAddress,
        currentWeather
    }
}

const temp = currentTemp('92103');