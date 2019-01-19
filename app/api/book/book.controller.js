/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/1/books              ->  index
 * POST    /api/1/books              ->  create
 * GET     /api/1/books/:id          ->  show
 * PUT     /api/1/books/:id          ->  upsert
 * PATCH   /api/1/books/:id          ->  patch
 * DELETE  /api/1/books/:id          ->  destroy
 */

'use strict'

import Book from './book.model'

export async function index (ctx, next) {
  let books = await Book.find({}).exec()
  ctx.body = books
}

export async function show (ctx, next) {
  let book = await Book.findById(ctx.params.id).exec()
  ctx.body = book
}

export async function create (ctx, next) {
  let book = await Book.create(ctx.request.body)
  ctx.body = book
}

export async function upsert (ctx, next) {
  let req = ctx.request
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id')
  }
  let book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()
  ctx.body = book
}

export async function destroy (ctx, next) {
  let book = await Book.findById(ctx.params.id).exec()
  await book.remove()
  ctx.body = { result: 'success' }
}
