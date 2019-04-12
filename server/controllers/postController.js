const Post = require('../models/post');
// const upload = require('../helpers/googleUpload');


class Controller {
  static findAll(req, res) {
    Post.find({})
      .populate('tags')
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }

  static find(req, res) {
    Post.findById(req.params.id)
      .populate('tags')
      .then(post => {
        if (!post) {
          res.status(404).json({ message: 'not found' })
        } else {
          res.status(200).json(post);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }

  static update(req, res) {
    Post.update({
      title: req.body.title,
      tags: req.body.tags,
      post: req.body.post
    })
      .then(() => {
        res.status(200).json({ message: 'update success' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }

  static delete(req, res) {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          res.status(404).json({ message: 'not found' })
        } else {
          return post.delete();
        }
      })
      .then(() => {
        res.status(200).json({ message: 'delete success' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }

  static create(req, res) {
    console.log(req.fileUrl, '================')
    let latest = null
    Post.create({
      title: req.body.title,
      post: req.fileUrl
    })
      .then(newPost => {
        latest = newPost
        return Post.findByIdAndUpdate(newPost._id, {
          $push: { tags: req.body.selectedTags }
        })
      })
      .then(pushed => {
        res.status(201).json(latest);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })

  }

  static generateTags(req, res) {
    const url = req.file.cloudStoragePublicUrl;
    const tags = req.file.tags;
    res.status(201).json({ url, tags })
  }
}

module.exports = Controller;

