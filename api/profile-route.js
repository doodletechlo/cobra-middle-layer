// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var profile = require('./profile');

router.get('/getuser', function(req, res, next) {
    debug('entered profile', req.body, req.headers);
    var params = {
        customerId : req.headers.customerId
    };
    profile.getUser(params).then(
        function(data) {
            res.json(data);
        },
        function(err) {
            res.status(401).json(err);

        });
});

module.exports = router;
