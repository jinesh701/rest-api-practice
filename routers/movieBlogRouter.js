const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const MovieBlog = require("../models/movieblog");

//GET
router.get("/", function(req, res, next) {
  MovieBlog.find()
    .then(movieblogs =>
      res.json(movieblogs.map(movieblog => movieblog.serialize()))
    )
    .catch(next);
});

//GET BY ID
router.get("/:id", function(req, res, next) {
  const id = req.params.id;

  MovieBlog.findById(id)
    .then(item => {
      if (item) {
        res.json(item.serialize());
      } else {
        next();
      }
    })
    .catch(next);
});

module.exports = router;
