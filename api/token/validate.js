var debug = require('debug')('main');
var q = require('q');

var common = require('../common');

module.exports = validate;
validate({token:'sf'}).then(function(val){
    console.log('asdf', val);
},
function(err){
    console.log('sadfg', err);
});

function validate(params) {
    var settings = {
        path: '/token/getuser',
        method: 'POST',
        body: params.token
    };
    return common.httpService.httpCall(settings);
}
