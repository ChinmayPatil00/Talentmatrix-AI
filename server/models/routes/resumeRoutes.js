const express = require('express');
const router = express.Router();

// 💡 Relative pathing navigation to step cleanly into config, controllers, and services directories
const upload = require('../config/multerConfig'); 
const { protect } = require('../controllers/middleware/authMiddleware');
const Resume = require('../models/Resume');
const { extractTextFromPdf, analyzeResumeWithAI } = require('../services/aiService');

/**
 * @desc    Upload a resume file, parse text, and trigger analysis
 * @route   POST /api/resumes/upload
 * @access  Private (Requires JWT Token)
 */
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file (.pdf)' });
    }

    const { targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ success: false, message: 'Please provide a target job role description' });
    }

    // 1. Core Text Extraction Step
    const extractedText = await extractTextFromPdf(req.file.path);

    // 2. Run the processing analysis service
    const aiAnalysisResult = await analyzeResumeWithAI(extractedText, targetRole);

    // 3. Write record completely to MongoDB Atlas
    const newResumeRecord = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      targetRole: targetRole,
      atsScore: aiAnalysisResult.atsScore,
      extractedData: aiAnalysisResult.extractedData,
      analysisReport: aiAnalysisResult.analysisReport
    });

    res.status(201).json({
      success: true,
      message: 'Resume text successfully parsed and registered into Atlas Cloud!',
      data: newResumeRecord
    });
  } catch (error) {
    console.error('❌ Pipeline failure:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;