const mongoose = require("mongoose");

// Comments schema
var commentsSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

var Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;
