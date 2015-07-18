var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getToken;

function getToken(params) {
    var deferred = q.defer();
    if (!params || !params.password || !params.username) {
        deferred.reject({
            error: 'missingFields',
            description: 'Required Fields: username, password'
        });
    } else {
        var validate = {
            path: '/user/validate',
            method: 'POST',
            body: params
        };
        common.httpService.httpCall(validate).then(
            function(data) {
                params.customerId = data.customerId;
                var tokenSettings = {
                    path: '/token/getToken',
                    method: 'POST',
                    body: params
                };
                common.httpService.httpCall(tokenSettings).then(
                    function(val) {
                        deferred.resolve(val);
                    },
                    function(err) {
                        var response = {
                            code: 'databaseError',
                            description: 'Unable to retrieve token',
                            status: 500,
                            error: err
                        };
                        deferred.reject(err);
                    });
            },
            function(err) {
                var response = {
                    code: 'denied',
                    description: 'Invalid credentials',
                    status: 401,
                    error: err
                };
                deferred.reject(response);
            });
    }
    return deferred.promise;
}
