
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Puzzle, Heart, Cat } from 'lucide-react';

const CatCare = () => {
  const careCategories = [
    {
      icon: Sparkles,
      title: 'Higiene',
      gradient: 'from-pink-400 to-rose-500',
      tips: [
        'Los gatos se asean solos, pero cepillar regularmente ayuda a prevenir bolas de pelo',
        'Baños ocasionales solo si es necesario (gatos de pelo largo 2-3 veces al año)',
        'Limpia la bandeja sanitaria diariamente para mantener la higiene',
        'Corta las uñas cada 2-3 semanas o proporciona rascadores',
        'Cepilla los dientes 2-3 veces por semana con productos felinos',
      ],
    },
    {
      icon: Puzzle,
      title: 'Enriquecimiento',
      gradient: 'from-purple-400 to-violet-500',
      tips: [
        'Proporciona juguetes variados: plumas, ratones, pelotas con cascabel',
        'Instala rascadores en diferentes áreas de la casa',
        'Crea espacios verticales: torres, estantes, repisas para trepar',
        'Dedica 15-20 minutos diarios a jugar interactivamente',
        'Rota los juguetes cada semana para mantener el interés',
      ],
    },
    {
      icon: Heart,
      title: 'Salud',
      gradient: 'from-blue-400 to-cyan-500',
      tips: [
        'Visita al veterinario anualmente para chequeos preventivos',
        'Mantén las vacunas al día (rabia, leucemia, calicivirus)',
        'Desparasita interna y externamente según recomendación veterinaria',
        'Monitorea cambios en apetito, sed, o uso de la bandeja',
        'Esteriliza/castra para prevenir problemas de salud y comportamiento',
      ],
    },
    {
      icon: Cat,
      title: 'Comportamiento',
      gradient: 'from-green-400 to-emerald-500',
      tips: [
        'Respeta su espacio y tiempo: los gatos son independientes',
        'No castigues, usa refuerzo positivo con premios y caricias',
        'Proporciona escondites seguros donde puedan refugiarse',
        'Mantén rutinas consistentes: alimentación, juego, descanso',
        'Socializa gradualmente con nuevas personas y situaciones',
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

export default CatCare;
