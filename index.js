const axios = require('axios');
const sendMail = require('./src/mail/mail');
const schedule = require('node-schedule');
const config = require('./src/config/config');

let url = 'https://free-api.heweather.net/s6/weather/forecast';
let option = {
    location: 'CN101010100',
    key: 'HE1902282229251343'
}
axios.get(url, { params: option }).then((res) => {
    console.log(res.data);
})
var htmlInfo = '<h1>这是您收到的第一封邮件</h1>'


var rule = new schedule.RecurrenceRule();
var times = [21,22,23,24,25];
rule.minute = times;
schedule.scheduleJob(rule, () => {
    sendMail({who: 'lcy_snail@126.com', html: htmlInfo});
})