const mongoose = require('mongoose');

//用户的表结构
// module.exports = new mongoose.Schema({
const schema = new mongoose.Schema({

    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    }

});
// const model = mongoose.model('users', schema);
const model = mongoose.model('User', schema);
module.exports = model;