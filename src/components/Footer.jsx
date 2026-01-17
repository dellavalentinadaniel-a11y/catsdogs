
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, PawPrint, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Newsletter from './Newsletter';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/perros', label: 'Perros' },
    { path: '/gatos', label: 'Gatos' },
    { path: '/acuarios', label: 'Acuarios' },
    { path: '/reptiles', label: 'Reptiles' },
    { path: '/blog', label: 'Blog' },
    { path: '/productos', label: 'Productos' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="w-6 h-6 text-pink-400" />
              <span className="text-xl font-bold">PetCare</span>
            </div>
            <p className="text-gray-300 text-sm mb-6">
              Tu guía completa para el cuidado, alimentación y bienestar de tus mascotas. Información confiable para perros, gatos, peces y reptiles.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 bg-white/10 rounded-full ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & More */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacidad" className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/politicas-cookies" className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  Política de Cookies
                </Link>
              </li>
              <li>
                 <Link to="/contacto" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <Newsletter variant="footer" />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} PetCare. Todos los derechos reservados.</p>
          <div className="flex gap-4">
             <Link to="/sitemap.xml" className="hover:text-white transition-colors">Mapa del sitio</Link>
             <Link to="/robots.txt" className="hover:text-white transition-colors">Robots.txt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
