
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import CookiePreferencesModal from './CookiePreferencesModal';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const savePreferences = (newPrefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
  };

  const handleReject = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
  };

  const handleCustomSave = (customPrefs) => {
    savePreferences(customPrefs);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 md:max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full">
                <Cookie className="w-8 h-8 text-orange-500" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-gray-900 mb-1">Valoramos tu privacidad</h3>
                <p className="text-gray-600 text-sm">
                  Utilizamos cookies para mejorar tu experiencia y analizar nuestro tráfico. 
                  Consulta nuestra <Link to="/politicas-cookies" className="text-blue-600 hover:underline">política de cookies</Link> para más detalles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Personalizar
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleCustomSave}
        initialPreferences={preferences}
      />
    </>
  );
};

export default CookieBanner;
