const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const db = mongoose.connect("mongodb://localhost/gameblogapi", {
  useMongoClient: true
});

const gameBlogRouter = require("./routers/gameBlogRouter");
const movieBlogRouter = require("./routers/movieBlogRouter");
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Welcome to my API!");
});

app.use("/api/gameblogs", gameBlogRouter);
app.use("/api/movieblogs", movieBlogRouter);

app.listen(port, function() {
  console.log("Listening on port " + port);
});
