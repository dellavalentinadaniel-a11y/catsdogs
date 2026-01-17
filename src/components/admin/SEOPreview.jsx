
import React from 'react';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

const SEOPreview = ({ title, slug, metaDescription, className }) => {
  const displayTitle = title || "Título del Artículo";
  const displaySlug = slug || "slug-del-articulo";
  const displayDesc = metaDescription || "La descripción meta aparecerá aquí. Esto es lo que los usuarios verán en los resultados de búsqueda de Google debajo del título.";
  const baseUrl = "https://tudominio.com/blog/";

  const titleLength = displayTitle.length;
  const descLength = displayDesc.length;

  return (
    <div className={cn("bg-white p-4 rounded-lg border shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
        <Eye className="w-4 h-4" />
        Vista Previa en Google
      </div>
      
      <div className="font-sans max-w-[600px]">
        {/* URL Part */}
        <div className="flex items-center text-sm text-[#202124] mb-1">
          <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center mr-2 text-xs text-gray-500 overflow-hidden">
             <img src="/favicon.ico" alt="" className="w-4 h-4 opacity-50" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#202124]">tudominio.com</span>
            <span className="text-xs text-[#5f6368]">{baseUrl}{displaySlug}</span>
          </div>
        </div>

        {/* Title Part */}
        <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate font-medium mb-1">
          {displayTitle}
        </h3>

        {/* Description Part */}
        <p className="text-sm text-[#4d5156] leading-6 line-clamp-2">
          <span className="text-gray-400 text-xs mr-1">{new Date().toLocaleDateString()} — </span>
          {displayDesc}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500 border-t pt-2">
        <div>
          <span className={cn("font-medium", titleLength > 60 ? "text-red-500" : "text-green-600")}>
            Título: {titleLength}/60
          </span>
        </div>
        <div>
          <span className={cn("font-medium", descLength > 160 ? "text-red-500" : "text-green-600")}>
            Descripción: {descLength}/160
          </span>
        </div>
      </div>
    </div>
  );
};

export default SEOPreview;
