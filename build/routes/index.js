'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import createRoute from '../commons/createRoute'

// 引入自定义路由

// 创建router
var router = _express2.default.Router();

/* 安装自定义路由 */
/**
// MySql 使用实例 , 请注意配置 config.js db.mysql
import DemoMysql from './demo/demo-mysql'
createRoute(router, DemoMysql, '/demo-mysql')
*/

/**
// Sequelize 使用实例 , 请注意配置 config.js db.sequelize
import DemoPerson from './demo/demo-person'
createRoute(router, DemoPerson, '/demo-person')
*/

/**
 * Created by xufengchao on 16/9/20.
 * Router Index
 */

exports.default = router;