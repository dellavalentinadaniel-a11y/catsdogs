
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Clock } from 'lucide-react';

const DogBreeds = () => {
  const breeds = [
    {
      name: 'Labrador Retriever',
      image: 'https://images.unsplash.com/photo-1658822249716-94ff552300ee',
      description: 'El Labrador es conocido por su naturaleza amigable y su inteligencia. Son excelentes perros de familia y muy versátiles.',
      temperament: 'Amigable, Activo, Leal',
      size: 'Grande (25-36 kg)',
      lifeExpectancy: '10-12 años',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      name: 'Pastor Alemán',
      image: 'https://images.unsplash.com/photo-1611941241207-cfcaac85fd9e',
      description: 'Inteligente, valiente y leal. El Pastor Alemán es ideal para trabajo policial, búsqueda y rescate, y como perro de familia.',
      temperament: 'Inteligente, Protector, Leal',
      size: 'Grande (30-40 kg)',
      lifeExpectancy: '9-13 años',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      name: 'Golden Retriever',
      image: 'https://images.unsplash.com/photo-1567637433376-2495b4ec4a82',
      description: 'Cariñoso, inteligente y devoto. El Golden es perfecto para familias y excelente como perro de terapia.',
      temperament: 'Cariñoso, Inteligente, Confiable',
      size: 'Grande (25-34 kg)',
      lifeExpectancy: '10-12 años',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      name: 'Bulldog Francés',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
      description: 'Pequeño pero robusto, el Bulldog Francés es juguetón, adaptable y excelente para apartamentos.',
      temperament: 'Juguetón, Adaptable, Alerta',
      size: 'Pequeño (8-14 kg)',
      lifeExpectancy: '10-12 años',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      name: 'Husky Siberiano',
      image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea',
      description: 'Enérgico y resistente, el Husky es conocido por sus ojos azules y su personalidad amigable e independiente.',
      temperament: 'Enérgico, Independiente, Amigable',
      size: 'Mediano (16-27 kg)',
      lifeExpectancy: '12-14 años',
      gradient: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {breeds.map((breed, index) => (
        <motion.div
          key={breed.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${breed.gradient} opacity-20`} />
          </div>
          
          <div className="p-6">
            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${breed.gradient} bg-clip-text text-transparent`}>
              {breed.name}
            </h3>
            
            <p className="text-gray-600 mb-4">{breed.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${breed.gradient}`}>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Temperamento:</span>
                  <p className="font-semibold text-gray-800">{breed.temperament}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${breed.gradient}`}>
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tamaño:</span>
                  <p className="font-semibold text-gray-800">{breed.size}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${breed.gradient}`}>
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">Esperanza de vida:</span>
                  <p className="font-semibold text-gray-800">{breed.lifeExpectancy}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DogBreeds;
