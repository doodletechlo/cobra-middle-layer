var express = require('express');
var debug = require('debug')('main');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(404).send('200 OK');
});

module.exports = router;
