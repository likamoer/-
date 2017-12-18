'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _session = require('../commons/session');

var _session2 = _interopRequireDefault(_session);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by xufengchao on 16/9/20.
 * 配置页面路由
 */

var router = _express2.default.Router();

// api page
if (process.env.NODE_ENV !== 'production') {
  router.get('/apidoc/', function (req, res, next) {
    res.render('sys.apidoc.ejs', {
      url: _config2.default.secheme + '://' + req.host + ':' + _app2.default.get('apiPort') + '/'
    });
  });
}

// index page
router.get(['/index'], function (req, res, next) {
  res.render('sys.index.ejs');
});

// client page
router.get(['/', /\/page/], _session2.default.check, function (req, res, next) {
  res.render('index.html');
});

exports.default = router;