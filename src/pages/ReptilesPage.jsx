
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import FAQ from '@/components/FAQ';
import ReptileTypes from '@/components/reptiles/ReptileTypes';
import ReptileCare from '@/components/reptiles/ReptileCare';
import ReptileNutrition from '@/components/reptiles/ReptileNutrition';

const ReptilesPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/reptiles', label: 'Tipos' },
    { path: '/reptiles/cuidados', label: 'Cuidados' },
    { path: '/reptiles/alimentacion', label: 'Alimentación' },
  ];

  const breadcrumbs = [
    { name: 'Reptiles', path: '/reptiles' },
    ...(currentPath.includes('cuidados') ? [{ name: 'Cuidados', path: '/reptiles/cuidados' }] : []),
    ...(currentPath.includes('alimentacion') ? [{ name: 'Alimentación', path: '/reptiles/alimentacion' }] : [])
  ];

  const faqItems = [
    { question: "¿Necesitan luz UVB todos los reptiles?", answer: "La mayoría de los reptiles diurnos (como iguanas y tortugas) la necesitan para sintetizar vitamina D3 y absorber calcio. Los nocturnos (como geckos leopardo) requieren menos, pero se benefician de ella." },
    { question: "¿Qué es el gradiente térmico?", answer: "Es proporcionar diferentes temperaturas dentro del terrario (una zona caliente y una fría) para que el reptil pueda regular su temperatura corporal moviéndose entre ellas." },
  ];

  return (
    <>
      <SEO 
        title="Reptiles y Anfibios - Guía de Herpetología"
        description="Información completa sobre el cuidado de reptiles. Terrarios, iluminación, alimentación y especies populares como geckos y tortugas."
        breadcrumbs={breadcrumbs}
        faq={faqItems}
      />

      <div className="bg-gradient-to-br from-stone-50 via-green-50 to-emerald-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-stone-600 bg-clip-text text-transparent">
              Mundo de Reptiles
            </h1>
            <p className="text-xl text-gray-600">
              Descubre el fascinante mundo de la herpetología doméstica
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
                      ? 'bg-gradient-to-r from-green-600 to-stone-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route index element={<ReptileTypes />} />
            <Route path="cuidados" element={<ReptileCare />} />
            <Route path="alimentacion" element={<ReptileNutrition />} />
          </Routes>

          <FAQ items={faqItems} title="Preguntas Frecuentes sobre Reptiles" />
        </div>
      </div>
    </>
  );
};

export default ReptilesPage;
