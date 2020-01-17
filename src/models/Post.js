const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

Post.virtual("url").get(function() {
  return `http://localhost:3300/files/${encodeURIComponent(this.image)}`;
});

module.exports = mongoose.model("Post", Post);
