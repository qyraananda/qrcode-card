var express = require('express');
var router = express.Router();
var qCode = require('../controller/qrcodeController')

/* GET home page. */
router.get('/index/(:apikey)', qCode.indexPage);

module.exports = router;