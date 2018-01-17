const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const GameBlog = require("./models/gameblog");

//GET
router.get("/", function(req, res) {
  let query = {};

  if (req.query.title) {
    query.title = req.query.title;
  }

  GameBlog.find(query, function(err, gameblogs) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(gameblogs);
    }
  });
});

//GET BY ID
router.get("/:id", function(req, res) {
  const id = req.params.id;

  GameBlog.findById(id, function(err, gameblog) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(gameblog);
    }
  });
});

//POST
router.post("/", function(req, res) {
  let gameblog = new GameBlog(req.body);

  gameblog.save();

  res.status(201).send(gameblog);
});

module.exports = router;
