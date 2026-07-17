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