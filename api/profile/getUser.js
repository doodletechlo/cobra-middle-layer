var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getUser;

function getUser(params, headers) {
    var validate = {
        path: '/profile/getuser',
        method: 'GET',
        headers: { 'customerId': headers.customerId},
        body: params
    };
    return common.httpService.httpCall(validate);
}
