'use strict'

import Koa from 'koa'
import mongoose from 'mongoose'

import config from './config/environment'

mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('error', function (err) {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

var app = new Koa()

require('./config/koa').default(app)
require('./routes').default(app)

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

var port = normalizePort(config.port || '3000')
app.listen(port)

function normalizePort (val) {
  var port = parseInt(val, 10)

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

exports = module.exports = app
