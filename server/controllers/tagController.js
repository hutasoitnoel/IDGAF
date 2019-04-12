const TagModel = require('../models/tag')
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

module.exports = {
  
  create(req, res, next) {
    console.log(req.file);
    client
      .labelDetection(req.file.cloudStoragePublicUrl)
      .then(results => {
        const labels = results[0].labelAnnotations;
        let tagPromiseAll = []
        labels.forEach(name => {
          tagPromiseAll.push(TagModel.create({tagName: name.description}))
        })
        // console.log(tagPromiseAll);
        return Promise.all(tagPromiseAll)
      })
      .then(tags => {
        // console.log('>>>>', tags);
        // res.status(201).json(tags)
        req.file.tags = tags;
        next();
      })
      .catch(err => {
        console.error('ERROR:', err);
        // res.status(500).json(err)
        next();
      })
  },

  findTag(req, res) {
    // console.log(req.query.q)
    if (req.query.q) {
      TagModel
        .find({
          tagName: req.query.q
        })
        .then()
      
    } else {
      console.log('masuk else')
    }
  }
}