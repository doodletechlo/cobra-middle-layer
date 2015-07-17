var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = updatePassword;

function updatePassword(params) {
    debug('updatePassword', params);
    var settings = {
        path: '/user/updatepassword',
        method: 'POST',
        headers: {
            customerId: params.customerId
        },
        body: params.data

    };
    return common.httpService.httpCall(settings);
}
