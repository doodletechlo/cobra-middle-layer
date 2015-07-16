var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = update;

function update(params) {
    var settings = {
        path: '/profile/update',
        method: 'POST',
        headers: {
            customerId: params.customerId
        },
        body: params.data

    };
    return common.httpService.httpCall(settings);
}
