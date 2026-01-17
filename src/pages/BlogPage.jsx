
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import Newsletter from '@/components/Newsletter';
import { trackBlogClick } from '@/lib/analytics';

const BlogPage = () => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog' }
  ];

  const articles = [
    {
      slug: 'como-entrenar-a-tu-perro',
      title: 'Cómo Entrenar a tu Perro: Guía Completa para Principiantes',
      excerpt: 'Descubre técnicas efectivas de entrenamiento canino con refuerzo positivo. Aprende comandos básicos y cómo establecer una relación sólida.',
      image: 'https://images.unsplash.com/photo-1664837946343-3666ee0b008e',
      category: 'Entrenamiento',
      author: 'María González',
      date: '2026-01-15',
      readTime: '8 min',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      slug: 'gatos-interior-vs-exterior',
      title: 'Gatos de Interior vs Exterior: ¿Cuál es Mejor?',
      excerpt: 'Análisis completo de los pros y contras de mantener a tu gato en interior o permitirle acceso al exterior.',
      image: 'https://images.unsplash.com/photo-1651502879761-564faf100f9b',
      category: 'Comportamiento',
      author: 'Carlos Ruiz',
      date: '2026-01-12',
      readTime: '6 min',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      slug: 'nutricion-felina-esencial',
      title: 'Nutrición Felina: Lo que Todo Dueño Debe Saber',
      excerpt: 'Guía completa sobre las necesidades nutricionales de los gatos. Tipos de alimento, nutrientes esenciales y cómo elegir la mejor dieta.',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
      category: 'Nutrición',
      author: 'Laura Martínez',
      date: '2026-01-10',
      readTime: '7 min',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      slug: 'problemas-comportamiento-gatos',
      title: 'Problemas de Comportamiento en Gatos y Soluciones',
      excerpt: 'Desde rasguños hasta marcaje territorial, aprende a identificar y corregir los problemas de conducta más comunes en felinos.',
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',
      category: 'Comportamiento',
      author: 'Dr. Javier López',
      date: '2026-01-08',
      readTime: '9 min',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      slug: 'guia-vacunacion',
      title: 'Guía Completa de Vacunación en Perros y Gatos',
      excerpt: 'Calendario de vacunación esencial para cachorros y adultos. Protege a tus mascotas de enfermedades prevenibles.',
      image: 'https://images.unsplash.com/photo-1628009368231-760335546e96',
      category: 'Salud',
      author: 'Dra. Ana Fernández',
      date: '2026-01-05',
      readTime: '10 min',
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      slug: 'acuarios-principiantes',
      title: 'Acuarios para Principiantes: Guía Paso a Paso',
      excerpt: 'Todo lo que necesitas para montar tu primer acuario con éxito: equipamiento, ciclo del nitrógeno y selección de peces.',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5',
      category: 'Acuarios',
      author: 'Roberto Silva',
      date: '2026-01-03',
      readTime: '12 min',
      gradient: 'from-cyan-600 to-blue-600',
    }
  ];

  return (
    <>
      <SEO 
        title="Blog de Cuidado de Mascotas - Consejos y Guías"
        description="Artículos expertos sobre salud, comportamiento y nutrición para perros, gatos, peces y reptiles. Mantente informado con PetCare."
        breadcrumbs={breadcrumbs}
        organization={true}
      />

      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="flex flex-col lg:flex-row gap-12 mt-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Blog de Mascotas
                </h1>
                <p className="text-xl text-gray-600">
                  Consejos expertos para el bienestar de tu mejor amigo.
                </p>
              </motion.div>

              <div className="space-y-12">
                {articles.map((article, index) => (
                  <div key={article.slug}>
                    {index === 3 && <AdSpace size="banner" className="hidden md:flex" />}
                    
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col md:flex-row"
                    >
                      <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${article.gradient} text-white text-xs font-bold rounded-full uppercase tracking-wide`}>
                          {article.category}
                        </div>
                      </div>

                      <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                            <Link 
                              to={`/blog/${article.slug}`}
                              onClick={() => trackBlogClick(article.title)}
                            >
                              {article.title}
                            </Link>
                          </h2>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </span>
                          </div>
                          <Link
                            to={`/blog/${article.slug}`}
                            onClick={() => trackBlogClick(article.title)}
                            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:gap-3 transition-all"
                          >
                            Leer <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              <Newsletter variant="sidebar" />
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Categorías Populares</h3>
                <div className="flex flex-wrap gap-2">
                  {['Entrenamiento', 'Salud', 'Nutrición', 'Comportamiento', 'Acuarios', 'Reptiles'].map(cat => (
                    <Link 
                      key={cat}
                      to={`/blog?cat=${cat.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full text-sm transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <AdSpace size="medium" />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
