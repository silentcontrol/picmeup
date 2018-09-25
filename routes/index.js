var express = require('express');
var router = express.Router();

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

  // res.sendStatus(200);
  res.json([{
    text: 'POST /annotations routing'
  }])
});

module.exports = router;
