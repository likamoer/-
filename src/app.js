import express from 'express'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import accessLog from './access'
import config from './config'
import {logs, resJsonMaker, getCompleteUrl} from './commons/utils'
import session from './commons/session'
import routersProcess from './routes/index'
import viewsProcess from './views/index'
import './model/index'

let _logs = logs('APP')
let app = express()

// 启用访问日志
accessLog(app)

// set port
app.set('port', config.port)

// view engine setup
app.set('views', config.path.viewsAbs)
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

// static
app.use(express.static(config.path.publicAbs))

// favicon
app.use(favicon(config.path.faviconAbs))

// bodyParser
app.use(bodyParser.json({
  limit: config.limit
}))
app.use(bodyParser.urlencoded({
  extended: false,
  limit: config.limit
}))

// cookieParser
app.use(cookieParser())

// session
app.use(session.init() || function (req, res, next) {
  next()
})

// view routers
app.use(viewsProcess)

// routers
app.use(/\/api/, routersProcess)

// Error handler
app.use(function (req, res) {
  _logs('404:`' + getCompleteUrl(req) + '`')
  if (req.xhr) {
    res.status(404).json(resJsonMaker('', '404 Not Found', true))
  } else {
    res.status(404).render('sys.error.ejs', { title: config.app.title, message: '404 Not Found' })
  }
})

export default app
