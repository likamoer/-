'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _seq = require('../database/seq');

var _seq2 = _interopRequireDefault(_seq);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Session = _config2.default.session.status === 'off' ? null : _seq2.default.define('Session', {
  sid: {
    type: _sequelize2.default.STRING,
    primaryKey: true
  },
  expires: _sequelize2.default.DATE,
  data: _sequelize2.default.STRING(20000)
}, {
  tableName: 'Session',
  timestamps: false
}); /**
     * Created by xufengchao on 16/9/18.
     */
exports.default = Session;