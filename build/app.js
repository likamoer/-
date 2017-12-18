'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _access = require('./access');

var _access2 = _interopRequireDefault(_access);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./commons/utils');

var _session = require('./commons/session');

var _session2 = _interopRequireDefault(_session);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./views/index');

var _index4 = _interopRequireDefault(_index3);

require('./model/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _logs = (0, _utils.logs)('APP');
var app = (0, _express2.default)();

// 启用访问日志
(0, _access2.default)(app);

// set port
app.set('port', _config2.default.port);

// view engine setup
app.set('views', _config2.default.path.viewsAbs);
app.engine('.html', _ejs2.default.__express);
app.set('view engine', 'html');

// static
app.use(_express2.default.static(_config2.default.path.publicAbs));

// favicon
app.use((0, _serveFavicon2.default)(_config2.default.path.faviconAbs));

// bodyParser
app.use(_bodyParser2.default.json({
  limit: _config2.default.limit
}));
app.use(_bodyParser2.default.urlencoded({
  extended: false,
  limit: _config2.default.limit
}));

// cookieParser
app.use((0, _cookieParser2.default)());

// session
app.use(_session2.default.init() || function (req, res, next) {
  next();
});

// view routers
app.use(_index4.default);

// routers
app.use(/\/api/, _index2.default);

// Error handler
app.use(function (req, res) {
  _logs('404:`' + (0, _utils.getCompleteUrl)(req) + '`');
  if (req.xhr) {
    res.status(404).json((0, _utils.resJsonMaker)('', '404 Not Found', true));
  } else {
    res.status(404).render('sys.error.ejs', { title: _config2.default.app.title, message: '404 Not Found' });
  }
});

exports.default = app;