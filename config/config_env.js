let env = process.env.NODE_ENV || 'development';
const appName = 'koa-seed';
let config = {
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
}
module.exports = config[env];