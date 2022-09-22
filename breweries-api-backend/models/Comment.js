const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    brewery:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
})

module.exports = mongoose.model('Comment' , commentSchema)