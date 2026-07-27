import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-3.6-flash',
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const prompt = `
        Return a JSON object with keys "name" and "age". 
        Name: John
        Age: 30
        `;
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch(e) {
        console.error("ERROR:", e);
        process.exit(1);
    }
}

run();
