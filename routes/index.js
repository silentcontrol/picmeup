var express = require('express');
const router = express.Router();
// const getAllAnnotations = require('./helpers.js')

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
      let allAnnotations = [];
      res.json([{
        text: 'POST /annotations',
        // labelAnnotations: extractLabelAnnotations(results[0]),
        // textAnnotations: extractTextAnnotations(results[1]),
        webAnnotations: extractWebAnnotations(results[0])
      }]);
    })
    .catch(err => {
      console.error('Error:', err);
      res.sendStatus(500);
    })
});

/*

  helpers.js

 */

const extractLabelAnnotations = (result) => {
  const labels = result[0].labelAnnotations;
  let allAnnotations = [];
  labels.forEach(label => allAnnotations.push(label.description));
  return allAnnotations;
}

const extractTextAnnotations = (result) => {
  const texts = result[0].textAnnotations;
  let allAnnotations = [];
  texts.forEach(text => {
    allAnnotations.push({
      "description": text.description,
      "score": text.score
    });
  });
  return allAnnotations;
}

const extractWebAnnotations = (result) => {
  const entities = result[0].webDetection.webEntities;
  let allAnnotations = entities.filter(entity => entity.score >= 0.5 && entity.description);
  allAnnotations = allAnnotations.map(entity => {
    return {
      "description": entity.description,
      "score": entity.score
    }
  });
  return allAnnotations;
}



module.exports = router;
