require('dotenv').config();

var ENV = 'development';
var knexConfig = require('../knexfile.js');
var knex = require('knex')(knexConfig[ENV]);
var dbQuery = require('../db/queryHelper')(knex);
var dbInsert = require('../db/insertHelper')(knex);

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
router.get('/products', async (req, res) => {
  await dbInsert.addProduct('hey you', 1000);
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

/* POST order to server */
router.post('/orders', (req, res) => {
  res.sendStatus(200);
});

/* POST image to server for google vision api annotations */
router.post('/annotations', upload.single('image'), (req, res) => {
  const imageBuffer = req.file.buffer;
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
