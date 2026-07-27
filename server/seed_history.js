import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ResumeAnalysis from './models/Resume.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const mockCandidates = [
    {
        candidateName: "Sarah Jenkins",
        email: "sarah.j@example.com",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        experienceYears: 4,
        education: "B.S. Computer Science",
        rawText: "Sample resume text...",
        jobDescription: "Senior Frontend Developer",
        aiAnalysis: {
            score: 92,
            summary: "Excellent match for the senior frontend role with deep React and Node experience.",
            missing: ["GraphQL"],
            strengths: ["React", "TypeScript", "AWS"],
            feedback: "Strong candidate. Verify GraphQL willingness.",
            placementMilestones: {
                month1: "Learn basic GraphQL queries",
                month2: "Integrate Apollo client",
                month3: "Ready for interview"
            }
        }
    },
    {
        candidateName: "Michael Chen",
        email: "m.chen99@example.com",
        skills: ["Python", "Django", "SQL", "Docker"],
        experienceYears: 2,
        education: "M.S. Data Science",
        rawText: "Sample resume text...",
        jobDescription: "Backend Engineer",
        aiAnalysis: {
            score: 65,
            summary: "Good backend fundamentals but lacking required Go and Kubernetes experience.",
            missing: ["Golang", "Kubernetes"],
            strengths: ["Python", "Docker"],
            feedback: "Candidate needs to pivot to Go stack.",
            placementMilestones: {
                month1: "Complete Go crash course",
                month2: "Deploy sample app to K8s",
                month3: "System design practice"
            }
        }
    },
    {
        candidateName: "Emily Rodriguez",
        email: "emily.rod@example.com",
        skills: ["HTML", "CSS", "JavaScript"],
        experienceYears: 0,
        education: "Bootcamp Graduate",
        rawText: "Sample resume text...",
        jobDescription: "Full Stack Developer",
        aiAnalysis: {
            score: 35,
            summary: "Entry-level candidate missing core backend framework experience required for this role.",
            missing: ["Node.js", "React", "MongoDB"],
            strengths: ["HTML", "CSS", "Enthusiasm"],
            feedback: "Needs substantial upskilling in modern frameworks.",
            placementMilestones: {
                month1: "Learn React fundamentals",
                month2: "Build a Node API",
                month3: "Connect frontend to backend"
            }
        }
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");
        
        // Delete candidates that have "Bypassed or analytical parser error."
        const result = await ResumeAnalysis.deleteMany({
            "aiAnalysis.summary": "Bypassed or analytical parser error."
        });
        console.log(`Deleted ${result.deletedCount} parser error candidates.`);

        await ResumeAnalysis.insertMany(mockCandidates);
        console.log("Successfully seeded 3 candidates!");
        
        process.exit(0);
    } catch (e) {
        console.error("Seeding failed:", e);
        process.exit(1);
    }
}

seed();
