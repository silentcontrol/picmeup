var express = require('express');
var router = express.Router();

//   AAAAA  DDDDDD  MM       MM IIIIIIII NN    NN
//  AA   AA DD   DD MMMM   MMMM    II    NNNN  NN
//  AA   AA DD   DD MM MM MM MM    II    NN NN NN
//  AAAAAAA DD   DD MM  MM   MM    II    NN  NNNN
//  AA   AA DDDDDD  MM       MM IIIIIIII NN    NN

/*  GET all current orders */
router.get('/orders', (req, res) => {
  res.json([{
    text: 'GET /orders'
  }])
});

/* GET order ID */
router.get('/orders/:id', (req, res) => {
  res.json([{
    text: 'GET /orders/:id'
  }])
});

/* POST order ID */
router.post('/orders/:id', (req, res) => {
  res.json([{
    text: 'POST /orders/:id'
  }])
});

/* GET all old orders */
router.get('/history', (req, res) => {
  res.json([{
    text: 'GET /history'
  }]);
});

/* GET old order id */
router.get('/history/:id', (req, res) => {
  res.json([{
    text: 'GET /history/:id'
  }]);
});

router.get('/search', (req, res) => {
  res.json([{
    text: 'GET /search'
  }])
});

module.exports = router;
