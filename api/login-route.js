// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var authentication = require('./login');

router.post('/', function(req, res, next) {
    debug('entered login');
    authentication.getMemberToken(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(404).json(err);

        });
});

module.exports = router;
