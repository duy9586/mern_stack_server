const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    attachment: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    isdelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Posts', PostSchema, "Posts");