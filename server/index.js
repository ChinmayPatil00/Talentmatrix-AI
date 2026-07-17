import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { uploadResume } from './controllers/resumeController.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Multer setup for handling file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
};
connectDB();

// Routes
// We use 'resume' as the field name in the form-data request
app.post('/api/analyze', upload.single('resume'), uploadResume);

// Basic Health Check Route
app.get('/', (req, res) => res.send('TalentMatrix API is running...'));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});