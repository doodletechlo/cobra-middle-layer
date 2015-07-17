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
            });
        },
        function() {
            deferred.reject({
                code: "invalidPassword",
                description: "Wrong password"
            });
        });
    return deferred.promise;
}
