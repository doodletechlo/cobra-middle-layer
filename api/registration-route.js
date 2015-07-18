// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var registration = require('./registration');

router.post('/create', function(req, res, next) {
    debug('entered registration create', req.body);
    registration.create(req.body).then(
        function(token) {
            res.send(token);
        },
        function(err) {
            res.status(err.status || 500).json(err);
        });
});

module.exports = router;
