var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getUser;

function getUser(params) {
    var settings = {
        path: '/profile/getuser',
        method: 'GET',
        headers: {
            customerId: params.customerId
        }
    };
    return common.httpService.httpCall(settings);
}
