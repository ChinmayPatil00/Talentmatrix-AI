// repositories/resumeRepository.js
import Resume from '../models/Resume.js';

export const saveResumeAnalysis = async (resumeData) => {
    try {
        const savedRecord = await Resume.create(resumeData);
        return savedRecord;
    } catch (error) {
        throw new Error(`Repository Error: Failed to save record - ${error.message}`);
    }
};

export const getAllResumes = async () => {
    try {
        return await Resume.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Repository Error: Failed to fetch records - ${error.message}`);
    }
};