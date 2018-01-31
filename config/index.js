const appName = 'XXX';
const host = "http://xxx.com"; // 系统主机地址
const host_doc = "http://xxx.com:5002";　 // 系统文档主机地址

export default {
    name:appName,
    db:{
        mongo: {
            development: {
                connectionString: 'mongodb://127.0.0.1:27017/XXX_dev'
            },
            production: {
                connectionString: 'mongodb://127.0.0.1:27017/XXX'
            }
        },
        redis: {
            development: {
                connectionString: 'redis://127.0.0.1:27017'
            },
            production: {
                connectionString: 'redis://127.0.0.1:27017',
            }
        },
    },
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    upload: {
        tmp: 'public/tmp/',
        path: 'public/uploads/'
    },
    log: {
        "level": "debug"
    },
}