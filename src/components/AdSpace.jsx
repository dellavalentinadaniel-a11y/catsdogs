
import React from 'react';

const AdSpace = ({ size = 'medium', className = '' }) => {
  // Sizes: 
  // banner: 728x90
  // large-banner: 970x90
  // medium: 300x250
  
  const dimensions = {
    'banner': { width: 'w-[728px]', height: 'h-[90px]' },
    'large-banner': { width: 'w-[970px]', height: 'h-[90px]' },
    'medium': { width: 'w-[300px]', height: 'h-[250px]' },
    'responsive': { width: 'w-full', height: 'h-auto min-h-[100px]' }
  };
  
  const dim = dimensions[size] || dimensions['responsive'];

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Publicidad</span>
      <div 
        className={`${dim.width} ${dim.height} bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-gray-200/50 flex flex-col items-center justify-center text-gray-400">
          <span className="text-sm font-semibold">Espacio Publicitario</span>
          <span className="text-xs">{size}</span>
        </div>
        {/* Actual ad script would be injected here */}
      </div>
    </div>
  );
};

export default AdSpace;
