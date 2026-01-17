
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import FAQ from '@/components/FAQ';
import CatBreeds from '@/components/cats/CatBreeds';
import CatCare from '@/components/cats/CatCare';
import CatNutrition from '@/components/cats/CatNutrition';

const CatsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/gatos', label: 'Razas', component: CatBreeds },
    { path: '/gatos/cuidados', label: 'Cuidados', component: CatCare },
    { path: '/gatos/alimentacion', label: 'Alimentación', component: CatNutrition },
  ];

  const breadcrumbs = [
    { name: 'Gatos', path: '/gatos' },
    ...(currentPath.includes('cuidados') ? [{ name: 'Cuidados', path: '/gatos/cuidados' }] : []),
    ...(currentPath.includes('alimentacion') ? [{ name: 'Alimentación', path: '/gatos/alimentacion' }] : [])
  ];

  const faqItems = [
    { question: "¿Por qué mi gato rasca los muebles?", answer: "Es un comportamiento natural para marcar territorio y afilar garras. Proporciona rascadores adecuados y usa hierba gatera para atraerlos allí." },
    { question: "¿Es mejor comida seca o húmeda?", answer: "Una combinación es ideal. La comida húmeda proporciona hidratación esencial para prevenir problemas renales, mientras la seca ayuda a limpiar los dientes." },
  ];

  return (
    <>
      <SEO 
        title="Todo sobre Gatos - Razas, Comportamiento y Salud"
        description="Guía experta para amantes de los gatos. Aprende sobre diferentes razas, nutrición felina adecuada y consejos de comportamiento."
        breadcrumbs={breadcrumbs}
        faq={faqItems}
      />

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Mundo Felino
            </h1>
            <p className="text-xl text-gray-600">
              Descubre razas, cuidados y alimentación para tu compañero felino
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
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-pink-500'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route index element={<CatBreeds />} />
            <Route path="cuidados" element={<CatCare />} />
            <Route path="alimentacion" element={<CatNutrition />} />
          </Routes>

          <FAQ items={faqItems} title="Preguntas Frecuentes sobre Gatos" />
        </div>
      </div>
    </>
  );
};

export default CatsPage;
