var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getToken;

function getToken(params) {
    var deferred = q.defer();
    if (!params || !params.password || !params.username) {
        deferred.reject({
            code: 'missingFields',
            description: 'Required Fields: username, password'
        });
    } else {

        var httpSettings = {
            path: '/user/login',
            method: 'POST',
            body: params
        };
        common.httpService.httpCall(httpSettings).then(
            function(val) {
                deferred.resolve(val);
            },
            function(err) {
                deferred.reject(err);
            });
    }
    return deferred.promise;
}
