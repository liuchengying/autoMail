
const sendMail = require('./src/mail/mail');
const schedule = require('node-schedule');
const config = require('./src/config/config');
const getWeather = require('./src/Api/api');
const fs = require('fs')

var template = fs.readFileSync('./index.html', { encoding: 'utf-8' });
var newTemplate = '';
var templateValue = {};

schedule.scheduleJob('0 0 8 * * *', () => {
    getWeather(config.beijing).then(res => {
        let data = res.daily_forecast;
        for (let i = 0; i < data.length; i++) {
            var arr = data[i].date.split('-');
            arr.shift();
            templateValue[`date${i + 1}`] = arr.join('月') + '日',
            templateValue[`wendu${i + 1}`] = `${data[i].tmp_min}~${data[i].tmp_max}`,
            templateValue[`tianqizhuangkuang${i + 1}`] = data[i].cond_txt_d,
            templateValue[`fengxiang${i + 1}`] = data[i].wind_dir,
            templateValue[`fengli${i + 1}`] = `${data[i].wind_sc}级`,
            templateValue[`zuigao${i + 1}`] = data[i].tmp_max
        }
        newTemplate = templateData(template, templateValue);
        console.log(newTemplate)
        sendMail({ who: 'lcy_snail@126.com', html: newTemplate });
    })
})

function templateData (template, data) {
    let temp = template;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let reg = new RegExp(`{{${key}}}`, 'g');
            temp = temp.replace(reg, data[key]);
        }

    }
    return temp;
}
