'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logs = exports.getCompleteUrl = exports.getCompleteHost = exports.resJsonMaker = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by huangxinxin on 16/9/13.
 */
function resJsonMaker(data) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return {
    data: data,
    error: error,
    message: message
  };
}

function getCompleteHost(req) {
  var arr = [req.protocol, '://', req.hostname];
  if (_config2.default.port) {
    arr.push(':' + _config2.default.port);
  }
  return arr.join('');
}

function getCompleteUrl(req) {
  return getCompleteHost(req) + req.originalUrl;
}

function logs(prefix) {
  if (prefix) {
    prefix = '[' + prefix + ']';
  }
  return function (msg, err) {
    var args = [(0, _moment2.default)().format(_config2.default.time.formatStr) + ' ' + prefix + ' => {\n'];
    if (msg) {
      args.push(msg);
    }
    if (err) {
      args.push('\n Error(\n', err, '\n )');
    }
    args.push('\n}\n');
    console.log.apply(console, args);
  };
}

exports.resJsonMaker = resJsonMaker;
exports.getCompleteHost = getCompleteHost;
exports.getCompleteUrl = getCompleteUrl;
exports.logs = logs;