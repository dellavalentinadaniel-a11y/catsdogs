
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Thermometer, Wrench } from 'lucide-react';

const FishCare = () => {
  const categories = [
    {
      icon: Sparkles,
      title: 'Configuración del Tanque',
      gradient: 'from-blue-400 to-cyan-500',
      tips: [
        'Elige el tamaño adecuado para tus peces (mínimo 20L para Betta, 40L para tropicales)',
        'Usa sustrato adecuado (arena o grava) según las especies',
        'Cicla el acuario durante 4-6 semanas antes de añadir peces',
        'Incluye plantas vivas o decoraciones seguras para escondites',
      ],
    },
    {
      icon: Droplets,
      title: 'Parámetros del Agua',
      gradient: 'from-cyan-400 to-teal-500',
      tips: [
        'Testea semanalmente: Amoniaco (0), Nitritos (0), Nitratos (<20ppm)',
        'Mantén el pH estable según las necesidades de tus especies',
        'Usa acondicionador para eliminar cloro y cloraminas del agua del grifo',
        'Realiza cambios de agua parciales (20-30%) cada semana',
      ],
    },
    {
      icon: Thermometer,
      title: 'Temperatura e Iluminación',
      gradient: 'from-orange-400 to-red-500',
      tips: [
        'Usa un calentador confiable para peces tropicales (24-27°C)',
        'Peces de agua fría (Goldfish) no necesitan calentador (18-22°C)',
        'Proporciona 8-10 horas de luz al día. Usa temporizador',
        'Evita la luz solar directa para prevenir exceso de algas',
      ],
    },
    {
      icon: Wrench,
      title: 'Mantenimiento y Equipo',
      gradient: 'from-gray-500 to-gray-700',
      tips: [
        'El filtro es el corazón del acuario: límpialo en agua del tanque, nunca del grifo',
        'Limpia los cristales con imanes o esponjas específicas',
        'Sifona el fondo para eliminar desechos acumulados',
        'Revisa el funcionamiento de calentadores y filtros diariamente',
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
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-l-4 border-blue-400"
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

export default FishCare;
