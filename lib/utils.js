const path = require('path');
const moment = require('moment');
const fs = require('fs');

module.exports = {
    isProduction: () => { // 判断是否是生产环境
        return process.env.NODE_ENV === 'production';
    },
    baseDir: function() { // 获取项目的根路径
        return path.dirname(__dirname);
    },
    timeShow: function(v, format) { // 将数据库的时间戳值展示为易读的值
        let time_format = format || 'YYYY-MM-DD HH:mm';
        return moment.unix(v).format(time_format);
    },
}