// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var authentication = require('./login/authentication');

router.post('/login', function(req, res, next) {
    debug('entered login');
    authentication.getMemberToken(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(404).json(err);

        });
});

router.get('/version', function(req, res, next) {
    exec('git log --stat -1', function(error, stdout, stderr) {
        if (error) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.send('<div style="white-space: pre">' + stdout + '</div>');
    });
});

router.get('/javaapi', function(req, res, next) {
    var url = req.url;
    debug('app.js creditcom', url, req.method);
    req.pipe(request(url)).pipe(res);
});

module.exports = router;
