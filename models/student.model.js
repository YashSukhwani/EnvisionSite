const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  mobile: {
    type: String,
    maxlength: 14,
    minlength: 13,
    required: true,
    trim: true
  },
  nearest_office: {
    type: String,
    trim: true
  },
  destination: {
    type: String,
    trim: true
  },
  intake: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;