
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Shield, BarChart, ShoppingBag } from 'lucide-react';

const CookiePreferencesModal = ({ isOpen, onClose, onSave, initialPreferences }) => {
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const categories = [
    {
      id: 'necessary',
      label: 'Esenciales',
      description: 'Necesarias para que el sitio funcione. No se pueden desactivar.',
      icon: Shield,
      color: 'text-blue-500',
      locked: true
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      description: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
      icon: BarChart,
      color: 'text-green-500',
      locked: false
    },
    {
      id: 'marketing',
      label: 'Marketing',
      description: 'Permiten mostrar contenido y anuncios relevantes para ti.',
      icon: ShoppingBag,
      color: 'text-purple-500',
      locked: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Preferencias de Cookies</h3>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-2">
                Personaliza qué cookies permites que utilicemos en tu navegador.
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className={`p-2 bg-white rounded-lg shadow-sm ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-gray-900">{category.label}</h4>
                      <div 
                        onClick={() => handleToggle(category.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                          preferences[category.id] ? 'bg-blue-500' : 'bg-gray-300'
                        } ${category.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <motion.div 
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                          animate={{ x: preferences[category.id] ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                Guardar Preferencias
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CookiePreferencesModal;
