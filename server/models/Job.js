const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  experienceRequired: {
    type: String,
    default: ''
  }
}, { timestamps: true });


module.exports = mongoose.model('Job', JobSchema);