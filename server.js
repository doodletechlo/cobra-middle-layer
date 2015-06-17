var express = require('express');
var exec = require('child_process').exec;
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var debug = require('debug')('main');

var api = require('./server/api-route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'jade');

app.use('/api/javaapi', function(req, res) {
    var url = '/javaapi' + req.url;
    debug('app.js creditcom', url, req.method);
    req.pipe(request(url)).pipe(res);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use('/api/status', function(req, res) {
    exec('git log --stat -1', function(error, stdout, stderr) {
        if (error) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.send('<div style="white-space: pre">' + stdout + '</div>');
    });
});

app.use('/api/*', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({error: 'resource not found'});
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
