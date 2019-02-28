module.exports = {
    mailOption: {
        service: '126',
        host: 'smtp.126.com',
        prot: '25',
        secureConnection: true,
        auth: {
            user: 'liuchengying_yx@126.com',
            pass: 'lcyyx521',
        }
    },
    ReceiveMailerInfo: {
        from: '你老头<liuchengying_yx@126.com>',
        to: 'yx_snail@126.com',
        subject: '每天小提示',
    }
}