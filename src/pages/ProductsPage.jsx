
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import { trackAffiliateClick } from '@/lib/analytics';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Comida', 'Juguetes', 'Accesorios', 'Camas', 'Higiene'];
  const breadcrumbs = [{ name: 'Productos', path: '/productos' }];

  const products = [
    {
      id: 1,
      name: 'Alimento Premium para Perros Adultos',
      category: 'Comida',
      description: 'Alimento balanceado de alta calidad con pollo real como primer ingrediente. Rico en proteínas y nutrientes esenciales.',
      price: '$45.990',
      image: 'https://images.unsplash.com/photo-1702571077748-9e6b3c07b129',
      mercadoLibre: 'https://mercadolibre.com',
      amazon: 'https://amazon.com',
      gradient: 'from-amber-400 to-orange-500',
    },
     {
      id: 2,
      name: 'Juguete Interactivo Kong Classic',
      category: 'Juguetes',
      description: 'Juguete resistente de caucho natural. Perfecto para rellenar con premios y mantener a tu perro entretenido.',
      price: '$18.990',
      image: 'https://images.unsplash.com/photo-1694371292618-ca1931ae230e',
      mercadoLibre: 'https://mercadolibre.com',
      amazon: 'https://amazon.com',
      gradient: 'from-blue-400 to-indigo-500',
    },
  ];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <SEO 
        title="Productos para Mascotas - Ofertas y Recomendaciones"
        description="Encuentra los mejores productos para perros, gatos y más. Alimentos premium, juguetes duraderos y accesorios esenciales."
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 mt-4"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Productos Destacados
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Selección curada para el bienestar de tu compañero
            </p>

            <div className="max-w-3xl mx-auto bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-700">
                <strong>Aviso:</strong> Este sitio contiene enlaces de afiliado. Recibimos comisiones por compras realizadas a través de estos enlaces sin costo adicional para ti.
              </p>
            </div>
          </motion.div>

          <AdSpace size="banner" />

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap bg-white rounded-xl shadow-lg p-2 gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex flex-col"
              >
                {/* Product SEO Schema */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": product.name,
                    "image": product.image,
                    "description": product.description,
                    "offers": {
                      "@type": "Offer",
                      "price": product.price.replace('$', '').replace('.', ''),
                      "priceCurrency": "CLP",
                      "availability": "https://schema.org/InStock"
                    }
                  })}
                </script>

                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-20`} />
                  <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${product.gradient} text-white text-xs font-semibold rounded-full`}>
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                        {product.price}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={product.mercadoLibre}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(product.name)}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Ver en Mercado Libre
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={product.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(product.name)}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Ver en Amazon
                        <ExternalLink className="w-4 h-4" />
                      </a>
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

export default ProductsPage;
