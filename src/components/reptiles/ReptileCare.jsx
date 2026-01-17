
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Thermometer, Sun, Wrench } from 'lucide-react';

const ReptileCare = () => {
  const categories = [
    {
      icon: Sparkles,
      title: 'Configuración del Terrario',
      gradient: 'from-green-400 to-emerald-500',
      tips: [
        'Espacio adecuado: terrestre (largo > alto) o arbóreo (alto > largo)',
        'Sustrato específico: fibra de coco, corteza, arena (según especie)',
        'Escondites en zona fría y caliente para seguridad',
        'Ventilación adecuada para evitar moho y problemas respiratorios',
      ],
    },
    {
      icon: Thermometer,
      title: 'Temperatura y Humedad',
      gradient: 'from-orange-400 to-red-500',
      tips: [
        'Gradiente térmico: zona caliente (basking) y zona fría esencial para termorregulación',
        'Usa termostatos siempre para prevenir quemaduras',
        'Monitorea humedad con higrómetros digitales',
        'Pulveriza agua o usa sistemas de lluvia según requerimientos',
      ],
    },
    {
      icon: Sun,
      title: 'Iluminación UVB',
      gradient: 'from-yellow-400 to-orange-400',
      tips: [
        'Crucial para especies diurnas para sintetizar Vitamina D3 y absorber calcio',
        'Cambia bombillas UVB cada 6-12 meses (pierden efectividad)',
        'Fotoperiodo: 12 horas luz / 12 horas oscuridad',
        'Especies nocturnas (Geckos) necesitan menos UVB pero se benefician de niveles bajos',
      ],
    },
    {
      icon: Wrench,
      title: 'Mantenimiento',
      gradient: 'from-stone-500 to-stone-700',
      tips: [
        'Limpieza diaria de heces y restos de comida (spot cleaning)',
        'Limpieza profunda y cambio de sustrato mensual o trimestral',
        'Desinfección de decoración y recipientes regularmente',
        'Revisión de fugas y seguridad de cerraduras (especialmente serpientes)',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-l-4 border-green-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${category.gradient}`}>
              <category.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
              {category.title}
            </h3>
          </div>
          
          <ul className="space-y-3">
            {category.tips.map((tip, tipIndex) => (
              <motion.li
                key={tipIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + tipIndex * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} flex-shrink-0`} />
                <p className="text-gray-700">{tip}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default ReptileCare;
