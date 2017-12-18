/**
 * Created by xufengchao on 16/9/20.
 * Router Index
 */

import express from 'express'
// import createRoute from '../commons/createRoute'

// 引入自定义路由

// 创建router
let router = express.Router()

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

export default router
