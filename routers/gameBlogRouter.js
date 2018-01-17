const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const GameBlog = require("../models/gameblog");

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

//PUT
router.put("/:id", function(req, res) {
  const id = req.params.id;

  GameBlog.findById(id, function(err, gameblog) {
    if (err) {
      res.status(500).send(err);
    } else {
      gameblog.title = req.body.title;
      gameblog.content = req.body.content;
      gameblog.author = req.body.author;
      gameblog.completed = req.body.completed;
      gameblog.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(gameblog);
        }
      });
    }
  });
});

//DELETE
router.delete("/:id", function(req, res, next) {
  const id = req.params.id;

  GameBlog.findByIdAndRemove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(next);
});

module.exports = router;
