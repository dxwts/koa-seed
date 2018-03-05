const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
    username: String,
    password: {
        String,
    },
    email:{
        String,
    },
},
{
    timestamps: {},
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    usePushEach: true,
    id: false,
    versionKey: false
  });

schema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    }
};

module.exports = mongoose.model('user', schema)