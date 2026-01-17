
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Clock } from 'lucide-react';

const CatBreeds = () => {
  const breeds = [
    {
      name: 'Persa',
      image: 'https://images.unsplash.com/photo-1564092302867-3b6a958dbfb6',
      description: 'El gato Persa es conocido por su pelaje largo y lujoso y su cara plana. Son tranquilos, cariñosos y excelentes compañeros de interior.',
      temperament: 'Tranquilo, Cariñoso, Dulce',
      size: 'Mediano (3.5-5.5 kg)',
      lifeExpectancy: '12-17 años',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      name: 'Siamés',
      image: 'https://images.unsplash.com/photo-1551053039-74159f154a3d',
      description: 'Inteligente y vocal, el Siamés es conocido por su pelaje claro con puntos oscuros y sus ojos azules brillantes. Son muy sociales y comunicativos.',
      temperament: 'Vocal, Inteligente, Social',
      size: 'Mediano (3-5 kg)',
      lifeExpectancy: '12-20 años',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'Maine Coon',
      image: 'https://images.unsplash.com/photo-1619464281859-4c0e0c1a63d8',
      description: 'Una de las razas más grandes, el Maine Coon es gentil, juguetón y se adapta bien a familias. Su pelaje largo requiere cuidados regulares.',
      temperament: 'Gentil, Juguetón, Amigable',
      size: 'Grande (5.5-8 kg)',
      lifeExpectancy: '12-15 años',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      name: 'Bengalí',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',
      description: 'Con su pelaje manchado que recuerda a un leopardo, el Bengalí es activo, atlético y muy curioso. Necesita mucha estimulación.',
      temperament: 'Activo, Curioso, Atlético',
      size: 'Mediano-Grande (4-7 kg)',
      lifeExpectancy: '12-16 años',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      name: 'Ragdoll',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
      description: 'El Ragdoll es conocido por relajarse completamente cuando lo cargan. Son dóciles, cariñosos y excelentes para familias con niños.',
      temperament: 'Dócil, Cariñoso, Relajado',
      size: 'Grande (4.5-9 kg)',
      lifeExpectancy: '12-17 años',
      gradient: 'from-pink-400 to-rose-500',
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

export default CatBreeds;
