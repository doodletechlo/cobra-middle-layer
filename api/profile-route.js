// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var profile = require('./profile');

router.get('/getuser', function(req, res, next) {
    debug('entered profile', req.body);
    profile.getUser(req.body).then(
        function(data) {
            res.json(data);
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/updatepassword', function(req, res, next) {
    debug('entered profile', req.body);
    profile.updatePassword(req.body).then(
        function(data) {
            res.end();
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/updateemail', function(req, res, next) {
    debug('entered profile', req.body);
    profile.updateEmail(req.body).then(
        function(data) {
            res.end();
        },
        function(err) {
            res.status(401).json(err);

        });
});

module.exports = router;
