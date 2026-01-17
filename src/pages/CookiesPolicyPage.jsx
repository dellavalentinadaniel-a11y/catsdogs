
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cookie, Settings, ShieldCheck, Globe } from 'lucide-react';

const CookiesPolicyPage = () => {
  const sections = [
    {
      icon: Cookie,
      title: '¿Qué son las cookies?',
      content: 'Las cookies son pequeños archivos de texto que los sitios web que visitas guardan en tu ordenador o dispositivo móvil. Permiten que el sitio web recuerde tus acciones y preferencias (como inicio de sesión, idioma, tamaño de fuente y otras preferencias de visualización) durante un período de tiempo, para que no tengas que volver a introducirlas cada vez que vuelvas al sitio o navegues de una página a otra.',
    },
    {
      icon: Settings,
      title: 'Tipos de cookies que utilizamos',
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento técnico del sitio web. Sin ellas, el sitio no funcionaría correctamente.</li>
          <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando y reportando información de forma anónima.</li>
          <li><strong>Cookies de marketing:</strong> Se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.</li>
        </ul>
      )
    },
    {
      icon: ShieldCheck,
      title: 'Cómo gestionar las cookies',
      content: 'Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu ordenador y puedes configurar la mayoría de los navegadores para que eviten que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.',
    },
    {
      icon: Globe,
      title: 'Cookies de terceros',
      content: 'En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. Por ejemplo, este sitio utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y confiables en la web para ayudarnos a entender cómo usas el sitio y formas en que podemos mejorar tu experiencia.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Política de Cookies - PetCare</title>
        <meta name="description" content="Información detallada sobre el uso de cookies en PetCare y cómo gestionarlas." />
      </Helmet>

      <div className="bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Política de Cookies
            </h1>
            <p className="text-xl text-gray-600">
              Transparencia total sobre cómo utilizamos las cookies para mejorar tu experiencia.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <section.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPolicyPage;
