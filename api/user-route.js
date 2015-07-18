// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var login = require('./login');

router.post('/login', function(req, res, next) {
    debug('entered login', req.body);
    login.getToken(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(err.status||500).json(err);
        });
});

module.exports = router;
