/**
 * Created by huangxinxin on 16/9/13.
 */
import moment from 'moment'
import config from '../config'

function resJsonMaker (data, message = '', error = false) {
  return {
    data: data,
    error: error,
    message: message
  }
}

function getCompleteHost (req) {
  let arr = [ req.protocol, '://', req.hostname ]
  if (config.port) {
    arr.push(':' + config.port)
  }
  return arr.join('')
}

function getCompleteUrl (req) {
  return getCompleteHost(req) + req.originalUrl
}

function logs (prefix) {
  if (prefix) {
    prefix = '[' + prefix + ']'
  }
  return function (msg, err) {
    let args = [ moment().format(config.time.formatStr) + ' ' + prefix + ' => {\n' ]
    if (msg) {
      args.push(msg)
    }
    if (err) {
      args.push('\n Error(\n', err, '\n )')
    }
    args.push('\n}\n')
    console.log.apply(console, args)
  }
}

export {
  resJsonMaker,
  getCompleteHost,
  getCompleteUrl,
  logs
}
