/**
 * Created by huangxinxin on 16/9/18.
 */
import session from 'express-session'
import connectSessionSequelize from 'connect-session-sequelize'
import sequelize from '../database/seq'
import {logs, resJsonMaker} from '../commons/utils'
import config from '../config'

let _logs = logs('SESSION')

export default {
  init: function () {
    let Store = connectSessionSequelize(session.Store)
    return config.session.status === 'off' ? null : session({
      secret: config.session.secret,
      store: new Store({
        db: sequelize,
        table: 'Session',
        checkExpirationInterval: config.session.checkExpirationInterval,
        expiration: config.session.expiration,
        extendDefaultFields (defaults, session) {
          return Object.assign(defaults, session)
        }
      }),
      resave: false,
      saveUninitialized: true
    })
  },
  save: function (req, res, next) {
    if (config.session.status === 'off') {
      next()
    } else {
      req.session.save(function (err) {
        if (err) {
          _logs('登录失败, 会话未创建')
          if (req.xhr) {
            res.status(400).json(resJsonMaker(null, '登录失败, 会话未创建', true))
          } else {
            res.render('sys.error.ejs', { title: config.app.title, message: '登录失败, 会话未创建' })
          }
        } else {
          _logs('会话创建成功, NEXT')
          next()
        }
      })
    }
  },
  check: function (req, res, next) {
    if (config.session.status === 'on') {
      // 进行会话检查, 然后决定下一步做什么, 比如: 失败可以跳转登录, 成功则next()
      next()
    } else {
      next()
    }
  }
}
