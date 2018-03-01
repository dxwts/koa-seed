
const Promise = require('bluebird')
const proxy = require('../proxy')
const retTool = require('../common/ret_tool')

class Ctrl {
    constructor(router) {
        Object.assign(this, {
            router,
            model: proxy.help,
        })
        this.init()
    }

    init() {
        this.routes()
    }

    /**
     * 注册路由;
     * restfull 的完整示例
     * CRUD 增查改删
     */
    routes() {
        this.router.get('/help', this.getAll.bind(this))
        this.router.get('/help/:id', this.get.bind(this))
        this.router.post('/help', this.post.bind(this))
        this.router.put('/help/:id', this.put.bind(this))
        this.router.delete('/help/:id', this.delete.bind(this))
    }

    //api公共类Header Success
    /**
     * @apiDefine Header
     * @apiHeader {String} Authorization jsonwebtoken
     */

    /**
     * @apiDefine Success
     * @apiSuccess {Number} code 标识码，0表示成功，1表示失败
     * @apiSuccess {String} msg 标识信息
     * @apiSuccess {Object} data 数据内容
     */


    /**
     * @api {get} /help 列出所有资源
     * @apiDescription 作者：samyzhang
     * @apiName getAll
     * @apiGroup help
     * 
     * @apiVersion 0.0.1
     *
     * @apiParam {String} [page=1] 指定第几页
     * @apiParam {String} [limit=10] 指定每页的记录数
     *
     * @apiPermission none
     * @apiSampleRequest /help
     *
     * @apiUse Header
     * @apiUse Success
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 0,
     *       "msg": "调用成功",
     *       "data": [{
     *       	"_id": "_id",
     *       	"title": "title",
     *       	"content": "content",
     *       	"create_at": "create_at",
     *       	"update_at": "update_at"
     *       }]
     *     }
     */
    getAll(ctx, next) {
        const query = {}

        const fields = {}

        const options = {
            page: ctx.query.page,
            limit: ctx.query.limit,
        }
        console.log('-----getAll---options---->', JSON.stringify(options))
        // Promise.all([
        //         // this.model.count(query),
        //         this.model.getAll(query, fields, options),
        //     ])
        //     .then(docs => {
        //         console.log('---docs----->' + JSON.stringify(docs));
        //        return ctx.body = retTool.retJson(0, '调用成功', docs[0])
        //     })
        //     // .catch(err => next(err))
        //     .catch(err => {
        //        console.log('---err----->' + JSON.stringify(err));
        //     })

        // let data = await model.getAll(query, fields, options)
        // if (data) {
        //     ctx.body = retTool.retJson(0, '调用成功', data)
        // } else {
        //     ctx.throw("该商品不存在:", 200); return;
        // }
        ctx.body = retTool.retJson(0, '调用成功', 'help调用测试')
    }

    /**
     * @api {get} /help/:id 获取某个指定资源的信息
     * @apiDescription 获取某个指定资源的信息
     * @apiName get
     * @apiGroup help
     *
     * @apiParam {String} id 资源ID
     *
     * @apiPermission none
     * @apiSampleRequest /help/:id
     *
     * @apiUse Header
     * @apiUse Success
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 0,
     *       "msg": "调用成功",
     *       "data": {
     *       	"_id": "_id",
     *       	"title": "title",
     *       	"content": "content",
     *       	"create_at": "create_at",
     *       	"update_at": "update_at"
     *       }
     *     }
     */
    get(ctx, next) {
        const query = {
            _id: ctx.params.id
        }

        const fields = {}

        this.model.get(query, fields)
            .then(doc => {
                if (!doc) return ctx.body = retTool.retJson(1, '资源不存在或已删除')
                return ctx.body = retTool.retJson(0, '调用成功', doc)
            })
            .catch(err => next(err))
    }

    /**
     * @api {post} /help 新建一个资源
     * @apiDescription 新建一个资源
     * @apiName post
     * @apiGroup help
     *
     * @apiParam {String} title 标题
     * @apiParam {String} content 内容
     *
     * @apiPermission none
     * @apiSampleRequest /help
     *
     * @apiUse Header
     * @apiUse Success
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 0,
     *       "msg": "新增成功",
     *       "data": {
     *       	"_id": "_id"
     *       }
     *     }
     */
    post(ctx, next) {
        const body = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
        }

        this.model.post(body)
            .then(doc => ctx.body = retTool.retJson(0, '新增成功', { _id: doc._id }))
            .catch(err => next(err))
    }

    /**
     * @api {put} /help/:id 更新某个指定资源的信息
     * @apiDescription 更新某个指定资源的信息
     * @apiName put
     * @apiGroup help
     *
     * @apiParam {String} id 资源ID
     * @apiParam {String} [title] 标题
     * @apiParam {String} [content] 内容
     *
     * @apiPermission none
     * @apiSampleRequest /help/:id
     *
     * @apiUse Header
     * @apiUse Success
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 0,
     *       "msg": "更新成功",
     *       "data": {
     *       	"_id": "_id",
     *       	"title": "title",
     *       	"content": "content",
     *       	"create_at": "create_at",
     *       	"update_at": "update_at"
     *       }
     *     }
     */
    put(ctx, next) {
        const query = {
            _id: ctx.params.id
        }

        const body = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
        }

        this.model.put(query, body)
            .then(doc => {
                if (!doc) return ctx.body = retTool.retJson(1, '资源不存在或已删除')
                return ctx.body = retTool.retJson(0, '更新成功', doc)
            })
            .catch(err => next(err))
    }

    /**
     * @api {delete} /help/:id 删除某个指定资源
     * @apiDescription 删除某个指定资源
     * @apiName delete
     * @apiGroup help
     *
     * @apiParam {String} id 资源ID
     * @apiSampleRequest /help/:id
     *
     * @apiPermission none
     *
     * @apiUse Header
     * @apiUse Success
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "code": 0,
     *       "msg": "删除成功",
     *       "data": null
     *     }
     */
    delete(ctx, next) {
        const query = {
            _id: ctx.params.id
        }
        this.model.delete(query)
            .then(doc => {
                if (!doc) return ctx.body = retTool.retJson(1, '资源不存在或已删除')
                return ctx.body = retTool.retJson(0, '删除成功')
            })
            .catch(err => next(err))
    }
}

// export default Ctrl
module.exports = Ctrl