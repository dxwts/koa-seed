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
        this.dblink = config.config.db;

        const opts = {
            server: {
                socketOptions: {
                  socketTimeoutMS: 0,
                  keepAlive: true
                },
                reconnectTries: 3
              },
        }

        mongoose
            .connect(this.dblink, opts)
            .then(
                () => { console.log('------ Mongodb connection succeed ------') },
                err => { console.log('------ Mongodb connection failed ------' + err) }
            );
        mongoose.Promise = global.Promise;
    }
}
module.exports = Mongo