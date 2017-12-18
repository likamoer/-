/**
 * Module dependencies.
 */

import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'
import config from '../config'
import app from '../app'
import { logs } from '../commons/utils'

// logs
let _logs = logs('APP')

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(config.port)
let apiPort = port + 1
app.set('port', port)
app.set('apiPort', apiPort)

/**
 * Create HTTP server.
 */

let server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  let bind = 'Port ' + config.port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  _logs('访问地址: ' + config.secheme + '://ip:' + port + '/')
  _logs('APIDoc: ' + config.secheme + '://ip:' + apiPort + '/')
}

/**
 * API Server
 **/

if (process.env.NODE_ENV !== 'production') {
  http.createServer(function (request, response) {
    try {
      let requestUrl = url.parse(request.url).pathname
      if (requestUrl === '/') {
        requestUrl = '/index.html'
      }
      response.writeHead(200)
      let fileStream = fs.createReadStream(path.join(config.path.base, '/bin/apidoc', requestUrl))
      fileStream.pipe(response)
      fileStream.on('error', function (e) {
        response.writeHead(404) // assume the file doesn't exist
        response.end()
      })
    } catch (e) {
      response.writeHead(500)
      response.end()
    }
  }).listen(apiPort)
}
