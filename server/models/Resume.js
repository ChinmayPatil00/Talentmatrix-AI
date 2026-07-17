import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  candidateName: { type: String, default: "Anonymous" }, // Made default for testing
  email: { type: String, default: "no-email@example.com" },
  skills: { type: [String], default: [] },
  experienceYears: { type: Number, default: 0 },
  education: { type: String },
  rawText: { type: String }, 
  jobDescription: { type: String },
  aiAnalysis: {
    score: { type: Number }, 
    summary: { type: String }, 
    missing: { type: [String] },
    strengths: { type: [String] },
    feedback: { type: String }, 
    placementMilestones: {
      month1: { type: String },
      month2: { type: String },
      month3: { type: String }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

// 🚀 THIS IS THE LINE THAT FIXES YOUR CRASH
export default Resume;