
import React from 'react';
import { motion } from 'framer-motion';
import { Beef, Apple, Clock, Scale } from 'lucide-react';

const ReptileNutrition = () => {
  const sections = [
    {
      icon: Beef,
      title: 'Tipos de Dieta',
      gradient: 'from-red-500 to-pink-600',
      content: [
        {
          subtitle: 'Insectívoros',
          description: 'Grillos, cucarachas (Dubia), tenebrios, gusanos de seda. Requieren "gut-loading" (alimentar al insecto antes).',
        },
        {
          subtitle: 'Herbívoros',
          description: 'Hojas verdes oscuras (rúcula, escarola, diente de león), vegetales variados. Fruta con moderación.',
        },
        {
          subtitle: 'Carnívoros',
          description: 'Roedores (congelados/descongelados es más seguro). Ofidios comen presas enteras.',
        },
        {
          subtitle: 'Omnívoros',
          description: 'Combinación de insectos y vegetales. Proporción varía según edad (ej. Dragón Barbudo: más insectos de joven, más vegetal de adulto).',
        },
      ],
    },
    {
      icon: Scale,
      title: 'Suplementos Esenciales',
      gradient: 'from-yellow-400 to-orange-500',
      content: [
        {
          subtitle: 'Calcio',
          description: 'Espolvorear en comida regularmente. Vital para prevenir Enfermedad Ósea Metabólica (EOM).',
        },
        {
          subtitle: 'Calcio + D3',
          description: 'Necesario para reptiles que no reciben UVB natural o suficiente artificial.',
        },
        {
          subtitle: 'Multivitamínicos',
          description: 'Una vez a la semana o quincenalmente para asegurar balance completo.',
        },
        {
          subtitle: 'Agua',
          description: 'Recipiente limpio siempre. Algunos (camaleones) solo beben agua en movimiento o gotas.',
        },
      ],
    },
    {
      icon: Clock,
      title: 'Horarios de Alimentación',
      gradient: 'from-green-500 to-emerald-600',
      content: [
        {
          subtitle: 'Juveniles',
          description: 'Suelen requerir alimentación diaria debido al rápido crecimiento.',
        },
        {
          subtitle: 'Adultos Insectívoros',
          description: 'Cada 2-3 días suele ser suficiente para evitar obesidad.',
        },
        {
          subtitle: 'Adultos Herbívoros',
          description: 'Ensalada fresca disponible diariamente.',
        },
        {
          subtitle: 'Serpientes',
          description: 'Adultos cada 7-14 días según especie y tamaño de la presa.',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${section.gradient}`}>
              <section.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
              {section.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.content.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{item.subtitle}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReptileNutrition;
