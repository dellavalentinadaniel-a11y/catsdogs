
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Menu, X, ChevronDown } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import SavedArticles from './SavedArticles';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/perros', label: 'Perros' },
    { path: '/gatos', label: 'Gatos' },
    { path: '/acuarios', label: 'Acuarios' },
    { path: '/reptiles', label: 'Reptiles' },
    { path: '/blog', label: 'Blog' },
    { path: '/productos', label: 'Productos' },
  ];

  const toolsLinks = [
    { path: '/herramientas/calculadora-calorias', label: 'Calculadora Calorías' },
    { path: '/herramientas/test-compatibilidad-razas', label: 'Test Compatibilidad' },
    { path: '/recursos', label: 'Recursos' },
    { path: '/comparativas', label: 'Comparativas' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <PawPrint className="w-8 h-8 text-blue-500" />
            </motion.div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              PetCare
            </span>
          </Link>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <GlobalSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-500'
                    : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-500">
                Herramientas <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block pt-2">
                <div className="py-2">
                  {toolsLinks.map((link) => (
                     <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <SavedArticles />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t overflow-hidden bg-white"
          >
            <div className="mb-4 px-2">
              <GlobalSearch />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
               <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Herramientas</p>
               {toolsLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
