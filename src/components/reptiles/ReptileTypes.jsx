
import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Sun, Ruler, Clock } from 'lucide-react';

const ReptileTypes = () => {
  const reptiles = [
    {
      name: 'Gecko Leopardo',
      image: 'https://images.unsplash.com/photo-1596710629139-41724497e889',
      description: 'Popular por su docilidad y fácil cuidado. Nocturnos, terrestres y con gran variedad de colores (morfos).',
      habitat: 'Desértico / Terrestre',
      temp: '24-32°C',
      size: 'Pequeño (20-25 cm)',
      lifespan: '10-20 años',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'Dragón Barbudo',
      image: 'https://images.unsplash.com/photo-1535008652995-e95986556e32',
      description: 'Lagarto sociable y activo. Requiere iluminación UVB potente y espacio amplio. Dieta omnívora.',
      habitat: 'Semi-árido / Terrestre',
      temp: '25-40°C',
      size: 'Mediano (40-60 cm)',
      lifespan: '10-15 años',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      name: 'Pitón Bola',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919',
      description: 'Serpiente dócil y de movimiento lento. Ideal para principiantes en ofidios. Requiere humedad controlada.',
      habitat: 'Tropical / Terrestre',
      temp: '25-30°C',
      size: 'Mediano (1.2-1.5 m)',
      lifespan: '20-30 años',
      gradient: 'from-stone-500 to-stone-700',
    },
    {
      name: 'Tortuga de Tierra',
      image: 'https://images.unsplash.com/photo-1437622645530-188582c772f1',
      description: 'Longevas y tranquilas. Necesitan recintos grandes, idealmente exteriores en climas adecuados. Estrictamente herbívoras.',
      habitat: 'Terrestre / Jardín',
      temp: '20-30°C',
      size: 'Variable (15-30+ cm)',
      lifespan: '50-80+ años',
      gradient: 'from-green-500 to-emerald-700',
    },
    {
      name: 'Camaleón Velado',
      image: 'https://images.unsplash.com/photo-1570390161483-e847c210d704',
      description: 'Fascinantes por su cambio de color y ojos independientes. Más delicados, requieren ventilación y humedad alta.',
      habitat: 'Arbóreo / Tropical',
      temp: '22-30°C',
      size: 'Mediano (35-45 cm)',
      lifespan: '5-7 años',
      gradient: 'from-lime-400 to-green-600',
    },
    {
      name: 'Iguana Verde',
      image: 'https://images.unsplash.com/photo-1518182170546-07fa6ee089ae',
      description: 'Requiere mucho espacio (habitación o jaula enorme). Inteligentes pero pueden ser temperamentales. Herbívoras.',
      habitat: 'Arbóreo / Tropical',
      temp: '26-35°C',
      size: 'Muy Grande (1.5-2 m)',
      lifespan: '15-20 años',
      gradient: 'from-green-400 to-teal-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reptiles.map((reptile, index) => (
        <motion.div
          key={reptile.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-green-50"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={reptile.image}
              alt={reptile.name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${reptile.gradient} opacity-30`} />
          </div>
          
          <div className="p-6">
            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${reptile.gradient} bg-clip-text text-transparent`}>
              {reptile.name}
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{reptile.description}</p>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700">{reptile.habitat}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="text-gray-700">{reptile.temp}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{reptile.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{reptile.lifespan}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReptileTypes;
