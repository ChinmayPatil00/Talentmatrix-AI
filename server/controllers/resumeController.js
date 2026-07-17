// controllers/resumeController.js
import * as resumeService from '../services/resumeService.js';

export const uploadResume = async (req, res) => {
    try {
        // Safeguard: Check if multer successfully processed the file
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: "No file detected. Please attach a file using the field name 'resume'." 
            });
        }

        // Extract Job Description if provided
        const jobDescription = req.body.jobDescription || "";

        // Send file to the business logic pipeline
        const analyzedData = await resumeService.processAndSaveResume(req.file, jobDescription);

        // Send response back to the client/frontend
        return res.status(201).json({
            success: true,
            message: "Resume successfully uploaded, parsed, and evaluated by TalentMatrix AI!",
            data: analyzedData
        });

    } catch (error) {
        console.error("❌ Controller caught an error:", error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};