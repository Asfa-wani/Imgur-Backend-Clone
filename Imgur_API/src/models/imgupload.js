const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

// Create new collection

const Image = new mongoose.model('Image', imageSchema);
module.exports = Image;
