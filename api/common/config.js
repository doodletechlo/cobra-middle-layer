module.exports ={
    getDomain: getDomain
};

var domain = {
    prod: 'http://de74xyk8y8kp9.cloudfront.net',
    local: 'http://localhost:3006'
};

function getDomain(domain){
    var url = domain.prod;
    if(domain && domain === 'local'){
        url = domain.local;
    }
    return url;
}
