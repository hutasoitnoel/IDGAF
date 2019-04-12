const TagModel = require('../models/tag')
const PostModel = require('../models/post')
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

module.exports = {

  async create(req, res, next) {
    console.log(typeof req.filePath, req.filePath, 'ini req file pathhhhhh')
    try {
      let results = await client
        .labelDetection(req.filePath)
      const labels = results[0].labelAnnotations;
      let tagPromiseAll = []
      labels.forEach(name => {
        tagPromiseAll.push(TagModel.create({ tagName: name.description }))
      })

      let tags = await Promise.all(tagPromiseAll)
      console.log(tags)
      res.status(201).json(tags)
    } catch (err) {
      console.log(err, 'ininni====================')
    }
  },
  // })
  // .catch(err => {
  // console.error('ERROR:', err);
  // res.status(500).json(err)
  // })
  // },

  findTag(req, res) {
    PostModel.find({})
      .populate({
        path: 'tags',
      })
      .then(posts => {
        const searchResult = posts.filter(post => post.tags.find(tag => tag.tagName.toLowerCase() === req.query.q.toLowerCase()));
        res.status(200).json(searchResult)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}