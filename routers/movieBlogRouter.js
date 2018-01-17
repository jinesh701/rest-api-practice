const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const MovieBlog = require("../models/movieblog");

router.get("/", function(req, res) {});

module.exports = router;
