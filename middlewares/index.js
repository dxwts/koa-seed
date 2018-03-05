const bytes = require('bytes')
const uuid = require('uuid')

const midTool = require('../app/common/mid_tool')
const logger = require('../lib/logger')

module.exports = {
    resMid: async(ctx, next) => {
        ctx.util = midTool
        return next()
    },
    requestUuid: async(ctx, next) => {
        ctx.req_id = uuid.v1(); //Version 1 (timestamp)
        ctx.log = logger.child({ reqId: ctx.req_id });
        await next();
        ctx.set('ReqId', ctx.req_id);
    },

    requestLogger: async(ctx, next) => {
        let start = Date.now();
        await next();
        let duration = Date.now() - start;
        let len = ctx.length;
        let length;
        // get the human readable response length
        if (~[204, 205, 304].indexOf(ctx.status)) {
            length = '';
        } else if (null == len) {
            length = '-';
        } else {
            length = bytes(len);
        }
        if (/^\/(activity|css|dist|fonts|js|src|text|res|img|apidoc).*/.test(ctx.req.url) == false) {
            let reqInfo = {
                duration: duration,
                uid: ctx.uid,
                url: ctx.req.url,
                type: ctx.req.method,
                cookie: ctx.req.headers.cookie,
                user_agent: ctx.req.headers["user-agent"],
                content_type: ctx.req.headers["content-type"],
                body: ctx.request.body,
                res_content_type: ctx.response.header["content-type"],
                res_status_code: ctx.res.statusCode,
                res_body: ctx.body,
                res_ip: ctx.ip,
            };
            ctx.log.info(reqInfo, "------请求信息------->");
        }
    },

    errorHandler: async(ctx, next) => { // 错误处理中间件
        try {
            await next();
        } catch (err) {
            if (err.status && err.status < 500) {
                logger.warn(err.stack || err);
            } else {
                logger.error(err.stack || err);
            }
            ctx.status = err.status || 500;
            let message = 'Internal Server Error',
                code = -1;
            if (err.message) {
                if (err.message.indexOf(';;')) {
                    let msgs = err.message.split(';;');
                    message = msgs[0];
                    code = msgs[1];
                } else {
                    message = JSON.stringify(err.message);
                }
            }
            ctx.util.resBody(ctx,code, message, {});
        }
    },

    fixRequestBody: async(ctx, next) => { // 尝试将字符串值的字段转化为JSON对象
        if (ctx.method == "POST" && ctx.header["Content-Type"] !== 'application/json') {
            let rbody = ctx.request.body;
            for (let k in rbody) { // 遍历所有键值，能转化为对象则转化，不能则不处理
                if (typeof rbody[k] == "string" && (~rbody[k].indexOf('{') || ~rbody[k].indexOf('['))) {
                    try {
                        rbody[k] = JSON.parse(rbody[k]);
                    } catch (e) {}
                }
            }
        }
        await next();
    },
    defaultHandler: async(ctx, next) => {
        await next();
        if (ctx.path == '/') {
            ctx.body = "Welcome to root";
        } else if (ctx.path == '/favicon.ico') {
            ctx.body = "";
        } else {
            if (ctx.body === undefined) {
                await ctx.render('web/404');
            }
        }
    },
};