// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var login = require('./login');
/**
 * @api {post} /user/login Log into application
 * @apiName Login
 * @apiVersion 0.1.0
 * @apiGroup User
 * @apiDescription Log into application and obtain a token.
 *
 * @apiParam {String} username user's username
 * @apiParam {String} password user's current password
 *
 * @apiSuccess {String} token Authorization token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=="
 *     }
 *
 * @apiError UserNotFound The user was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "denied",
 *       "description":"Invalid credentials"
 *     }
 */
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
