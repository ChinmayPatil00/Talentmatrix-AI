import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import ResumeDashboard from './components/ResumeDashboard.jsx';
import HistoryPage from './components/HistoryPage.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<ResumeDashboard />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Global dark theme wrapper */}
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30">
        
        {/* Global Ambient Background */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        </div>

        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;