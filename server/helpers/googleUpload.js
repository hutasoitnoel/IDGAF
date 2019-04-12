'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const fs = require('fs');

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = 'idgaf' + Date.now()
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      console.log(req.file.cloudStoragePublicUrl)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

const uploads = (req, res, next) => {
  const { image } = req.body;
  const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/gif;base64,/, "");
  const newFilename = Date.now() + '.' + 'gif';
  const newFile = 'uploads/' + newFilename;
  req.fileName = newFilename
  req.filePath = newFile
  // console.log(newFile, 'NAMA FILE YANG DI UPLOADS FOLDER')
  fs.writeFile(newFile, base64Data, 'base64', function (err) {
      if (err) {
          console.log(err);
          next()
      } else {
          next()
      }
  });
}

const goToGCS = (req, res) => {
  //-
  // Upload a file from a local path.
  //-
  bucket.upload(req.filePath, function(err, file, apiResponse, next) {
    // Your bucket now contains:
    // - "image.png" (with the contents of `/local/path/image.png')
  
    // `file` is an instance of a File object that refers to your new file.
    // console.log(err);
    // console.log('FILE ============')
    // console.log(file);
    // console.log('API ============')
    // console.log(apiResponse);
    req.fileUrl = getPublicUrl(req.fileName);
    // Assuming that 'path/file.txt' is a regular file.
    fs.unlink(req.filePath, (err) => {
      if (err) throw err;
      console.log(`${req.filePath} was deleted`);
    });

    next();
    // res.send({err, file, apiResponse});
  });
  
}


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  uploads,
  goToGCS
}