var express = require('express');
const router = express.Router();
const extractWebAnnotations = require('./helpers.js')

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/products');
});

/* GET list of products */
router.get('/products', (req, res) => {
  res.json([{
    text: 'GET /products routing'
  }]);
});

/* GET results for search query stirng */
router.post('/search', (req, res) => {
  res.json([{
    text: 'GET /search routing'
  }]);
});

router.post('/orders', (req, res) => {
  res.sendStatus(200);
});

router.post('/annotations', (req, res) => {
  const imageURL = './resources/IMG_5019.JPG';
  console.log('req.body.image:', req.body.image);
  // const allAnnotations = getAllAnnotations(req.body.image);
  const allAnnotations = [];
  //client.labelDetection(imageURL), client.textDetection(imageURL),
  Promise.all([client.webDetection(imageURL)])
    .then(results => {
      res.json([{
        text: 'POST /annotations',
        webAnnotations: extractWebAnnotations(results[0])
      }]);
    })
    .catch(err => {
      console.error('Error:', err);
      res.sendStatus(500);
    })
});

module.exports = router;
