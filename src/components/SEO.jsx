
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website', 
  article, 
  product, 
  breadcrumbs, 
  faq,
  organization,
  localBusiness
}) => {
  const location = useLocation();
  const siteUrl = 'https://petcare-demo.com'; // Replace with actual domain
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = `${siteUrl}/og-image.jpg`;

  const metaTitle = title ? `${title} | PetCare` : 'PetCare - Guía Completa de Cuidado de Mascotas';
  const metaDescription = description || 'Guía experta sobre el cuidado, alimentación y bienestar de perros, gatos, peces y reptiles. Consejos veterinarios y guías prácticas.';
  const metaImage = image || defaultImage;

  // Schema.org JSON-LD construction
  const schemas = [];

  // Organization Schema (Global)
  if (organization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PetCare",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "sameAs": [
        "https://facebook.com/petcare",
        "https://instagram.com/petcare",
        "https://twitter.com/petcare"
      ]
    });
  }

  // Breadcrumb Schema
  if (breadcrumbs) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${siteUrl}${crumb.path}`
      }))
    });
  }

  // Article Schema
  if (type === 'article' && article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "image": metaImage,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "PetCare",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`
        }
      },
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "description": metaDescription,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      }
    });
  }

  // FAQ Schema
  if (faq) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  // Product Schema
  if (product) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand || "PetCare Select"
      },
      "offers": {
        "@type": "Offer",
        "url": currentUrl,
        "priceCurrency": "CLP",
        "price": product.price,
        "availability": "https://schema.org/InStock"
      }
    });
  }

  // Local Business Schema
  if (localBusiness) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "PetCare Santiago",
      "image": metaImage,
      "telephone": "+56912345678",
      "email": "info@petcare.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "CL"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ]
    });
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="PetCare" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Schema.org JSON-LD */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Google Analytics Placeholder */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </script> */}
    </Helmet>
  );
};

export default SEO;
