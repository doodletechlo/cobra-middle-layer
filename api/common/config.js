var debug = require('debug')('main');
module.exports = {
    getDomain: getDomain
};

var domain = {
    dev: {
        url: '52.27.28.172'
    },
    local: {
        url: 'localhost',
        port: 3006
    }
};

function getDomain(settings) {
    settings.host = domain.dev.url;
    if (process.env.ENV === 'local') {
        settings.host = domain.local.url;
        settings.port = domain.local.port;
    }
    return settings;
}
