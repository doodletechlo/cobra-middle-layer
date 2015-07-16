var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = getUser;

function getuser(params) {
    var validate = {
        path: '/profile/getuser',
        method: 'GET',
        body: params
    };
    return common.httpService.httpCall(validate);
}
