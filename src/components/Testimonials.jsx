
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = ({ items, category = "General" }) => {
  // Schema markup helper
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `PetCare - Sección ${category}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": items.length.toString()
    },
    "review": items.map(item => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": item.author },
      "reviewRating": { "@type": "Rating", "ratingValue": item.rating.toString() },
      "reviewBody": item.text
    }))
  };

  return (
    <section className="py-16 bg-white">
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Lo que dicen nuestros lectores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.author}</h4>
                  <p className="text-xs text-gray-500">{item.petType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
