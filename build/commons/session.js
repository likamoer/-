'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectSessionSequelize = require('connect-session-sequelize');

var _connectSessionSequelize2 = _interopRequireDefault(_connectSessionSequelize);

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _utils = require('../commons/utils');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _logs = (0, _utils.logs)('SESSION'); /**
                                          * Created by huangxinxin on 16/9/18.
                                          */
exports.default = {
  init: function init() {
    var Store = (0, _connectSessionSequelize2.default)(_expressSession2.default.Store);
    return _config2.default.session.status === 'off' ? null : (0, _expressSession2.default)({
      secret: _config2.default.session.secret,
      store: new Store({
        db: _seq2.default,
        table: 'Session',
        checkExpirationInterval: _config2.default.session.checkExpirationInterval,
        expiration: _config2.default.session.expiration,
        extendDefaultFields: function extendDefaultFields(defaults, session) {
          return Object.assign(defaults, session);
        }
      }),
      resave: false,
      saveUninitialized: true
    });
  },
  save: function save(req, res, next) {
    if (_config2.default.session.status === 'off') {
      next();
    } else {
      req.session.save(function (err) {
        if (err) {
          _logs('登录失败, 会话未创建');
          if (req.xhr) {
            res.status(400).json((0, _utils.resJsonMaker)(null, '登录失败, 会话未创建', true));
          } else {
            res.render('sys.error.ejs', { title: _config2.default.app.title, message: '登录失败, 会话未创建' });
          }
        } else {
          _logs('会话创建成功, NEXT');
          next();
        }
      });
    }
  },
  check: function check(req, res, next) {
    if (_config2.default.session.status === 'on') {
      // 进行会话检查, 然后决定下一步做什么, 比如: 失败可以跳转登录, 成功则next()
      next();
    } else {
      next();
    }
  }
};