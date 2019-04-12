const TagModel = require('../models/tag')

const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// console.log(vision)

module.exports = {

  create(req, res, next) {
    // console.log(req.file)
    client
      .labelDetection(req.file.cloudStoragePublicUrl)
      .then(results => {
        const labels = results[0].labelAnnotations;
        let tagPromiseAll = []
        labels.forEach(name => {
          tagPromiseAll.push(TagModel.create({tagName: name.description}))
        })

        return Promise.all(tagPromiseAll)
      })
      .then(tags => {
        console.log(tags)
        res.status(201).json(tags)
      })
      .catch(err => {
        console.error('ERROR:', err);
        res.status(500).json(err)
      })
  },

  // findTag(req, res) {
  //   // console.log(req.query.q)
  //   if (req.query.q) {
  //     TagModel
  //       .find({
  //         tagName: req.query.q
  //       })
  //       .then()
      
  //   } else {
  //     console.log('masuk else')
  //   }
  // }
}