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
            res.status(401).json({
                error: err,
                code: 'denied',
                description: 'Invalid credentials'
            });
        });
});

router.post('/updatepassword', function(req, res, next) {
    debug('entered profile', req.body);
    if (!req.body.newPassword || !req.body.oldPassword) {
        res.status(400).json({
            code: "missingFields",
            description: "Required fields: oldPassword, newPassword"
        });
    } else {
        profile.updatePassword(req.body).then(
            function(data) {
                res.end();
            },
            function(err) {
                res.status(err.status || 500).json(err);
            });
    }
});

router.post('/updateemail', function(req, res, next) {
    debug('entered profile', req.body);
    if (!req.body.email) {
        res.status(400).json({
            code: "missingFields",
            description: "Required fields: email"
        });
    } else {
        profile.updateEmail(req.body).then(
            function(data) {
                res.end();
            },
            function(err) {
                res.status(500).json({
                    error: err,
                    code: 'error',
                    description: 'Update error'
                });
            });
    }
});

module.exports = router;
