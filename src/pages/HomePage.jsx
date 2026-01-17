
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dog, Cat, Fish, PawPrint, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import AdSpace from '@/components/AdSpace';

const HomePage = () => {
  const features = [
    {
      icon: Dog,
      title: 'Perros',
      description: 'Descubre razas, cuidados, alimentación y todo sobre tu mejor amigo canino.',
      link: '/perros',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Cat,
      title: 'Gatos',
      description: 'Conoce las razas felinas, sus necesidades y cómo cuidar a tu compañero.',
      link: '/gatos',
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      icon: Fish,
      title: 'Acuarios',
      description: 'Guía para peces tropicales, configuración de tanques y mantenimiento.',
      link: '/acuarios',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: PawPrint,
      title: 'Reptiles',
      description: 'Todo sobre terrarios, iluminación y cuidado de reptiles y anfibios.',
      link: '/reptiles',
      gradient: 'from-green-500 to-emerald-700',
    },
    {
      icon: BookOpen,
      title: 'Blog',
      description: 'Artículos y consejos expertos sobre el cuidado de tus mascotas.',
      link: '/blog',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: ShoppingBag,
      title: 'Productos',
      description: 'Encuentra los mejores productos para el bienestar de tu mascota.',
      link: '/productos',
      gradient: 'from-orange-400 to-orange-600',
    },
  ];

  const faqItems = [
    { question: "¿Cómo elijo la mascota adecuada para mi estilo de vida?", answer: "Considera tu tiempo disponible, espacio en casa y presupuesto. Los perros requieren más tiempo y espacio, mientras que gatos, peces o reptiles pueden ser mejores para apartamentos o personas ocupadas." },
    { question: "¿Con qué frecuencia debo llevar a mi mascota al veterinario?", answer: "Al menos una vez al año para un chequeo general y vacunas. Mascotas mayores (senior) deberían ir cada 6 meses." },
    { question: "¿Qué alimentos humanos son tóxicos para las mascotas?", answer: "Chocolate, uvas, cebolla, ajo, xilitol (edulcorante), y alcohol son altamente tóxicos para perros y gatos." }
  ];

  const testimonials = [
    { author: "Ana García", petType: "Dueña de Golden Retriever", text: "Las guías de nutrición cambiaron la vida de mi perro. ¡Su pelaje nunca ha estado mejor!", rating: 5 },
    { author: "Pedro Soto", petType: "Aficionado a Acuarios", text: "La guía de ciclado de acuarios es la más clara que he encontrado. Muy recomendada para principiantes.", rating: 5 },
    { author: "Luisa Méndez", petType: "Mamá de Gatos", text: "Gracias a los consejos de comportamiento, mis dos gatos por fin se llevan bien.", rating: 4 }
  ];

  return (
    <>
      <SEO 
        title="PetCare - Guía Completa de Cuidado de Mascotas" 
        description="Descubre todo sobre el cuidado, alimentación y bienestar de mascotas. Guías expertas para perros, gatos, peces y reptiles."
        organization={true}
      />

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1638271118625-cf59e82695c0)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bienestar para Todas tus Mascotas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Desde perros y gatos hasta peces y reptiles. Tu guía experta de cuidado integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/perros"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all"
              >
                Explorar Guías
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Todo lo que Necesitas Saber
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Navega por nuestras categorías especializadas para encontrar información experta y confiable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link
                to={feature.link}
                className="block h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 group border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-blue-500 font-semibold group-hover:gap-4 transition-all">
                  Explorar
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <AdSpace size="large-banner" />

      {/* Testimonials Section */}
      <Testimonials items={testimonials} />

      {/* FAQ Section */}
      <FAQ items={faqItems} title="Preguntas Frecuentes sobre Mascotas" />
      
      {/* Footer Newsletter Area */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Únete a nuestra comunidad</h2>
          <p className="text-gray-400 mb-8">Recibe los mejores consejos, noticias y ofertas exclusivas directamente en tu correo.</p>
          <div className="flex justify-center">
            <Newsletter variant="footer" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
