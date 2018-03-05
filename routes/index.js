const {help} = require('../app/controllers')

module.exports = function(router) {
    new help(router)
}