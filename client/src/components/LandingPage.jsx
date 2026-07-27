import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Target, LineChart } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 pt-20"
    >
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Removed ambient glows to match SaaS aesthetic */}  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full mb-8 font-medium text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Bot className="w-4 h-4" />
              <span>Powered by Google Gemini AI</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight drop-shadow-sm">
              The Next Generation <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                AI Resume Analyzer
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Instantly score resumes against job descriptions, uncover hidden skill gaps, and generate personalized 90-day placement roadmaps in milliseconds.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/analyze">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-shadow"
                >
                  <span>Start Scanning</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/history">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors"
                >
                  <span>View History</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all group">
            <div className="w-14 h-14 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-400">Powered by Google's Gemini models, get deep analytical insights in milliseconds, not minutes.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">ATS Precision Match</h3>
            <p className="text-slate-400">Cross-reference candidate skills directly against your job descriptions to uncover exact match percentages.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all group">
            <div className="w-14 h-14 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Actionable Roadmaps</h3>
            <p className="text-slate-400">Automatically generate month-by-month upskilling plans to get candidates placement-ready.</p>
          </motion.div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default LandingPage;
