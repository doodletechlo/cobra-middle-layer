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
            function(customerId) {
                params.customerId = customerId;
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
                        deferred.reject(err);
                    });
            },
            function(err) {
                deferred.reject(err);
            });
    }
    return deferred.promise;
}
