import { useState, useEffect } from 'react';

const ResumeDashboard = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleScan = async () => {
    if (!file) return;
    setIsScanning(true);
    setAnalysis(null);
    
    try {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        const response = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            body: formData,
        });

        if (response.status === 429) {
            setCooldown(60); 
            setIsScanning(false);
            return;
        }

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        // The backend returns { success: true, message: "...", data: { score, summary, ... } }
        setAnalysis(result.data);
    } catch (error) {
        console.error("Fetch failed:", error);
        alert("Failed to analyze resume. Check backend connection.");
    } finally {
        setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30">
      {/* Premium Gradient Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
      </div>

      {/* Top Nav */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-extrabold text-2xl tracking-tight flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">TalentMatrix AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">System Online</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6 mt-8">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">Resume Optimizer <span className="text-indigo-500">Pro</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Analyze your resume against any job description using advanced AI to generate a custom placement roadmap and maximize your ATS score.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Upload Zone */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl transition-all hover:bg-white/10">
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                1. Upload Resume
              </h2>
              
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-500/30 border-dashed rounded-2xl cursor-pointer bg-black/20 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <p className="mb-2 text-sm text-slate-300 font-medium px-4 text-center truncate w-full">
                    {file ? file.name : "Click to select PDF"}
                  </p>
                </div>
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>

            {/* JD Zone */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl transition-all hover:bg-white/10">
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                2. Job Description
              </h2>
              <textarea 
                className="w-full h-48 bg-black/20 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-slate-600 resize-none"
                placeholder="Paste the target job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            <button
                onClick={handleScan}
                disabled={!file || isScanning || cooldown > 0}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 transition-all shadow-lg shadow-indigo-500/25"
            >
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <span className="relative flex justify-center items-center gap-2">
                  {cooldown > 0 
                    ? `Rate limited (${cooldown}s)` 
                    : (isScanning 
                        ? <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Scanning...</> 
                        : "Run Deep AI Analysis")
                  }
                </span>
            </button>

          </div>

          {/* Right Column: Results Dashboard */}
          <div className="lg:col-span-8">
            {!analysis && !isScanning && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm text-slate-500 font-medium p-10 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 flex items-center justify-center border border-white/5">
                    <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-xl text-slate-300 mb-2">Awaiting Data Input</h3>
                <p>Upload a resume and provide a job description to generate your custom insights.</p>
              </div>
            )}

            {isScanning && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center border border-indigo-500/20 rounded-3xl bg-indigo-950/20 backdrop-blur-md">
                <div className="relative w-32 h-32 flex justify-center items-center mb-8">
                  <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-blue-400 animate-spin animation-delay-200"></div>
                  <div className="absolute inset-4 rounded-full border-b-2 border-purple-400 animate-spin animation-delay-400"></div>
                  <svg className="w-8 h-8 text-indigo-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="animate-pulse text-indigo-300 font-semibold text-xl tracking-wide">Processing Neural Analytics...</div>
                <p className="text-slate-500 text-sm mt-2">Matching skills, analyzing gaps, generating roadmap</p>
              </div>
            )}

            {analysis && (
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Header Profile & Score */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-white/10 gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-white">{analysis.candidateName || "Candidate"}</h2>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {analysis.email || "No email detected"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl border border-white/5">
                    <div className="text-right">
                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">ATS Match Score</div>
                        <div className="text-xs text-slate-500">Based on JD keywords</div>
                    </div>
                    <div className={`relative flex items-center justify-center w-20 h-20 rounded-full font-black text-3xl shadow-inner 
                        ${analysis.score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                          analysis.score >= 60 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                          'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                      {analysis.score}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="238" strokeDashoffset={238 - (238 * analysis.score) / 100} className="opacity-50" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        AI Executive Summary
                    </h3>
                    <p className="text-slate-300 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5 text-lg font-light">
                        {analysis.summary}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {/* Missing Skills */}
                  <div className="bg-rose-950/20 p-6 rounded-2xl border border-rose-500/20">
                    <h3 className="font-bold text-rose-400 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missing && analysis.missing.length > 0
                        ? analysis.missing.map((skill, i) => (
                          <span key={i} className="bg-rose-500/10 text-rose-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-rose-500/20 shadow-sm">
                            {skill}
                          </span>
                        ))
                        : <span className="text-slate-400 text-sm italic">Perfect match. No critical skills missing.</span>
                      }
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="bg-emerald-950/20 p-6 rounded-2xl border border-emerald-500/20">
                    <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Current Strengths
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.strengths && analysis.strengths.length > 0
                        ? analysis.strengths.map((strength, i) => (
                           <span key={i} className="bg-emerald-500/10 text-emerald-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-emerald-500/20 shadow-sm">
                            {strength}
                           </span>
                        ))
                        : <span className="text-slate-400 text-sm italic">Analysis complete.</span>
                      }
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                      Expert Actionable Feedback
                  </h3>
                  <div className="bg-purple-950/20 p-6 rounded-2xl border border-purple-500/20 text-purple-100/80 leading-relaxed">
                    {analysis.feedback}
                  </div>
                </div>

                {analysis.placementMilestones && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        Placement Readiness Roadmap
                    </h3>
                    <div className="space-y-4">
                      <div className="p-5 bg-gradient-to-r from-blue-950/40 to-transparent border-l-4 border-blue-500 rounded-r-2xl">
                        <h4 className="font-bold text-blue-300 text-lg mb-1">Month 1: Gap Mitigation</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{analysis.placementMilestones.month1}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-r from-indigo-950/40 to-transparent border-l-4 border-indigo-500 rounded-r-2xl">
                        <h4 className="font-bold text-indigo-300 text-lg mb-1">Month 2: Core Engineering</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{analysis.placementMilestones.month2}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-r from-purple-950/40 to-transparent border-l-4 border-purple-500 rounded-r-2xl">
                        <h4 className="font-bold text-purple-300 text-lg mb-1">Month 3: Interview Ready</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{analysis.placementMilestones.month3}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDashboard;