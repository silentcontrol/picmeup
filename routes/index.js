var express = require('express');
const router = express.Router();
var multer = require('multer');
const { extractWebAnnotations, multerConfig } = require('./helpers.js');
const upload = multer(multerConfig);

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

router.post('/annotations', upload.single('image'), (req, res) => {
  // const imageURL = './resources/IMG_5019.JPG';
  console.log(req.file)
  const imageBuffer = req.file.buffer;
  // const allAnnotations = getAllAnnotations(req.body.image);
  const allAnnotations = [];
  Promise.all([client.webDetection({
    image: {
      'content': imageBuffer
    }
  })])
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
