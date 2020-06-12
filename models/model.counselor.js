const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Counselor', counselorSchema);