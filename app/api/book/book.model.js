'use strict'

import mongoose from 'mongoose'

var BookSchema = new mongoose.Schema({
  title: String,
  authers: String,
  des: String
}, {
  timestamps: {}
})

export default mongoose.model('Book', BookSchema)
