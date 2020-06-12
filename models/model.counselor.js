const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    trim: true
  },
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Counselor', counselorSchema);