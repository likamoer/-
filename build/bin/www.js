'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _utils = require('../commons/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// logs
var _logs = (0, _utils.logs)('APP');

/**
 * Get port from environment and store in Express.
 */
/**
 * Module dependencies.
 */

var port = normalizePort(_config2.default.port);
var apiPort = port + 1;
_app2.default.set('port', port);
_app2.default.set('apiPort', apiPort);

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_app2.default);

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
  var bind = 'Port ' + _config2.default.port;
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
  _logs('访问地址: ' + _config2.default.secheme + '://ip:' + port + '/');
  _logs('APIDoc: ' + _config2.default.secheme + '://ip:' + apiPort + '/');
}

/**
 * API Server
 **/

if (process.env.NODE_ENV !== 'production') {
  _http2.default.createServer(function (request, response) {
    try {
      var requestUrl = _url2.default.parse(request.url).pathname;
      if (requestUrl === '/') {
        requestUrl = '/index.html';
      }
      response.writeHead(200);
      var fileStream = _fs2.default.createReadStream(_path2.default.join(_config2.default.path.base, '/bin/apidoc', requestUrl));
      fileStream.pipe(response);
      fileStream.on('error', function (e) {
        response.writeHead(404); // assume the file doesn't exist
        response.end();
      });
    } catch (e) {
      response.writeHead(500);
      response.end();
    }
  }).listen(apiPort);
}