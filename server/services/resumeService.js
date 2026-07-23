// services/resumeService.js
import * as resumeRepository from '../repositories/resumeRepository.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const processAndSaveResume = async (file, jobDescription) => {
    try {
        let rawText = "";

        // 1. Safe Document Parsing
        if (file.mimetype === 'application/pdf') {
            const parsedPdf = await pdf(file.buffer);
            rawText = parsedPdf.text;
        } else {
            rawText = file.buffer.toString('utf-8');
        }

        if (!rawText || rawText.trim().length === 0) {
            throw new Error("Could not extract text content from the file.");
        }

        // Default layout structure fallback
        let extractedData = {
            candidateName: file.originalname.split('.')[0] || "Unknown Candidate",
            email: "not-found@example.com",
            skills: [],
            experienceYears: 0,
            education: "Not Specified",
            aiAnalysis: {
                score: 50,
                summary: "Bypassed or analytical parser error.",
                missing: ["Parsing Error"],
                strengths: ["Parsing Error"],
                feedback: "Manual Review Needed",
                placementMilestones: {
                    month1: "Review Resume manually",
                    month2: "Identify gaps",
                    month3: "Prepare for placement"
                }
            }
        };

        // 2. Controlled Gemini Execution
        if (process.env.GEMINI_API_KEY) {
            const model = genAI.getGenerativeModel({ 
                model: 'gemma-4-26b-a4b-it'
            });

            const prompt = `
                Analyze the following resume text against the provided Job Description.
                Extract the candidate's details and perform an ATS match analysis.
                Return ONLY the raw JSON object. Do not include markdown wraps like \`\`\`json.
                CRITICAL: For maximum speed, keep all text fields extremely short (max 1 sentence).
                
                Expected format:
                {
                    "candidateName": "Full Name",
                    "email": "Email string",
                    "skills": ["Skill1", "Skill2"],
                    "experienceYears": 0,
                    "education": "Degree details",
                    "aiAnalysis": {
                        "score": 85,
                        "summary": "1 sentence max match summary",
                        "missing": ["Missing skill 1", "Missing skill 2"],
                        "strengths": ["Matched skill 1", "Matched skill 2"],
                        "feedback": "1 sentence max actionable feedback.",
                        "placementMilestones": {
                            "month1": "1 short action",
                            "month2": "1 short action",
                            "month3": "1 short action"
                        }
                    }
                }

                Job Description:
                ${jobDescription || 'N/A'}

                Resume Content:
                ${rawText}
            `;

            const result = await model.generateContent(prompt);
            let responseText = result.response.text().trim();
            
            // 🛑 Bulletproof Regex: Strip markdown wrappers if Gemini inserts them anyway
            // Extract JSON from markdown if present
            let jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) {
                responseText = jsonMatch[1].trim();
            } else {
                // Fallback to brace extraction
                const firstBrace = responseText.indexOf('{');
                const lastBrace = responseText.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                    responseText = responseText.substring(firstBrace, lastBrace + 1);
                }
            }
            console.log("Extracted JSON:", responseText);
            
            // Safe parsing execution
            try {
                extractedData = JSON.parse(responseText);
            } catch (parseError) {
                console.error("AI output was not valid JSON, using fallback. Output was:", responseText);
                // extractedData is already initialized with the fallback struct at the top of the function
            }
        }

        const resumePayload = {
            ...extractedData,
            rawText: rawText,
            jobDescription: jobDescription
        };

        // Return the schema the frontend expects at the top level for aiAnalysis but save it nested in DB
        await resumeRepository.saveResumeAnalysis(resumePayload);
        
        // Transform for frontend
        return {
            ...extractedData.aiAnalysis,
            candidateName: extractedData.candidateName,
            email: extractedData.email
        };

    } catch (error) {
        console.error("❌ Pipeline Crash Details:", error.message);
        throw new Error(`Pipeline Error: ${error.message}`);
    }
};