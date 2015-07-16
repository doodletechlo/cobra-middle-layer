var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getUser;

function getUser(headers) {
    var settings = {
        path: '/profile/getuser',
        method: 'GET',
        headers: { 'customerId': headers.customerId},
    };
    return common.httpService.httpCall(settings);
}
