import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import ResumeDashboard from './components/ResumeDashboard.jsx';
import HistoryPage from './components/HistoryPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<ResumeDashboard />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;