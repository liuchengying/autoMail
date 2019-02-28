const mailer = require('nodemailer');
const config = require('../config/config');
const async = require('async');

const ROOT_URL = `http://${config.host}:${config.port}`;
let transport = mailer.createTransport(config.mailOption);

let sendMail = function (data) {
    async.retry({times: 3}, (done) => {
        transport.sendMail(data, err => {
            if(err) {
                console.log('邮件发送失败:'+ err)
                return done(err);
            }
            return done()
        })
    }, err => {
        if(err) {
            console.log('邮件发送失败:' + err);
            return;
        }
        console.log('邮件发送成功!');
    })
}

let sendActiveMail = function (data) {
    let from = config.ReceiveMailerInfo.from;
    let to = data.who;
    let subject = config.ReceiveMailerInfo.subject;
    let html = data.html;
    sendMail({from: from, to: to, subject: subject, html: html});
}

module.exports = sendActiveMail;
