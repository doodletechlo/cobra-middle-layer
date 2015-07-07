var debug = require('debug')('main');
module.exports ={
    getDomain: getDomain
};

var domain = {
    dev: 'http://52.27.28.172',
    local: 'http://localhost:3006'
};

function getDomain(param){
    var url = domain.dev;
    if(param=== 'local'){
        url = domain.local;
    }
    return url;
}
