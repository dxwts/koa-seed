const RestBase = require('./baserest')
const {user, help} = require('../models')

module.exports = {
    user: new RestBase(user),
    help: new RestBase(help),
}