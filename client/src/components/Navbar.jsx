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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
                TalentMatrix AI
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group flex items-center space-x-1"
                >
                  <span className={`text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>
                    <div className="flex items-center space-x-2">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-5 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
