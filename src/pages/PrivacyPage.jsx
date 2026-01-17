
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Introducción',
      content: 'En PetCare, nos tomamos muy en serio la privacidad de tus datos. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política.',
    },
    {
      icon: Eye,
      title: 'Información que Recopilamos',
      content: 'Podemos recopilar información personal que nos proporcionas voluntariamente, como tu nombre, dirección de correo electrónico y número de teléfono cuando te registras en nuestro boletín o nos contactas. También recopilamos automáticamente cierta información técnica, como tu dirección IP, tipo de navegador y páginas visitadas, para mejorar tu experiencia de usuario.',
    },
    {
      icon: Lock,
      title: 'Cómo Usamos la Información',
      content: 'Utilizamos tu información para proporcionarte nuestros servicios, responder a tus consultas, enviarte actualizaciones sobre cuidados de mascotas (si te has suscrito) y mejorar la funcionalidad de nuestro sitio. No vendemos ni alquilamos tu información personal a terceros con fines comerciales.',
    },
    {
      icon: FileText,
      title: 'Derechos del Usuario',
      content: 'Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. También puedes optar por no recibir nuestras comunicaciones de marketing siguiendo los enlaces de cancelación de suscripción en nuestros correos electrónicos o contactándonos directamente.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Política de Privacidad - PetCare</title>
        <meta name="description" content="Política de privacidad de PetCare. Conoce cómo protegemos y gestionamos tus datos personales." />
      </Helmet>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Tu confianza es lo más importante para nosotros. Aquí te explicamos cómo cuidamos tus datos.
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
                className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center"
            >
              <div className="flex justify-center mb-4">
                <Mail className="w-10 h-10 text-white/90" />
              </div>
              <h2 className="text-2xl font-bold mb-4">¿Tienes dudas?</h2>
              <p className="mb-6 text-white/90">
                Si tienes preguntas sobre nuestra política de privacidad, no dudes en contactarnos.
              </p>
              <a 
                href="/contacto" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-md"
              >
                Contáctanos
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
