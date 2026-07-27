import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Activity, History } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Scan Resume', path: '/analyze', icon: <Activity className="w-5 h-5" /> },
    { name: 'Candidate History', path: '/history', icon: <History className="w-5 h-5" /> },
  ];

  return (
    <div className="sticky top-0 z-50 w-full px-4 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex justify-center">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              TalentMatrix
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm font-semibold">{link.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="nav_pill"
                      className="absolute inset-0 rounded-full border border-white/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
      </nav>
    </div>
  );
};

export default Navbar;
