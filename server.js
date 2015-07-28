var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('main');
var request = require('request');

var api = require('./api');

var app = express();

//app.use('/api', function(req, res) {
//var url = api.config.getDomain(process.env.ENV) + req.url;
//debug('Request: ' + url, req.method);
//req.pipe(request(url)).pipe(res);
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/api/registration', api.registration);
app.use('/api/version', api.version);
app.use('/api/user/', api.user);
// Member section
app.use('*', function(req, res, next) {
    var params = {
        token: req.headers.authorization
    };
    debug('checking token', params, req.headers);
    api.token.validate(params).then(function(val) {
        req.body.customerId = val.customerId;
        next();
    }, function(err) {
        res.status(401).json({
            code: 'invalidToken',
            description: 'Valid Token Required'
        });
    });
});
app.use('/api/profile/', api.profile);

// catch 404 and forward to error handler
app.use('/', function(req, res, next) {
    //api.logger.insert(req.url, req.method);
    res.status(404).json({
        code: 'unknownResource',
        description: 'resource not found'
    });
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3005');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;
