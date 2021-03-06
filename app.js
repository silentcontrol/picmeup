require("dotenv").config();

var ENV = "development";
var knexConfig = require("./knexfile.js");
var knex = require("knex")(knexConfig[ENV]);
var dbQuery = require("./db/queryHelper")(knex);
var dbInsert = require("./db/insertHelper")(knex);

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var ownerRouter = require("./routes/owner");
var cors = require("cors");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.set("secret", process.env.secret);
=======
app.use('/owner', ownerRouter);
app.use('/', indexRouter);
app.set('secret', process.env.secret);
>>>>>>> fab17ea5901168ee445d98b70d6a312bf839b811

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
