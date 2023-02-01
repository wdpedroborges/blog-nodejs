const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  chamada: {
    type: String,
    required: true,
  },
  corpo: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;