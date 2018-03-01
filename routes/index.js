const help = require('../app/controllers/help')

module.exports = function(router) {
    new help(router)
}