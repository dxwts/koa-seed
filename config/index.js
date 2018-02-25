const path = require('path')
const Redis = require('ioredis');
const rootPath = path.normalize(__dirname + '/..')

const appName = 'koa-seed';
const host = "http://xxx.com"; // 系统主机地址
const host_doc = "http://xxx.com:5002";　 // 系统文档主机地址


// export default {
module.exports = {
    development: {
        root: rootPath,
        app: {
            name: appName
        },
        port: process.env.PORT || 8888,
        db: `mongodb://127.0.0.1:27017/${appName}_dev`,
        redis: 'redis://127.0.0.1:6379',
    },
    production: {
        root: rootPath,
        app: {
            name: appName
        },
        port: process.env.PORT || 8888,
        db: `mongodb://127.0.0.1:27017/${appName}`,
        redis: 'redis://127.0.0.1:6379',
    },

    redis: new Redis({
        host: "127.0.0.1",
        port: 6379,
        db: "1"
    }),
    redisSession: { // session 使用的redis
        "host": "127.0.0.1",
        "port": 6379,
        "db": "7"
    },

    name: appName,
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    upload: {
        tmp: 'public/tmp/',
        path: 'public/uploads/'
    },
    log: {
        "level": "debug"
    },

    "host": host, //后面不能加斜杠
    "host_doc": host_doc,

    "log": {
        "level": "debug"
    },

    "sessionKey": appName + "_app:sess",
    "cookieKey": appName + "_app:sess",
}