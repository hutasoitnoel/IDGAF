const TagModel = require('../models/tag')

module.exports = {

  async create(req, res, next) {
    try {
      let { tagName } = req.body
      let promiseArr = []
  
      tagName.forEach(name => {
        promiseArr.push(TagModel.create({tagName: name}))
      })
  
      let tags = await Promise.all(promiseArr)
      req.file.tags = tags
      // res.status(201).json(tags)
      next()
    } catch(err) {
      // res.status(500).json(err)
      next()
    }
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