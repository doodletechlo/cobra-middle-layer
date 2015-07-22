// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var profile = require('./profile');

/**
 * @api {get} /api/profile/getuser Get user profile
 * @apiName getuser
 * @apiVersion 0.1.0
 * @apiGroup Profile
 * @apiDescription Get user profile
 *
 * @apiHeader {String} Authorization authorization token used for oauth
 * @apiHeaderExample {String} Authorization:
 *      {
 *    "Authorization":"NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=="
 *     }
 *
 * @apiSuccess {String} username Username
 * @apiSuccess {String} email Email
 * @apiSuccess {String} firstName First name
 * @apiSuccess {String} lastName Last name
 * @apiSuccess {String} createDate Date of profile creation
 * @apiSuccess {String} updateDate Date of last profile update
 * @apiSuccess {String} customerId Customer ID
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "testuser",
 *       "email": "testuser@dt.com",
 *       "firstName": "Steve",
 *       "lastName": "Leon",
 *       "createDate": "01-01-15T00:00:00Z",
 *       "updateDate": "01-01-15T00:00:00Z",
 *       "customerId": "0e5da78f-733c-4602-a9af-340b6a3e83ab",
 *     }
 *
 * @apiError denied Invalid credentials
 *
 * @apiErrorExample denied
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "denied",
 *       "description":"Invalid credentials"
 *     }
 */
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

/**
 * @api {get} /api/profile/updatepassword Update password
 * @apiName updatepassword
 * @apiVersion 0.1.0
 * @apiGroup Profile
 * @apiDescription Update new password
 *
 * @apiHeader {String} Authorization authorization token used for oauth
 * @apiHeaderExample {String} Authorization:
 *      {
 *    "Authorization":"NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=="
 *     }
 *
 * @apiParam {String} oldPassword Previous user password
 * @apiParam {String} newPassword New password to update to
 * @apiParamExample {json} Request:
 *  {
 *    "newPassword": "password1",
 *    "oldpassword" :"password" ,
 *  }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError missingFields Missing fields
 * @apiError invalidCredentials Incorrect password
 * @apiError dataError Update error
 *
 * @apiErrorExample missingFields
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "missingFields",
 *       "description":"Required fields: oldPassword, newPassword"
 *     }
 * @apiErrorExample invalidCredentials
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "invalidCredentials",
 *       "description":"Incorrect Password"
 *     }
 * @apiErrorExample dataError
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "dataError",
 *       "description":"Password update error"
 *     }
 */
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

/**
 * @api {get} /api/profile/updateemail Update email
 * @apiName updateemail
 * @apiVersion 0.1.0
 * @apiGroup Profile
 * @apiDescription Update email
 *
 * @apiHeader {String} Authorization authorization token used for oauth
 * @apiHeaderExample {String} Authorization:
 *      {
 *    "Authorization":"NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=="
 *     }
 *
 * @apiParam {String} email New email to update to
 * @apiParamExample {json} Request:
 *  {
 *    "email": "testuser@dt.com",
 *  }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiError missingFields Missing fields
 * @apiError dataError Update error
 *
 * @apiErrorExample missingFields
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "missingFields",
 *       "description":"Required fields: email"
 *     }
 * @apiErrorExample dataError
 *     HTTP/1.1 500 Not Found
 *     {
 *       "error": "dataError",
 *       "description":"Password update error"
 *     }
 */
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
