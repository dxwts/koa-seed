const router = require('koa-router')(); 
// const Router = require('koa-router')(); 
// const router = new Router();

// router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!';
});

module.exports = router;
