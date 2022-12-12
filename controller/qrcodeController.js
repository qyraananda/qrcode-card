const hlp = require('../helper/vcardhelper')

module.exports = {
    indexPage: async(req, res, next) => {
        let akey = req.params.apikey
        let getData = await hlp.masteruser(akey)
        try {
            res.render('index-card', { 'title': "Visual Card", data: getData })
        } catch (error) {
            res.render('../views/error', { message: error })
        }

    },
    qrCodePage: async(req, res, next) => {
        let getUser = await hlp.userlist()
        let logo = await hlp.getLogo()
        const QrCodeWithLogo = await hlp.create(
            "https:/visualcard.com",
            logo,
            130,
            50
        );
        try {
            res.render('qrcode', { title: 'Visual Card', listuser: getUser, QrCodeWithLogo: QrCodeWithLogo });
        } catch (error) {
            res.render('../views/error', { message: error })
        }

    },
    qrcodebtnSubmit: async(req, res, next) => {
        let usern = req.body.user_id
        let logo = await hlp.getLogo()
        let pjg = usern
        console.log(Math.round(pjg.length))
        let panjang = 0;
        let lebar = 0;
        if (Math.round(pjg.length) < 100) {
            panjang = Math.round(pjg.length) + 150
                //lebar = 50
        } else {
            panjang = 150
                //lebar = 50
        }
        const QrCodeWithLogo = await hlp.create(
            "https://visualcard.com/" + usern,
            logo,
            panjang,
            50
        );
        await hlp.masteruser(usern)
            .then(async(resdata) => {
                res.status(200)
                res.json({
                    code: 200,
                    data: QrCodeWithLogo
                })
            }).catch((err) => {
                console.log(err)
            })

    }

}