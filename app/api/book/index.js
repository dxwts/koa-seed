'use strict'

const router = require('koa-router')()
var controller = require('./book.controller')

router.prefix('/api/1/books')

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.put('/:id', controller.upsert)
router.delete('/:id', controller.destroy)

module.exports = router
