const mongoose = require("mongoose");

const gameblogSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  completed: { type: Boolean, default: false }
});

gameblogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.author,
    completed: this.completed
  };
};

const GameBlog = mongoose.model("GameBlog", gameblogSchema);

module.exports = GameBlog;
