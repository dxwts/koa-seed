
const proxy = require('../proxy')
const Promise = require('bluebird')

class Ctrl {
    constructor(app) {
        Object.assign(this, {
            app,
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
        this.app.get('/help', this.getAll.bind(this))
        this.app.get('/help/:id', this.get.bind(this))
        this.app.post('/help', this.post.bind(this))
        this.app.put('/help/:id', this.put.bind(this))
        this.app.delete('/help/:id', this.delete.bind(this))
    }

    //api公共类Header Success
    /**
     * @apiDefine Header
     * @apiHeader {String} Authorization jsonwebtoken
     */

    /**
     * //meta 状态描述
     * //{Number} meta.code 标识码，0表示成功，1表示失败
     *
     * @apiDefine Success
     * @apiSuccess {Number} code 标识码，0表示成功，1表示失败
     * @apiSuccess {String} msg 标识信息
     * @apiSuccess {Object} data 数据内容
     */


    /**
     * @api {get} /help 列出所有资源
     * @apiDescription 列出所有资源
     * @apiName getAll
     * @apiGroup help
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
    getAll(req, res, next) {
        const query = {}

        const fields = {}

        const options = {
            page: req.query.page,
            limit: req.query.limit,
        }

        Promise.all([
                this.model.countAsync(query), //查总数
                this.model.getAll(query, fields, options), //查详细的数组
            ])
            .then(docs => {
                res.tools.setJson(0, '调用成功', {
                    items: docs[1],
                    paginate: res.paginate(Number(options.page), Number(options.limit), docs[0]), // docs[0]总数量
                })
            })
            .catch(err => next(err))
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
    get(req, res, next) {
        const query = {
            _id: req.params.id
        }

        const fields = {}

        this.model.get(query, fields)
            .then(doc => {
                if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
                return res.tools.setJson(0, '调用成功', doc)
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
    post(req, res, next) {
        const body = {
            title: req.body.title,
            content: req.body.content,
        }

        this.model.post(body)
            .then(doc => res.tools.setJson(0, '新增成功', { _id: doc._id }))
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
    put(req, res, next) {
        const query = {
            _id: req.params.id
        }

        const body = {
            title: req.body.title,
            content: req.body.content,
        }

        this.model.put(query, body)
            .then(doc => {
                if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
                return res.tools.setJson(0, '更新成功', doc)
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
    delete(req, res, next) {
        const query = {
            _id: req.params.id
        }
        this.model.delete(query)
            .then(doc => {
                if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
                return res.tools.setJson(0, '删除成功')
            })
            .catch(err => next(err))
    }
}

// export default Ctrl
module.exports = Ctrl