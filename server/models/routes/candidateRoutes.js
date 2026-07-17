const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');

// Configure multer memory storage buffer
const upload = multer({ storage: multer.memoryStorage() });

// MATCHES: POST http://localhost:5000/api/resumes/upload
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Please attach a valid document file" });
    }

    // 2. Parse binary PDF data buffer into plain text strings
    const pdfBuffer = await pdfParse(req.file.buffer);
    const textData = pdfBuffer.text;

    // 3. Return clean structural text response back to frontend application state
    return res.status(200).json({ 
      success: true, 
      message: "Resume parsed and processed completely!",
      extractedTextLength: textData.length,
      preview: textData.substring(0, 300)
    });

  } catch (err) {
    console.error("Backend Parsing Exception Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;