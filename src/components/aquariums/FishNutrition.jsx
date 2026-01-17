
import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Apple, Clock, Scale } from 'lucide-react';

const FishNutrition = () => {
  const sections = [
    {
      icon: Fish,
      title: 'Tipos de Alimento',
      gradient: 'from-blue-500 to-indigo-600',
      content: [
        {
          subtitle: 'Escamas (Hojuelas)',
          description: 'El alimento más común para peces de superficie y zona media. Elegir marcas de calidad.',
        },
        {
          subtitle: 'Gránulos',
          description: 'Hunden a diferentes velocidades. Ideales para peces de zona media y fondo. Menos suciedad.',
        },
        {
          subtitle: 'Alimento Congelado/Vivo',
          description: 'Artemia, larva roja, daphnia. Excelente fuente de proteína y estimula el instinto de caza.',
        },
        {
          subtitle: 'Vegetales',
          description: 'Guisantes cocidos, calabacín, espinaca para peces herbívoros y omnívoros (Goldfish, Plecos).',
        },
      ],
    },
    {
      icon: Clock,
      title: 'Horarios de Alimentación',
      gradient: 'from-teal-400 to-cyan-500',
      content: [
        {
          subtitle: 'Frecuencia',
          description: 'Adultos: 1-2 veces al día. Alevines: 3-5 veces en pequeñas cantidades.',
        },
        {
          subtitle: 'Regla de los 2 Minutos',
          description: 'Dales solo lo que puedan comer en 2-3 minutos. El exceso ensucia el agua peligrosamente.',
        },
        {
          subtitle: 'Ayuno',
          description: 'Un día de ayuno a la semana es beneficioso para limpiar el sistema digestivo.',
        },
        {
          subtitle: 'Constancia',
          description: 'Intenta alimentar a las mismas horas para establecer una rutina.',
        },
      ],
    },
    {
      icon: Scale,
      title: 'Consejos Nutricionales',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Variedad',
          description: 'Rota diferentes tipos de alimento para asegurar una nutrición completa y evitar aburrimiento.',
        },
        {
          subtitle: 'Tamaño del Bocado',
          description: 'Asegúrate de que el alimento quepa en la boca del pez más pequeño.',
        },
        {
          subtitle: 'Caducidad',
          description: 'Desecha alimentos abiertos hace más de 3-4 meses, pierden vitaminas (especialmente C).',
        },
        {
          subtitle: 'Suplementos',
          description: 'Puedes remojar el alimento seco en vitaminas líquidas para peces ocasionalmente.',
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
          className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500"
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
                className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
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

export default FishNutrition;
