
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedArticles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    // Poll local storage or use an event listener in a real app
    const checkStorage = () => {
      const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
      setSavedArticles(saved);
    };
    checkStorage();
    window.addEventListener('storage', checkStorage); // Only works across tabs
    // Mock poll for single tab demo
    const interval = setInterval(checkStorage, 2000);
    return () => clearInterval(interval);
  }, []);

  const removeArticle = (url) => {
    const updated = savedArticles.filter(a => a.url !== url);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
    setSavedArticles(updated);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Bookmark className="w-5 h-5" />
        {savedArticles.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-black/20 backdrop-blur-sm"
             />
             
             <motion.div
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto"
             >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Guardados ({savedArticles.length})</h3>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {savedArticles.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No tienes artículos guardados aún.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedArticles.map((article, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl relative group">
                        <Link to={article.url} onClick={() => setIsOpen(false)} className="block pr-6">
                          <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">{article.title}</h4>
                          <p className="text-xs text-gray-500">Guardado el {new Date(article.date).toLocaleDateString()}</p>
                        </Link>
                        <button 
                          onClick={() => removeArticle(article.url)}
                          className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SavedArticles;
