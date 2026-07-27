# TalentMatrix AI - The Next Generation AI Resume Analyzer

![TalentMatrix AI Banner](https://img.shields.io/badge/TalentMatrix-AI_Resume_Analyzer-indigo?style=for-the-badge&logo=react)

TalentMatrix AI is a powerful, dark-themed SaaS application that allows recruiters and hiring managers to instantly score candidate resumes against job descriptions. By leveraging Google's cutting-edge Gemini AI, it uncovers hidden skill gaps, provides detailed feedback, and generates personalized 90-day placement roadmaps in milliseconds.

## 🚀 Features

- **Lightning Fast AI Analysis:** Upload a resume (PDF or Text) and a job description to get instant, deep analytical insights.
- **ATS Precision Match:** Cross-reference candidate skills directly against your job descriptions to uncover exact match percentages and missing keywords.
- **Actionable 90-Day Roadmap:** Automatically generates a customized month-by-month onboarding and upskilling plan for every candidate.
- **Candidate History Dashboard:** View previously analyzed candidates with a sleek glassmorphism UI. Names and emails are blurred for privacy.
- **Premium Glassmorphism UI:** A beautiful, responsive, and buttery-smooth dark mode interface built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Router, Lucide Icons
- **Backend:** Node.js, Express, Mongoose, Multer (file uploads), PDF-Parse
- **Database:** MongoDB
- **AI Integration:** Google Generative AI (Gemini 3.6 Flash)

## 📦 Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/ChinmayPatil00/Talentmatrix-AI.git
cd Talentmatrix-AI
```

### 2. Setup the Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd client
npm install
```
Start the Vite development server:
```bash
npm run dev
```
The app will run locally at `http://localhost:5173`.

## 📜 Database Seeding
To populate your history tab with realistic mock candidates for testing, you can run the provided seed script:
```bash
cd server
node seed_history.js
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
