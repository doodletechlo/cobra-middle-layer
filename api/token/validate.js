var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = validate;

function validate(params) {
    var settings = {
        path: '/token/getuser',
        method: 'POST',
        body: params
    };
    return common.httpService.httpCall(settings);
}
