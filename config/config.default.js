export default {
    secret: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
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
    upload: {
        tmp: 'public/tmp/',
        path: 'public/uploads/'
    },
    log: {
        path: 'logs/',
        log_date: 'logs/access',
        log_file: 'logs/app.log',
        log_error: 'logs/errors',
    },
}