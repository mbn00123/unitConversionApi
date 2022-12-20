"use strict";

const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
const config = require("config");
const fileUpload = require("express-fileupload");
const cors = require("cors");

Date.prototype.toJSON = function () {
  return moment(this).format();
};

let port = process.env.PORT || 3109;
let app = express();

let server = app.listen(port, function () {
  console.info(`Starting server listening on port ${port} in ${app.settings.env} mode`);
  console.info("server time is " + new Date());
});

app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(expressValidator());
// app.use(express.static(config.image.dir));

if (process.env.NODE_ENV != "production") {
  app.use(cors());
} else {
  app.use(function (req, res, next) {
    

    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Accept, Authorization, Branch"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });
}

app.use("/", require("./route"));
app.get("/", function (req, res) {
  res.send("Hello API");
});

module.exports = {
  app,
  server,
};