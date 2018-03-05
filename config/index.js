
const Redis = require('ioredis');
const config_env = require('./config_env');
const {appName, host, host_doc} = require('./constant');

module.exports = {
    config: config_env,
   
    redis: new Redis({
        host: "127.0.0.1",
        port: 6379,
        db: "1"
    }),
    redisSession: {
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