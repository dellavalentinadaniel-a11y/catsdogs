
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dumbbell, Heart, Brain } from 'lucide-react';

const DogCare = () => {
  const careCategories = [
    {
      icon: Sparkles,
      title: 'Higiene',
      gradient: 'from-blue-400 to-cyan-500',
      tips: [
        'Baña a tu perro cada 4-6 semanas con champú específico para perros',
        'Cepilla su pelaje regularmente (diario para razas de pelo largo)',
        'Limpia sus orejas semanalmente con productos veterinarios',
        'Corta sus uñas cada 3-4 semanas o cuando sea necesario',
        'Cepilla sus dientes diariamente con pasta dental canina',
      ],
    },
    {
      icon: Dumbbell,
      title: 'Ejercicio',
      gradient: 'from-green-400 to-emerald-500',
      tips: [
        'Proporciona al menos 30-60 minutos de ejercicio diario',
        'Adapta la intensidad según la edad y raza del perro',
        'Incluye juegos mentales y físicos para estimulación completa',
        'Paseos regulares ayudan a la socialización y exploración',
        'Evita ejercicio intenso inmediatamente después de comer',
      ],
    },
    {
      icon: Heart,
      title: 'Salud',
      gradient: 'from-pink-400 to-rose-500',
      tips: [
        'Visita al veterinario al menos una vez al año para chequeos',
        'Mantén al día las vacunas y desparasitaciones',
        'Observa cambios en comportamiento, apetito o energía',
        'Controla el peso para prevenir obesidad',
        'Proporciona agua fresca y limpia en todo momento',
      ],
    },
    {
      icon: Brain,
      title: 'Adiestramiento',
      gradient: 'from-purple-400 to-violet-500',
      tips: [
        'Comienza el entrenamiento desde cachorro con comandos básicos',
        'Usa refuerzo positivo: premios, elogios y juego',
        'Sé consistente con las reglas y rutinas',
        'Socializa a tu perro con otros animales y personas',
        'La paciencia es clave: cada perro aprende a su ritmo',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {careCategories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all"
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
                <div className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} flex-shrink-0`} />
                <p className="text-gray-700">{tip}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default DogCare;
