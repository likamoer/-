'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Person = exports.Session = undefined;

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _PersonTest = require('./PersonTest');

var _PersonTest2 = _interopRequireDefault(_PersonTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by xufengchao on 16/9/11.
 * Models
 */

_config2.default.db.sequelize && _seq2.default.authenticate().then(function () {
  // Create Model Relationship
  // ...
  // Flush DB or Flush Your Model
  return _seq2.default.sync();
}).then(function () {
  // Your Table Force Sync
  // force: true
}).catch(function () {
  throw new Error('连接数据库失败');
});

// demo
exports.Session = _Session2.default;
exports.Person = _PersonTest2.default;