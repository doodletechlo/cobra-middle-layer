var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = validate;
validate({token:'13a10e5a-4dc4-4e13-b12e-1a46150b5bcb'}).then(function(val){
    console.log('asdf', val);
},
function(err){
    console.log('sadfg', err);
});

function validate(params) {
    var settings = {
        path: '/token/getuser',
        method: 'POST',
        body: params
    };
    return common.httpService.httpCall(settings);
}
