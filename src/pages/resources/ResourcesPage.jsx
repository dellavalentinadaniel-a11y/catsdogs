
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, FileText, ShoppingBag, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

const ResourcesPage = () => {
  const breadcrumbs = [{ name: 'Recursos', path: '/recursos' }];
  
  const sections = [
    {
      title: "Herramientas Interactivas",
      desc: "Calculadoras y tests para conocer mejor a tu mascota.",
      icon: Calculator,
      color: "text-blue-600",
      bg: "bg-blue-100",
      links: [
        { label: "Calculadora de Calorías", path: "/herramientas/calculadora-calorias" },
        { label: "Test de Compatibilidad", path: "/herramientas/test-compatibilidad-razas" }
      ]
    },
    {
      title: "Guías Descargables",
      desc: "Manuales completos en PDF para leer offline.",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-100",
      links: [
        { label: "Ver todas las guías", path: "/recursos/guias-descargables" }
      ]
    },
    {
      title: "Comparativas de Productos",
      desc: "Análisis detallados para hacer la mejor compra.",
      icon: ShoppingBag,
      color: "text-green-600",
      bg: "bg-green-100",
      links: [
        { label: "Ver comparativas", path: "/comparativas" }
      ]
    },
    {
      title: "Biblioteca de Artículos",
      desc: "Cientos de consejos sobre salud y comportamiento.",
      icon: BookOpen,
      color: "text-orange-600",
      bg: "bg-orange-100",
      links: [
        { label: "Ir al Blog", path: "/blog" }
      ]
    }
  ];

  return (
    <>
      <SEO title="Centro de Recursos PetCare" description="Herramientas, guías y artículos para el cuidado de mascotas." breadcrumbs={breadcrumbs} />
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="text-center mb-16 mt-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Centro de Recursos</h1>
            <p className="text-xl text-gray-600">Todo lo que necesitas para ser el mejor dueño.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl ${section.bg}`}>
                    <section.icon className={`w-8 h-8 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
                    <p className="text-gray-600 mb-6">{section.desc}</p>
                    <div className="space-y-3">
                      {section.links.map(link => (
                        <Link 
                          key={link.path}
                          to={link.path}
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium group transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;
