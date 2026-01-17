
import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { trackAffiliateClick } from '@/lib/analytics';

const ComparisonTable = ({ products }) => {
  return (
    <div className="overflow-x-auto pb-4">
      <table className="w-full min-w-[800px] border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 text-left font-bold text-gray-600 w-1/4">Producto</th>
            <th className="p-4 text-left font-bold text-gray-600 w-1/5">Características</th>
            <th className="p-4 text-center font-bold text-gray-600 w-1/6">Calificación</th>
            <th className="p-4 text-left font-bold text-gray-600 w-1/5">Pros/Contras</th>
            <th className="p-4 text-center font-bold text-gray-600 w-1/6">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
              <td className="p-4 align-top">
                <div className="font-bold text-gray-900 mb-2">{product.name}</div>
                <img src={product.image} alt={product.name} className="w-24 h-24 object-contain rounded-lg border border-gray-100 bg-white" loading="lazy" />
              </td>
              <td className="p-4 align-top text-sm text-gray-600">
                <ul className="space-y-1">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-4 align-top text-center">
                <div className="flex justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.rating}/5</span>
              </td>
              <td className="p-4 align-top text-sm">
                <div className="mb-2">
                  <span className="font-semibold text-green-600 block mb-1">Pros:</span>
                  {product.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-600"><Check className="w-3 h-3 text-green-500" /> {pro}</div>
                  ))}
                </div>
                <div>
                  <span className="font-semibold text-red-500 block mb-1">Contras:</span>
                  {product.cons.slice(0, 1).map((con, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-600"><X className="w-3 h-3 text-red-400" /> {con}</div>
                  ))}
                </div>
              </td>
              <td className="p-4 align-top text-center">
                <div className="font-bold text-xl text-gray-900 mb-2">{product.price}</div>
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(product.name)}
                  className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-sm text-sm"
                >
                  Ver Oferta
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
