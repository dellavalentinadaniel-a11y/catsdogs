
import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComparisonTable from '@/components/ComparisonTable';
import AdSpace from '@/components/AdSpace';

const foodProducts = [
  {
    name: "Royal Canin Size Health",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=200&q=80",
    features: ["Proteína de alta digestibilidad", "Croqueta adaptada", "Complejo antioxidante"],
    rating: 4.8,
    pros: ["Marca veterinaria confiable", "Variedad por razas"],
    cons: ["Precio elevado", "Contiene granos"],
    price: "$55.990",
    link: "#"
  },
  {
    name: "Taste of the Wild",
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=200&q=80",
    features: ["Sin granos", "Carne real primer ingrediente", "Probióticos K9"],
    rating: 4.7,
    pros: ["Ingredientes naturales", "Alta palatabilidad"],
    cons: ["Puede ser muy rico en proteínas para algunos"],
    price: "$62.990",
    link: "#"
  },
  {
    name: "Pro Plan OptiHealth",
    image: "https://images.unsplash.com/photo-1608408843596-f311c9705889?auto=format&fit=crop&w=200&q=80",
    features: ["Spirulina", "Carne fresca", "Tecnología Opti"],
    rating: 4.5,
    pros: ["Buena relación precio/calidad", "Fácil de encontrar"],
    cons: ["Contiene subproductos"],
    price: "$48.990",
    link: "#"
  }
];

const ComparisonsPage = () => {
  const breadcrumbs = [
    { name: 'Recursos', path: '/recursos' },
    { name: 'Comparativas', path: '/comparativas' }
  ];

  return (
    <>
      <SEO title="Comparativas de Productos para Mascotas" description="Análisis y comparaciones de los mejores alimentos, juguetes y accesorios." breadcrumbs={breadcrumbs} />
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="text-center mb-16 mt-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Comparativas 2024</h1>
            <p className="text-xl text-gray-600">Te ayudamos a elegir lo mejor para tu mascota con análisis imparciales.</p>
          </div>

          <div className="space-y-20">
            {/* Comparison 1 */}
            <section id="alimentos-perros">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-blue-500 pl-4">Mejores Alimentos para Perros</h2>
                <p className="text-gray-600 mb-8 max-w-3xl">Analizamos las marcas líderes del mercado basándonos en ingredientes, valor nutricional y opiniones de dueños. La nutrición es el pilar fundamental de la salud de tu perro.</p>
                
                <ComparisonTable products={foodProducts} />

                <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-2 text-blue-900">Nuestra Recomendación</h3>
                  <p className="text-blue-800">
                    Si buscas la mejor relación calidad-precio, <strong>Pro Plan</strong> es una excelente opción. Sin embargo, si tu presupuesto lo permite y prefieres ingredientes naturales sin granos, <strong>Taste of the Wild</strong> es superior nutricionalmente.
                  </p>
                </div>
              </motion.div>
            </section>

            <AdSpace size="banner" />

            {/* Comparison 2 Placeholder */}
             <section id="alimentos-gatos">
              <div className="bg-white rounded-2xl shadow-lg p-8 opacity-70">
                <h2 className="text-3xl font-bold mb-4 text-gray-400">Próximamente: Comparativa de Alimentos para Gatos</h2>
                <p className="text-gray-500">Estamos analizando las mejores opciones para tu felino. ¡Vuelve pronto!</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonsPage;
