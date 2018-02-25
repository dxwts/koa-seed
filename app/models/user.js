const mongoose = required('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
    username: String,
    password: {
        String,
    },
    email:{
        String,
        required: [true, 'email field is required'],
    },
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