const mongoose = require("mongoose");

const movieblogSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  watched: { type: Boolean, default: false }
});

movieblogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.author,
    completed: this.completed
  };
};

const MovieBlog = mongoose.model("MovieBlog", movieblogSchema);

module.exports = MovieBlog;
