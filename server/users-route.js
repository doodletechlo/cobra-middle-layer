var express = require('express');
var debug = require('debug')('main');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('OK success');
});

module.exports = router;
