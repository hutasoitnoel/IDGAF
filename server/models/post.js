const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let postSchema = new Schema({
    title: {
        type: String
    },
    tags: [],
    post: {
        type: String
    } 
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post