import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Clock, Calendar } from 'lucide-react';
import axios from 'axios';

const HistoryPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://talentmatrix-ai.onrender.com/api/candidates');
        setCandidates(response.data.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredCandidates = candidates.filter(c => 
    c.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-6 pt-8 min-h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center space-x-3">
            <Users className="w-8 h-8 text-indigo-500" />
            <span>Candidate History</span>
          </h1>
          <p className="text-slate-400">Review past ATS analyses and placement roadmaps.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No candidates found matching your criteria.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCandidates.map((candidate, idx) => {
              const score = candidate.aiAnalysis?.score || 0;
              const isHighScore = score >= 75;
              const isMedScore = score >= 50 && score < 75;
              
              let ringColor = 'border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]';
              let scoreColor = 'text-red-400';
              if (isHighScore) {
                ringColor = 'border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                scoreColor = 'text-emerald-400';
              } else if (isMedScore) {
                ringColor = 'border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]';
                scoreColor = 'text-amber-400';
              }

              return (
                <motion.div
                  key={candidate._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-white/5 backdrop-blur-xl p-6 rounded-2xl border transition-all flex flex-col h-full ${ringColor}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1 truncate max-w-[200px] blur-sm select-none transition-all hover:blur-none" title={candidate.candidateName}>
                        {candidate.candidateName}
                      </h3>
                      <p className="text-sm text-slate-400 truncate max-w-[200px] blur-sm select-none transition-all hover:blur-none" title={candidate.email}>
                        {candidate.email}
                      </p>
                    </div>
                    <div className={`text-2xl font-black ${scoreColor} bg-white/5 px-3 py-1 rounded-xl border border-white/5`}>
                      {score}
                    </div>
                  </div>

                  <div className="mb-4 flex-1">
                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {candidate.aiAnalysis?.summary || "No summary available."}
                    </p>
                  </div>

                  {candidate.aiAnalysis?.missing?.length > 0 && (
                    <div className="mb-5">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Missing Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.aiAnalysis.missing.slice(0, 3).map((skill, i) => (
                          <span key={i} className="text-xs bg-red-500/10 text-red-300 border border-red-500/20 px-2.5 py-1 rounded-md">
                            {skill}
                          </span>
                        ))}
                        {candidate.aiAnalysis.missing.length > 3 && (
                          <span className="text-xs bg-white/5 text-slate-400 border border-white/10 px-2.5 py-1 rounded-md">
                            +{candidate.aiAnalysis.missing.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-auto pt-4 border-t border-white/10">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(candidate.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPage;
