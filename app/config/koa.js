'use strict'

import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

export default function (app) {
  onerror(app)

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  app.use(json())
  app.use(logger())

  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}
