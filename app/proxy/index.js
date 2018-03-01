const RestBase = require('./baserest')
const user = require('../models/user')
const help = require('../models/help')

// export default {
module.exports = {
    user: new RestBase(user),
    help: new RestBase(help),
}