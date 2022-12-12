var express = require('express');
var router = express.Router();
var qCode = require('../controller/qrcodeController')
    /* GET users listing. */
router.get('/qrcode', qCode.qrCodePage);
router.post('/qrcode/btnSubmit', qCode.qrcodebtnSubmit)

module.exports = router;