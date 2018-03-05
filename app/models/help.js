const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    title: String,
    content: String,
    create_at: {
        type: Date,
        default: Date.now(),
    },
    update_at: Date,
})

module.exports = mongoose.model('help', Schema)