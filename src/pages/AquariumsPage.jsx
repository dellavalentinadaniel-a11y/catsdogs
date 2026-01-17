
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import FAQ from '@/components/FAQ';
import FishBreeds from '@/components/aquariums/FishBreeds';
import FishCare from '@/components/aquariums/FishCare';
import FishNutrition from '@/components/aquariums/FishNutrition';

const AquariumsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/acuarios', label: 'Peces' },
    { path: '/acuarios/cuidados', label: 'Cuidados' },
    { path: '/acuarios/alimentacion', label: 'Alimentación' },
  ];

  const breadcrumbs = [
    { name: 'Acuarios', path: '/acuarios' },
    ...(currentPath.includes('cuidados') ? [{ name: 'Cuidados', path: '/acuarios/cuidados' }] : []),
    ...(currentPath.includes('alimentacion') ? [{ name: 'Alimentación', path: '/acuarios/alimentacion' }] : [])
  ];

  const faqItems = [
    { question: "¿Qué es el ciclo del nitrógeno?", answer: "Es el proceso biológico donde bacterias benéficas convierten desechos tóxicos (amoniaco) en sustancias menos nocivas (nitratos). Es crucial antes de añadir peces." },
    { question: "¿Con qué frecuencia debo cambiar el agua?", answer: "Generalmente, un cambio parcial del 20-30% semanalmente es recomendado para mantener los parámetros estables y reducir nitratos." },
  ];

  return (
    <>
      <SEO 
        title="Acuarios y Peces - Guía de Acuariofilia"
        description="Aprende a montar y mantener un acuario saludable. Guía de especies de peces, parámetros del agua y nutrición acuática."
        breadcrumbs={breadcrumbs}
        faq={faqItems}
      />

      <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Mundo Acuático
            </h1>
            <p className="text-xl text-gray-600">
              Crea y mantén un ecosistema saludable para tus peces
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
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
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
            <Route index element={<FishBreeds />} />
            <Route path="cuidados" element={<FishCare />} />
            <Route path="alimentacion" element={<FishNutrition />} />
          </Routes>

          <FAQ items={faqItems} title="Preguntas Frecuentes sobre Acuarios" />
        </div>
      </div>
    </>
  );
};

export default AquariumsPage;
