
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-gray-500">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Inicio</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-800" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
