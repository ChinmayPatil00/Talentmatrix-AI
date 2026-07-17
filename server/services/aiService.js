const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenAI, Type } = require('@google/genai');

// ✅ FIXED: Initialized with an object configuration container to stop the project/location runtime crash
const ai = new GoogleGenAI({});

/**
 * Parses raw text from a PDF file on the server's disk
 */
const extractTextFromPdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const parsedData = await pdfParse(dataBuffer);
    return parsedData.text;
  } catch (error) {
    console.error('❌ Error parsing PDF text:', error.message);
    throw new Error('Failed to parse text from the uploaded PDF document.');
  }
};

/**
 * Deep-scans resume text against target metrics using Gemini Live Flash Model
 * Outputs strict structural JSON schema matching our Mongoose criteria
 */
const analyzeResumeWithAI = async (resumeText, targetRole) => {
  try {
    const prompt = `
      You are an expert ATS (Applicant Tracking System) optimizer and elite Technical Recruiter.
      Analyze the following Resume Text against the Target Job Role/Description provided.
      
      TARGET JOB ROLE / DESCRIPTION:
      "${targetRole}"

      CANDIDATE RESUME TEXT:
      "${resumeText}"

      Provide an honest scoring (0 to 100), extract key information, and list explicit improvements.
    `;

    // Fire live call to gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Enforce deterministic structured JSON outputs
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { 
              type: Type.INTEGER, 
              description: "An overall alignment score between 0 and 100 based on core qualifications." 
            },
            extractedData: {
              type: Type.OBJECT,
              properties: {
                skills: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "List of explicit technical skills found in the resume." 
                },
                experienceYears: { 
                  type: Type.INTEGER, 
                  description: "Estimated years of professional or project-based technical experience." 
                },
                education: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "Degrees or certification tracks found." 
                }
              },
              required: ["skills", "experienceYears", "education"]
            },
            analysisReport: {
              type: Type.OBJECT,
              properties: {
                missingKeywords: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "Crucial stack or methodology terms missing that the target role demands." 
                },
                strengths: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "Standout areas where the resume shines for this role." 
                },
                weaknesses: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "Identified qualification gaps or poor metric explanations." 
                },
                improvements: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING }, 
                  description: "Clear, highly actionable bullet points explaining exactly how to update the resume text." 
                }
              },
              required: ["missingKeywords", "strengths", "weaknesses", "improvements"]
            }
          },
          required: ["atsScore", "extractedData", "analysisReport"]
        }
      }
    });

    // Extract text string payload safely
    const jsonString = response.text;
    if (!jsonString) {
      throw new Error('Empty payload response received from Gemini engine.');
    }

    return JSON.parse(jsonString);

  } catch (error) {
    console.error('❌ Gemini Analysis Service Error:', error.message);
    throw new Error(`AI evaluation pipeline crashed: ${error.message}`);
  }
};

module.exports = {
  extractTextFromPdf,
  analyzeResumeWithAI
};