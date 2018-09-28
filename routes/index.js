require("dotenv").config();

var ENV = "development";
var knexConfig = require("../knexfile.js");
var knex = require("knex")(knexConfig[ENV]);
var dbQuery = require("../db/queryHelper")(knex);
var dbInsert = require("../db/insertHelper")(knex);

var express = require("express");
const router = express.Router();
var multer = require("multer");
const { extractWebAnnotations, multerConfig } = require("./helpers.js");
const upload = multer(multerConfig);

const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get("/", (req, res) => {
  res.redirect("/products");
});

/* GET all products */
router.get("/products", async (req, res) => {
  res.json(await dbQuery.getAllProducts());
});

/* GET results for search query stirng */
router.post("/search", async (req, res) => {
  // placeholder for serach query, actual search keyword should be come from req.body
  // APPLE is the placeholder for the serach keyword
  res.json(await dbQuery.searchProductByName("APPLE"));
});

/* POST order to server */
router.post("/orders", async (req, res) => {
  // placeholder for order details query, userId should be come from req.body
  // 1 is the placeholder for the userId
  var orderId = await dbInsert.addOrder(1);

  // placeholder for shopping cart items
  // the actual order should come from the client
  var order = [
    { productId: 1, priceInCents: 25, quantity: 1 },
    { productId: 10, priceInCents: 450, quantity: 2 },
    { productId: 20, priceInCents: 123, quantity: 3 }
  ];

  // calculate thte total value of the shopping cart
  var orderTotal = 0;
  order.forEach(line => {
    orderTotal += line.priceInCents * line.quantity;
  });

  // add each line in cart to line_items table
  order.forEach(async line => {
    await dbInsert.addLineItem(
      orderId[0],
      line.productId,
      line.priceInCents,
      line.quantity
    );
  });

  // add total value of order to orders table
  await dbInsert.addOrderTotal(orderId[0], orderTotal);

  res.sendStatus(200);
});

/* POST image to server for google vision api annotations */
router.post("/annotations", upload.single("image"), (req, res) => {
  const imageBuffer = req.file.buffer;
  Promise.all([
    client.webDetection({
      image: {
        content: imageBuffer
      }
    })
  ])
    .then(results => {
      res.json([
        {
          text: "POST /annotations",
          webAnnotations: extractWebAnnotations(results[0])
        }
      ]);
    })
    .catch(err => {
      console.error("Error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
