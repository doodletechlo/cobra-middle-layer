var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = updatePassword;

function updatePassword(params) {
    var deferred = q.defer();
    debug('updatePassword', params);

    var checkpassword = {
        path: '/user/checkpassword',
        method: 'POST',
        headers: {
            customerId: params.customerId
        },
        body: params

    };

    var update = {
        path: '/user/updatepassword',
        method: 'POST',
        headers: {
            customerId: params.customerId
        },
        body: params

    };

    common.httpService.httpCall(checkpassword).then(function() {
            common.httpService.httpCall(update).then(function() {
                deferred.resolve();
            }, function(err) {
                var response = {
                    code: 'databaseError',
                    description: 'Unable to perform update',
                    status: 500,
                    error: err
                };
                deferred.reject(response);
            });
        },
        function(err) {
            var response = {
                code: 'invalidCredentials',
                description: 'Incorrect password',
                status: 400,
                error: err
            };
            deferred.reject(response);
        });
    return deferred.promise;
}
