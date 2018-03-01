"use strict";

const Koa = require('koa');
const json = require('koa-json');
// const session = require('koa-session');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const parser = require('koa-body');
const serve = require('koa-static');
// const render = require('koa-ejs');
// const render = require('art-template');
const render = require('koa-art-template');
const logger = require('koa-logger')
const path = require('path');
const router = require('koa-router')();

const config = require('./config');
const utils = require('./lib/utils');
const middlewares = require('./middlewares');
const mongo = require('./db/mongo');

const app = new Koa();
app.use(middlewares.requestUuid);
app.use(middlewares.requestLogger);
app.use(middlewares.errorHandler);

app.keys = config.name;
app.use(session({
    key: config.cookieKey,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    rolling: false,
    store: redisStore({
        host: config.redisSession.host,
        port: config.redisSession.port,
        db: config.redisSession.db,
        keySchema: config.sessionKey
    })
}, app));
new mongo();

// app.use(middlewares.authControl);

app.use(serve(__dirname + '/public', {
    setHeaders: function(res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    }
}));

render(app, {
    root: path.join(__dirname, 'app/views'),
    extname: '.htm',
    debug: !utils.isProduction()
});

app.use(parser({
    files: true,
    multipart: true,
    fields: true,
    formLimit: '10mb',
}));
app.use(json({ pretty: !utils.isProduction() }));
if (utils.isProduction()) {
    app.use(logger());
}

app.use(middlewares.fixRequestBody)
app.use(middlewares.defaultHandler)
// app.use(middlewares.checkParams)

require('./routes')(router);
app.use(router.routes()).use(router.allowedMethods())

module.exports = app;