/**
 * 封装model基本的增删改查操作【CRUD】对应RestFull 操作
 * 增加(Create)、读取(Retrieve)(重新得到数据)、更新(Update)和删除(Delete)
 *
 * 增加 post      save
 * 查询(全部，单个) getAll get      find | findOne
 * 修改 put     update
 * 删除 delete     remove
 *
 * @class RestBase
 */
class RestBase {
    constructor(model) {
        Object.assign(this, {
            model,
        })
    }

    /**
     * 新建一个资源
     * @param  {Object} body
     * @return {Function}
     */
    post(body = {}) {
        return new this.model(body).save()
    }


    /**
     * 获取资源列表；分页查询
     * @param  {Object} query
     * @param  {Object} fields
     * @param  {Object} options
     * @return {Function}
     */
    getAll(query = {}, fields = {}, options = {}) {
        const page = Number(options.page) || 1
        const limit = Number(options.limit) || 10
        const skip = (page - 1) * limit
        const sort = options.sort || { create_at: -1 }

        console.log('-----getAll--->');

        return this.model.find(query)
        // return this.model.find(query, fields, {
        //     skip: skip,
        //     limit: limit,
        //     sort: sort,
        // })
    }

    /**
     * 获取某个指定资源的信息
     * @param  {Object} query
     * @param  {Object} fields
     * @return {Function}
     */
    get(query = {}, fields = {}) {
        return this.model.findOne(query, fields)
    }

    /**
     * 更新某个指定资源的信息
     * @param  {Object} query
     * @param  {Object} body
     * @param  {Object} options
     * @return {Function}
     */
    put(query = {}, body = {}, options = {}) {
        body.update_at = Date.now()
        options.upsert = !0
        options.new = !0
        return this.model.findOneAndUpdate(query, body, options)
    }


    /**
     * 删除某个指定资源
     * @param  {Object} query
     * @param  {Object} options
     * @return {Function}
     */
    delete(query = {}, options = {}) {
        return this.model.findOneAndRemove(query, options)
    }
}
module.exports = RestBase