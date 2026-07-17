const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  skillsExtracted: [{ type: String, lowercase: true }],
  matchScore: { type: Number, default: 0 }, 
  resumeText: { type: String }
}, { timestamps: true });


CandidateSchema.index({ jobId: 1, matchScore: -1 });

module.exports = mongoose.model('Candidate', CandidateSchema);