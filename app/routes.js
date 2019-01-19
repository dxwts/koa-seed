'use strict'

import book from './api/book'

export default function (app) {
  app.use(book.routes(), book.allowedMethods())
}
