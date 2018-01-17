const express = require("express");
const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/gameblogapi", {
  useMongoClient: true
});

const app = express();

const port = process.env.PORT || 8080;

app.get("/", function(req, res) {
  res.send("Welcome to my API!");
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
