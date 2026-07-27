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
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8 font-medium text-sm">
              <Bot className="w-4 h-4" />
              <span>Powered by Google Gemini 2.0 AI</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
              The Next Generation <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                AI Resume Analyzer
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Instantly score resumes against job descriptions, uncover hidden skill gaps, and generate personalized 90-day placement roadmaps in milliseconds.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/analyze">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2"
                >
                  <span>Start Scanning</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/history">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-gray-50"
                >
                  <span>View History</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Powered by Gemini 2.0 Flash Lite, get deep analytical insights in milliseconds, not minutes.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ATS Precision Match</h3>
            <p className="text-gray-600">Cross-reference candidate skills directly against your job descriptions to uncover exact match percentages.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Roadmaps</h3>
            <p className="text-gray-600">Automatically generate month-by-month upskilling plans to get candidates placement-ready.</p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
};

export default LandingPage;
