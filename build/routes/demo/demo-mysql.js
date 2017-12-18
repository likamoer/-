'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../commons/utils');

var _mysql = require('../../database/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Restful, ApiDoc Demo
 * xufengchao
 * 2016.09.20
 */
exports.default = {
  '/': [{
    /**
     * @api {post} /api/demo-mysql Get Demo
     * @apiName GetDemo
     * @apiGroup Mysql-Demo
     *
     * @apiSuccess {Array} data 结果集
     */
    method: 'get',
    callback: function callback(req, res, next) {
      _mysql2.default.getConnection(function (err, connection) {
        if (err) {
          return res.status(500).json((0, _utils.resJsonMaker)('', 'Connection Error', true));
        }
        connection.query('select * from Sessions', function (err, rows) {
          if (err) {
            return res.status(500).json((0, _utils.resJsonMaker)('', 'Query Error', true));
          }
          return res.json((0, _utils.resJsonMaker)(rows, 'Query Success'));
        });
      });
    }
  }]
};