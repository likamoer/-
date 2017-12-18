/**
 * Created by xufengchao on 16/9/20.
 * 配置页面路由
 */

import express from 'express'
import app from '../app'
import session from '../commons/session'
import config from '../config'

let router = express.Router()

// api page
if (process.env.NODE_ENV !== 'production') {
  router.get('/apidoc/', function (req, res, next) {
    res.render('sys.apidoc.ejs', {
      url: config.secheme + '://' + req.host + ':' + app.get('apiPort') + '/'
    })
  })
}

// index page
router.get([ '/index' ], function (req, res, next) {
  res.render('sys.index.ejs')
})

// client page
router.get([ '/', /\/page/ ], session.check, function (req, res, next) {
  res.render('index.html')
})

export default router
