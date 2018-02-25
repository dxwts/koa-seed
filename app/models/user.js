const mongoose = required('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
    username: String,
    password: {
        String,
        required: [false, '用户密码'],
    },
    email:{
        String,
        required: [true, 'email field is required'],
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

schema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

schema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    }
};


export default mongoose.model('user', schema)