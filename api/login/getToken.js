var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = {
    getMemberToken: getMemberToken
};

function getMemberToken(params) {
    var deferred = q.defer();
    if (!params.password || !params.username) {
        deferred.reject({
            code: 'missingFields',
            description: 'Required Fields: username, password'
        });
    } else {

        var httpSettings = {
            path: '/user/login',
            host: common.config.getDomain(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
