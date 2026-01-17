
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import FAQ from '@/components/FAQ';
import DogBreeds from '@/components/dogs/DogBreeds';
import DogCare from '@/components/dogs/DogCare';
import DogNutrition from '@/components/dogs/DogNutrition';

const DogsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/perros', label: 'Razas', component: DogBreeds },
    { path: '/perros/cuidados', label: 'Cuidados', component: DogCare },
    { path: '/perros/alimentacion', label: 'Alimentación', component: DogNutrition },
  ];

  const breadcrumbs = [
    { name: 'Perros', path: '/perros' },
    ...(currentPath.includes('cuidados') ? [{ name: 'Cuidados', path: '/perros/cuidados' }] : []),
    ...(currentPath.includes('alimentacion') ? [{ name: 'Alimentación', path: '/perros/alimentacion' }] : [])
  ];

  const faqItems = [
    { question: "¿Cuánto ejercicio necesita mi perro?", answer: "Depende de la raza. Perros activos como Border Collies necesitan 1-2 horas diarias, mientras que Bulldogs pueden estar bien con 30 minutos." },
    { question: "¿Qué vacunas son obligatorias?", answer: "La vacuna contra la rabia es legalmente obligatoria en la mayoría de países. El moquillo, parvovirus y hepatitis son esenciales (vacuna múltiple)." },
  ];

  return (
    <>
      <SEO 
        title="Todo sobre Perros - Razas, Cuidados y Nutrición"
        description="Guía completa para dueños de perros. Encuentra información sobre razas, consejos de entrenamiento, guías de alimentación y salud canina."
        breadcrumbs={breadcrumbs}
        faq={faqItems}
      />

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mundo Canino
            </h1>
            <p className="text-xl text-gray-600">
              Descubre razas, cuidados y alimentación para tu mejor amigo
            </p>
          </div>

          <AdSpace size="banner" />

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full shadow-lg p-2 gap-2 flex-wrap justify-center">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    currentPath === tab.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route index element={<DogBreeds />} />
            <Route path="cuidados" element={<DogCare />} />
            <Route path="alimentacion" element={<DogNutrition />} />
          </Routes>

          <FAQ items={faqItems} title="Preguntas Frecuentes sobre Perros" />
        </div>
      </div>
    </>
  );
};

export default DogsPage;
