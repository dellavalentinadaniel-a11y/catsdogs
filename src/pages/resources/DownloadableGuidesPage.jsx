
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Download, Star } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import GuideDownloadModal from '@/components/GuideDownloadModal';

const guides = [
  { id: 1, title: "Guía completa de cuidados para perros primerizos", desc: "Todo lo que necesitas saber para recibir a tu nuevo cachorro.", tags: ["Perros", "Principiantes"] },
  { id: 2, title: "Manual de nutrición felina", desc: "Aprende a leer etiquetas y elegir la mejor dieta para tu gato.", tags: ["Gatos", "Nutrición"] },
  { id: 3, title: "Acuarios para principiantes", desc: "Configuración paso a paso de tu primer tanque tropical.", tags: ["Acuarios"] },
  { id: 4, title: "Reptiles como mascotas: guía de inicio", desc: "Especies ideales para comenzar en el mundo de los reptiles.", tags: ["Reptiles"] },
  { id: 5, title: "Primeros auxilios para mascotas", desc: "Manual de emergencia esencial para cualquier dueño.", tags: ["Salud", "General"] },
  { id: 6, title: "Calendario de vacunación", desc: "Mantén al día la salud de tu mascota con esta guía visual.", tags: ["Salud"] },
  { id: 7, title: "Adiestramiento básico de perros", desc: "Comandos fundamentales para un perro bien portado.", tags: ["Entrenamiento"] },
  { id: 8, title: "Comportamiento felino explicado", desc: "Entiende por qué tu gato hace lo que hace.", tags: ["Comportamiento"] },
];

const DownloadableGuidesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const breadcrumbs = [
    { name: 'Recursos', path: '/recursos' },
    { name: 'Guías Descargables', path: '/recursos/guias-descargables' }
  ];

  return (
    <>
      <SEO title="Guías Gratuitas de Cuidado de Mascotas" description="Descarga manuales PDF gratuitos sobre cuidado de perros, gatos, peces y reptiles." breadcrumbs={breadcrumbs} />
      
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="text-center mb-16 mt-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Guías Gratuitas</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Conocimiento experto condensado en manuales prácticos. Descárgalos y léelos cuando quieras.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col h-full border border-gray-100 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedGuide(guide)}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex gap-2 mb-3">
                  {guide.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">{guide.desc}</p>
                <button className="w-full py-2 bg-gray-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 border border-indigo-100 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Descargar PDF
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <GuideDownloadModal 
        isOpen={!!selectedGuide} 
        onClose={() => setSelectedGuide(null)} 
        guide={selectedGuide}
      />
    </>
  );
};

export default DownloadableGuidesPage;
