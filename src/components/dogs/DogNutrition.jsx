
import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Beef, Clock, Scale } from 'lucide-react';

const DogNutrition = () => {
  const sections = [
    {
      icon: Beef,
      title: 'Tipos de Alimento',
      gradient: 'from-red-400 to-orange-500',
      content: [
        {
          subtitle: 'Alimento Seco (Pienso)',
          description: 'Conveniente y equilibrado. Ayuda a mantener la salud dental. Elegir marcas de calidad premium.',
        },
        {
          subtitle: 'Alimento Húmedo',
          description: 'Mayor palatabilidad y humedad. Ideal para perros con dificultades dentales o que beben poco agua.',
        },
        {
          subtitle: 'Dieta Casera',
          description: 'Requiere planificación con veterinario. Debe incluir proteínas, carbohidratos, grasas y vegetales balanceados.',
        },
        {
          subtitle: 'Dieta BARF',
          description: 'Alimentos crudos biológicamente apropiados. Consultar con veterinario especializado antes de implementar.',
        },
      ],
    },
    {
      icon: Apple,
      title: 'Nutrientes Esenciales',
      gradient: 'from-green-400 to-emerald-500',
      content: [
        {
          subtitle: 'Proteínas',
          description: 'Esenciales para músculos y tejidos. Fuentes: pollo, pescado, carne de res, cordero.',
        },
        {
          subtitle: 'Grasas',
          description: 'Energía y salud de piel y pelaje. Omega-3 y Omega-6 son fundamentales.',
        },
        {
          subtitle: 'Carbohidratos',
          description: 'Fuente de energía. Incluir arroz, avena, batata en proporciones adecuadas.',
        },
        {
          subtitle: 'Vitaminas y Minerales',
          description: 'Calcio, fósforo, vitaminas A, D, E, K son cruciales para la salud general.',
        },
      ],
    },
    {
      icon: Scale,
      title: 'Porciones Recomendadas',
      gradient: 'from-blue-400 to-indigo-500',
      content: [
        {
          subtitle: 'Cachorros (2-12 meses)',
          description: '3-4 comidas al día. Alimento específico para cachorros, rico en proteínas y calorías para crecimiento.',
        },
        {
          subtitle: 'Adultos (1-7 años)',
          description: '2 comidas al día. Porción según peso: 2-3% del peso corporal ideal del perro.',
        },
        {
          subtitle: 'Seniors (+7 años)',
          description: '2 comidas al día. Menor contenido calórico, mayor fibra. Considerar necesidades especiales.',
        },
        {
          subtitle: 'Ajustes por Actividad',
          description: 'Perros muy activos necesitan 20-40% más calorías. Perros sedentarios requieren menos.',
        },
      ],
    },
    {
      icon: Clock,
      title: 'Horarios de Alimentación',
      gradient: 'from-purple-400 to-pink-500',
      content: [
        {
          subtitle: 'Consistencia',
          description: 'Alimentar a las mismas horas diariamente ayuda a la digestión y establece rutina.',
        },
        {
          subtitle: 'Espaciado',
          description: 'Dejar al menos 8-10 horas entre comidas principales para adultos.',
        },
        {
          subtitle: 'Ejercicio',
          description: 'Evitar ejercicio intenso 1-2 horas antes y después de comer para prevenir torsión gástrica.',
        },
        {
          subtitle: 'Agua',
          description: 'Acceso constante a agua fresca. Cambiar el agua al menos dos veces al día.',
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

export default DogNutrition;
