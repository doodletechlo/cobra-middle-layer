// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var registration = require('./registration');
/**
 * @api {post} /api/registration/create Register a new user
 * @apiName create
 * @apiVersion 0.1.0
 * @apiGroup Registration
 * @apiDescription Register a new user and obtain a token
 *
 * @apiParam {String} username user's username
 * @apiParam {String} password user's password
 * @apiParam {String} email Email
 * @apiParam {String} firstName First Name
 * @apiParam {String} lastName Last Namek
 * @apiParamExample {json} Request:
 *  {
 *    "username": "testuser1",
 *    "password" :"password" ,
 *    "email":"testuser1@dt.com",
 *    "firstName":"Steve",
 *    "lastName":"Leon"
 *  }
 *
 * @apiSuccess {String} token Authorization token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=="
 *     }
 *
 * @apiError missingFields One or more required fields were not submitted
 * @apiError usernameTaken Username is not available
 * @apiError emailTaken Email is not available
 * @apiError dataError Unknown data error
 *
 * @apiErrorExample missingFields
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "missingFields",
 *       "description":"Required fields: username, password, firstName, lastName, email"
 *     }
 * @apiErrorExample usernameTaken
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "usernameTaken",
 *       "description":"Username is taken"
 *     }
 * @apiErrorExample emailTaken
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "emailTaken",
 *       "description":"Email is taken"
 *     }
 * @apiErrorExample dataError
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "dataError",
 *       "description":"User creation error"
 *     }
 */
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
