class Tools {
    constructor(body) {
        Object.assign(this, {
            body
        })
    }

    /**
     * API接口调用返回JSON格式内容
     * @param {Number} code 0表示成功，1表示失败
     * @param {String} msg
     * @param {Objext} data
     */
    setJson(code, msg, data) {
        return this.body = {
            code: code || 0,
            msg: msg || null,
            data: data || null
        }
    }
}

module.exports = Tools