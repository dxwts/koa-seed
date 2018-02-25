const bluebird = require('bluebird')
const mongoose = require('mongoose')
const mongoomise = require('mongoomise')

class Mongo {
    constructor(app, config) {
        Object.assign(this, {
            app,
            config,
        })

        this.init()
    }

    init() {
        this.env = this.app.get('env')
        this.dblink = this.config[process.env.NODE_ENV || 'development']['db'];

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

        mongoomise.promisifyAll(mongoose, bluebird)
    }
}

export default Mongo