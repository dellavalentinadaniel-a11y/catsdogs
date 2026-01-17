
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplets, Ruler, Clock } from 'lucide-react';

const FishBreeds = () => {
  const breeds = [
    {
      name: 'Pez Betta',
      image: 'https://images.unsplash.com/photo-1533601017-dc61895e03c0',
      description: 'Conocido por sus colores vibrantes y aletas fluidas. Ideal para principiantes, pero territorial con otros machos.',
      temperament: 'Semi-agresivo (Solitario)',
      water: '24-28°C, pH 6.5-7.5',
      size: 'Pequeño (5-7 cm)',
      lifespan: '2-4 años',
      gradient: 'from-blue-400 to-indigo-600',
    },
    {
      name: 'Goldfish',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
      description: 'El clásico de agua fría. Social y pacífico, requiere mucho espacio y buena filtración debido a sus desechos.',
      temperament: 'Pacífico, Social',
      water: '18-22°C, pH 7.0-8.0',
      size: 'Mediano (15-30 cm)',
      lifespan: '10-20 años',
      gradient: 'from-orange-400 to-yellow-500',
    },
    {
      name: 'Tetra Neón',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5',
      description: 'Pequeño pez de cardumen con franjas brillantes azules y rojas. Necesitan estar en grupos de al menos 6.',
      temperament: 'Pacífico, Cardumen',
      water: '20-26°C, pH 6.0-7.0',
      size: 'Muy Pequeño (3-4 cm)',
      lifespan: '5-8 años',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'Pez Ángel (Escalar)',
      image: 'https://images.unsplash.com/photo-1544670273-047466548d7c',
      description: 'Elegante y majestuoso, necesita acuarios altos. Puede ser territorial y comer peces muy pequeños.',
      temperament: 'Semi-agresivo',
      water: '24-29°C, pH 6.0-7.5',
      size: 'Grande (15 cm)',
      lifespan: '10-12 años',
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      name: 'Pez Disco',
      image: 'https://images.unsplash.com/photo-1552554605-24d1421696a4',
      description: 'El rey del acuario. Hermosos colores pero exigente en calidad de agua y cuidados. Para expertos.',
      temperament: 'Pacífico, Tímido',
      water: '28-31°C, pH 6.0-6.5',
      size: 'Grande (15-20 cm)',
      lifespan: '10-15 años',
      gradient: 'from-red-400 to-orange-500',
    },
    {
      name: 'Corydoras',
      image: 'https://images.unsplash.com/photo-1587841151608-f46328325c48',
      description: 'Pez de fondo activo y pacífico. Excelente limpiador. Debe mantenerse en grupos y con sustrato suave.',
      temperament: 'Pacífico, Fondo',
      water: '22-26°C, pH 6.0-7.5',
      size: 'Pequeño (4-7 cm)',
      lifespan: '5-7 años',
      gradient: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {breeds.map((breed, index) => (
        <motion.div
          key={breed.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-blue-50"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${breed.gradient} opacity-30`} />
          </div>
          
          <div className="p-6">
            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${breed.gradient} bg-clip-text text-transparent`}>
              {breed.name}
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{breed.description}</p>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-gray-700">{breed.temperament}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{breed.water}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">{breed.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{breed.lifespan}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FishBreeds;
