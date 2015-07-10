var debug = require('debug')('main');
var q = require('q');
var async = require('async');

var common = require('../common');

module.exports = registerUser;

function registerUser(params) {
    var deferred = q.defer();
    if (!params || !params.username || !params.password || !params.firstName || !params.lastName || !params.email) {
        deferred.reject({
            code: 'missingFields',
            description: 'Required Fields: username, password, firstName, lastName, email'
        });
    } else {
        async.parallel([

                function(callback) {
                    checkEmail(params, callback);
                },
                function(callback) {
                    checkUsername(params, callback);
                }
            ],
            function(err, results) {
                if (err) {
                    deferred.reject(err);
                } else {
                    createUser(params).then(function(val) {
                            debug('created user, customerid', val);
                            params.customerId = val.customerId;
                            createProfile(params).then(function(val) {
                                    deferred.resolve(val);
                                },
                                function(err) {
                                    deferred.reject(err);
                                });
                        },
                        function(err) {
                            deferred.reject(err);
                        });
                }
            });
    }
    return deferred.promise;
}

function createUser(params) {
    var httpSettings = {
        path: '/user/create',
        method: 'POST',
        body: params
    };
    return common.httpService.httpCall(httpSettings);
}

function createProfile(params) {
    var httpSettings = {
        path: '/profile/create',
        method: 'POST',
        body: params
    };
    return common.httpService.httpCall(httpSettings);
}

function checkEmail(params, callback) {

    var httpSettings = {
        path: '/profile/checkemail',
        method: 'POST',
        body: params
    };
    common.httpService.httpCall(httpSettings).then(function(val) {
            callback();
        },
        function(err) {
            callback(err);
        });
}

function checkUsername(params, callback) {

    var httpSettings = {
        path: '/user/checkusername',
        method: 'POST',
        body: params
    };
    common.httpService.httpCall(httpSettings).then(function(val) {
            callback();
        },
        function(err) {
            callback(err);
        });
}
