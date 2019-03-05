const axios = require('axios');
const config = require('../config/config')
let url = 'https://free-api.heweather.net/s6/weather/forecast';
let option = {
    key: config.apiKey
}
const getWeather = function (location) {
    if(!location) return
    option.location = location;
    return new Promise((resolve, reject) => {
        axios.get(url, { params: option }).then((res, err) => {
            let data = res.data.HeWeather6[0];
            if(data.status === 'ok') {
                resolve(data);
            }else {
                reject(err);
            }
        })
    })
}

module.exports = getWeather