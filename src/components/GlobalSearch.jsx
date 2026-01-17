
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Dog, Cat, Fish, PawPrint, BookOpen, ShoppingBag, ShieldCheck, FileText, Calculator, BarChart } from 'lucide-react';
import { trackSearch } from '@/lib/analytics';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for search
  const searchData = [
    // Tools
    { title: 'Calculadora de Calorías', type: 'Herramienta', link: '/herramientas/calculadora-calorias', icon: Calculator, category: 'tools' },
    { title: 'Test de Compatibilidad', type: 'Herramienta', link: '/herramientas/test-compatibilidad-razas', icon: BarChart, category: 'tools' },

    // Dogs
    { title: 'Labrador Retriever', type: 'Raza Perro', link: '/perros', icon: Dog, category: 'dogs' },
    { title: 'Pastor Alemán', type: 'Raza Perro', link: '/perros', icon: Dog, category: 'dogs' },
    
    // Cats
    { title: 'Persa', type: 'Raza Gato', link: '/gatos', icon: Cat, category: 'cats' },
    { title: 'Siamés', type: 'Raza Gato', link: '/gatos', icon: Cat, category: 'cats' },

    // Fish
    { title: 'Pez Betta', type: 'Acuarios', link: '/acuarios', icon: Fish, category: 'fish' },
    
    // Reptiles
    { title: 'Iguana Verde', type: 'Reptiles', link: '/reptiles', icon: PawPrint, category: 'reptiles' },

    // Blog
    { title: 'Cómo entrenar a tu perro', type: 'Artículo', link: '/blog/como-entrenar-a-tu-perro', icon: BookOpen, category: 'blog' },
    
    // Products
    { title: 'Alimento Premium Perro', type: 'Producto', link: '/productos', icon: ShoppingBag, category: 'products' },
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6)); // Limit to 6 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (link) => {
    trackSearch(query);
    navigate(link);
    setIsOpen(false);
    setQuery('');
  };

  const getBadgeColor = (category) => {
    const colors = {
      tools: 'bg-indigo-100 text-indigo-700',
      dogs: 'bg-blue-100 text-blue-700',
      cats: 'bg-pink-100 text-pink-700',
      fish: 'bg-cyan-100 text-cyan-700',
      reptiles: 'bg-green-100 text-green-700',
      blog: 'bg-purple-100 text-purple-700',
      products: 'bg-orange-100 text-orange-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="relative w-full max-w-xs md:max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar razas, herramientas, artículos..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden z-50"
          >
            <div className="py-2">
              {results.map((result, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelect(result.link)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                  whileHover={{ x: 4 }}
                >
                  <div className={`p-2 rounded-full ${getBadgeColor(result.category)} bg-opacity-20`}>
                    <result.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{result.title}</h4>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${getBadgeColor(result.category)}`}>
                      {result.type}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
