import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Clock, ChevronRight } from 'lucide-react';
import axios from 'axios';

const HistoryPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates');
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span>Candidate History</span>
          </h1>
          <p className="mt-2 text-gray-600">Review past scans, scores, and missing skills instantly.</p>
        </div>
        
        {/* Search */}
        <div className="mt-4 md:mt-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No candidates found</h3>
          <p className="mt-2 text-gray-500">Scan a resume to see it appear in your history.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCandidates.map((candidate) => (
            <motion.div 
              key={candidate._id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  candidate.aiAnalysis?.score >= 80 ? 'bg-green-100 text-green-700' :
                  candidate.aiAnalysis?.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {candidate.aiAnalysis?.score || 0}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1 pr-16 truncate">
                {candidate.candidateName}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{candidate.email}</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Missing Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.aiAnalysis?.missing?.slice(0, 3).map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        {skill}
                      </span>
                    ))}
                    {candidate.aiAnalysis?.missing?.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        +{candidate.aiAnalysis.missing.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
                </div>
                <button className="text-blue-600 font-medium flex items-center space-x-1 group-hover:text-blue-700">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HistoryPage;
