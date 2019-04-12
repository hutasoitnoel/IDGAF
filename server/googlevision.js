require('dotenv').config()
const express = require('express')
const app = express()
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Performs label detection on the image file
client
  .labelDetection('./danau.jpeg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

app.listen(3000, () => console.log('listen to port 3000'))