
import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Apple, Clock, Droplets } from 'lucide-react';

const CatNutrition = () => {
  const sections = [
    {
      icon: Fish,
      title: 'Tipos de Alimento',
      gradient: 'from-blue-400 to-cyan-500',
      content: [
        {
          subtitle: 'Alimento Seco',
          description: 'Práctico y ayuda a la salud dental. Menor humedad, asegurar consumo de agua adecuado.',
        },
        {
          subtitle: 'Alimento Húmedo',
          description: 'Alto contenido de humedad (70-80%). Ideal para gatos que beben poco agua o con problemas renales.',
        },
        {
          subtitle: 'Dieta Mixta',
          description: 'Combinación de seco y húmedo. Ofrece beneficios de ambos tipos de alimentación.',
        },
        {
          subtitle: 'Alimento Natural',
          description: 'Dietas caseras o crudas. Requieren supervisión veterinaria para asegurar balance nutricional.',
        },
      ],
    },
    {
      icon: Apple,
      title: 'Nutrientes Esenciales',
      gradient: 'from-pink-400 to-rose-500',
      content: [
        {
          subtitle: 'Proteínas (carnívoros obligados)',
          description: 'Mínimo 26% en adultos. Fuentes: pollo, pavo, pescado, cordero. Esenciales para masa muscular.',
        },
        {
          subtitle: 'Taurina',
          description: 'Aminoácido vital para corazón, visión y reproducción. Deficiencia causa problemas graves.',
        },
        {
          subtitle: 'Grasas',
          description: 'Ácidos grasos esenciales para piel y pelaje. Omega-3 y Omega-6 son fundamentales.',
        },
        {
          subtitle: 'Vitaminas A y D',
          description: 'No pueden sintetizar vitamina A de betacarotenos. Necesitan fuentes animales directas.',
        },
      ],
    },
    {
      icon: Clock,
      title: 'Porciones y Horarios',
      gradient: 'from-purple-400 to-violet-500',
      content: [
        {
          subtitle: 'Gatitos (2-12 meses)',
          description: '3-4 comidas diarias. Alimento específico para gatitos, alto en proteínas y calorías.',
        },
        {
          subtitle: 'Adultos (1-7 años)',
          description: '2 comidas al día. Aproximadamente 200-300 calorías según peso y actividad.',
        },
        {
          subtitle: 'Seniors (+7 años)',
          description: '2 comidas diarias. Menor contenido calórico, fácil digestión, considerar salud renal.',
        },
        {
          subtitle: 'Control de Peso',
          description: 'Evitar sobrepeso: 40-45 cal/kg peso corporal ideal. Ajustar según actividad.',
        },
      ],
    },
    {
      icon: Droplets,
      title: 'Hidratación',
      gradient: 'from-green-400 to-emerald-500',
      content: [
        {
          subtitle: 'Agua Fresca',
          description: 'Cambiar diariamente. Múltiples fuentes de agua en diferentes ubicaciones.',
        },
        {
          subtitle: 'Fuentes de Agua',
          description: 'Muchos gatos prefieren agua en movimiento. Considerar fuentes circulantes.',
        },
        {
          subtitle: 'Alimento Húmedo',
          description: 'Contribuye significativamente a la hidratación diaria (70-80% humedad).',
        },
        {
          subtitle: 'Monitoreo',
          description: 'Consumo reducido de agua puede indicar problemas. Consultar veterinario si cambia.',
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
          className="bg-white rounded-xl shadow-lg p-8"
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
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
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

export default CatNutrition;
