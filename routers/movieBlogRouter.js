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

//POST
router.post("/", function(req, res, next) {
  const { title, content, author } = req.body;

  if (!title) {
    const err = new Error("Missing 'title' in request body");
    err.status = 400;
    return next(err);
  }

  if (!content) {
    const err = new Error("Missing 'content' in request body");
    err.status = 400;
    return next(err);
  }

  if (!author) {
    const err = new Error("Missing 'author' in request body");
    err.status = 400;
    return next(err);
  }

  MovieBlog.create({ title, content, author })
    .then(newItem => {
      res
        .status(201)
        .location(`${req.originalUrl}/${newItem.id}`)
        .json(newItem.serialize());
    })
    .catch(next);
});

//PUT
router.put("/:id", function(req, res, next) {
  const id = req.params.id;

  const updateItem = {};
  const updatableFields = ["title", "content", "author", "watched"];

  updatableFields.forEach(field => {
    for (field in req.body) {
      updateItem[field] = req.body[field];
    }
  });

  if (!updateItem.title) {
    const err = new Error("Missing 'title' in request body");
    err.status = 400;
    return next(err);
  }

  if (!updateItem.content) {
    const err = new Error("Missing 'content' in request body");
    err.status = 400;
    return next(err);
  }

  if (!updateItem.author) {
    const err = new Error("Missing 'author' in request body");
    err.status = 400;
    return next(err);
  }

  MovieBlog.findByIdAndUpdate(id, updateItem, { new: true })
    .then(item => {
      if (item) {
        res.json(item.serialize());
      } else {
        next();
      }
    })
    .catch(next);
});

//DELETE
router.delete("/:id", function(req, res, next) {
  const id = req.params.id;

  MovieBlog.findByIdAndRemove(id)
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
