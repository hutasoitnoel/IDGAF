const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema({
    title: {
        type: String
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    post: {
        type: String
    } 
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post