var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = updateEmail;

function updateEmail(params) {
    debug('updateemail', params);
    var settings = {
        path: '/profile/update',
        method: 'POST',
        headers: {
            customerId: params.customerId
        },
        body: params

    };
    return common.httpService.httpCall(settings);
}
