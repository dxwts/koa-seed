// const router = require('koa-router')(); 
const Router = require('koa-router');
const router = new Router();

// router.prefix('/users');

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!';
});

/**
 * @api {get} /users/bar 用户  
 * @apiDescription author：samy  
 * 
 * @apiVersion 0.0.1
 * @apiName bar
 * @apiGroup users
 * 
 * @apiSuccess {Object} code 错误信息
 * @apiSuccess {Object} msg 成功信息
 * {
 * 	code:0,
 *  msg:'请求成功',
 *  data:{}
 * }
 */
router.get('/bar', async (ctx, next) => {
  ctx.body = 'this is a users/bar response!';
});

module.exports = router;
