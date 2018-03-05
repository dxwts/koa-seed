const codeMap = {
    '-1': 'fail',
    '200': 'success',
    '401': 'token expired',
    '500': 'server error',
    '10001': 'params error'
}

const utilFn = {
    resBody(ctx, code, msg, data) {
        return ctx.body = {
            code: code || 0,
            msg: msg || codeMap['200'],
            data: data || null
        }
    }
}

module.exports = utilFn;