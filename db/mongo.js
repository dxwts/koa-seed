const bluebird = require('bluebird')
const mongoose = require('mongoose')

const config = require('../config')
class Mongo {
    constructor(app, config) {
        Object.assign(this, {
            app,
            config,
        })

        this.init()
    }

    init() {
        this.dblink = config[process.env.NODE_ENV || 'development']['db'];

        const opts = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }

        mongoose
            .connect(this.dblink, opts)
            .connection
            .on('error', err => console.log('------ Mongodb connection failed ------' + err))
            .on('open', () => console.log('------ Mongodb connection succeed ------'))

        mongoose.Promise = global.Promise;
    }
}

// export default Mongo
module.exports = Mongo