
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import DogsPage from '@/pages/DogsPage';
import CatsPage from '@/pages/CatsPage';
import AquariumsPage from '@/pages/AquariumsPage';
import ReptilesPage from '@/pages/ReptilesPage';
import BlogPage from '@/pages/BlogPage';
import BlogArticle from '@/pages/BlogArticle';
import ProductsPage from '@/pages/ProductsPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiesPolicyPage from '@/pages/CookiesPolicyPage';
import CookieBanner from '@/components/CookieBanner';
import CalorieCalculatorPage from '@/pages/tools/CalorieCalculatorPage';
import BreedCompatibilityPage from '@/pages/tools/BreedCompatibilityPage';
import DownloadableGuidesPage from '@/pages/resources/DownloadableGuidesPage';
import ResourcesPage from '@/pages/resources/ResourcesPage';
import ComparisonsPage from '@/pages/comparisons/ComparisonsPage';
import { trackPageView } from '@/lib/analytics';

// Admin Imports
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminSetupPage from '@/pages/admin/AdminSetupPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Admin Management Pages
import ArticlesManagement from '@/pages/admin/ArticlesManagement';
import CreateArticlePage from '@/pages/admin/CreateArticlePage';
import EditArticlePage from '@/pages/admin/EditArticlePage';
import CategoriesManagement from '@/pages/admin/CategoriesManagement';
import ResourcesManagement from '@/pages/admin/ResourcesManagement';
import NewsManagement from '@/pages/admin/NewsManagement';
import ToolsManagement from '@/pages/admin/ToolsManagement';
import AdBlocksManagement from '@/pages/admin/AdBlocksManagement';
import NewsletterManagement from '@/pages/admin/NewsletterManagement';

// Reusable Create/Edit wrappers could be created, or explicit pages
// For brevity, I'll assume CreateArticlePage can handle generic "item" creation if modified, 
// OR I will link specific create/edit routes to specialized components if they diverge too much.
// Based on Task 6/13, reusing ArticleForm is key. I'll map routes accordingly.

import ArticleForm from '@/components/admin/ArticleForm'; // Direct usage for create/edit routes

// Helper Wrapper for Create/Edit using ArticleForm
const CreateItemWrapper = ({ table }) => <ArticleForm isEdit={false} table={table} />;
const EditItemWrapper = ({ table }) => {
    const { id } = React.useParams(); // Need to extract ID inside component, but useParams hook works inside route element? No.
    // React Router element prop accepts a component. We need a wrapper component to extract params.
    return <EditItemLoader table={table} />;
};
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const EditItemLoader = ({ table }) => {
    const { id } = useParams();
    const [data, setData] = React.useState(null);
    useEffect(() => {
        supabase.from(table).select('*').eq('id', id).single().then(({data}) => setData(data));
    }, [id, table]);
    
    if (!data) return <div className="p-8 text-center">Cargando...</div>;
    return <ArticleForm initialData={data} isEdit={true} table={table} />;
};


const PageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
};

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-grow">{children}</main>
    <Footer />
    <CookieBanner />
  </div>
);

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <PageTracker />
        <Helmet>
          <title>Cuidado de Mascotas - Perros, Gatos, Peces y Reptiles</title>
          <meta name="description" content="Guía completa sobre cuidado, alimentación y bienestar para mascotas." />
        </Helmet>
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/setup" element={<AdminSetupPage />} />
          
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              
              {/* Articles */}
              <Route path="articulos" element={<ArticlesManagement />} />
              <Route path="articulos/create" element={<CreateItemWrapper table="blog_articles" />} />
              <Route path="articulos/:id/edit" element={<EditItemLoader table="blog_articles" />} />

              {/* Categories */}
              <Route path="categories" element={<CategoriesManagement />} />

              {/* Resources */}
              <Route path="resources" element={<ResourcesManagement />} />
              <Route path="resources/create" element={<CreateItemWrapper table="blog_resources" />} />
              <Route path="resources/:id/edit" element={<EditItemLoader table="blog_resources" />} />

              {/* News */}
              <Route path="news" element={<NewsManagement />} />
              <Route path="news/create" element={<CreateItemWrapper table="blog_news" />} />
              <Route path="news/:id/edit" element={<EditItemLoader table="blog_news" />} />

              {/* Tools */}
              <Route path="tools" element={<ToolsManagement />} />
              <Route path="tools/create" element={<CreateItemWrapper table="blog_tools" />} />
              <Route path="tools/:id/edit" element={<EditItemLoader table="blog_tools" />} />

              <Route path="anuncios" element={<AdBlocksManagement />} />
              <Route path="newsletter" element={<NewsletterManagement />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="*" element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/perros/*" element={<DogsPage />} />
                <Route path="/gatos/*" element={<CatsPage />} />
                <Route path="/acuarios/*" element={<AquariumsPage />} />
                <Route path="/reptiles/*" element={<ReptilesPage />} />
                
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/privacidad" element={<PrivacyPage />} />
                <Route path="/politicas-cookies" element={<CookiesPolicyPage />} />
                
                <Route path="/herramientas/calculadora-calorias" element={<CalorieCalculatorPage />} />
                <Route path="/herramientas/test-compatibilidad-razas" element={<BreedCompatibilityPage />} />
                
                <Route path="/recursos" element={<ResourcesPage />} />
                <Route path="/recursos/guias-descargables" element={<DownloadableGuidesPage />} />
                <Route path="/comparativas" element={<ComparisonsPage />} />
              </Routes>
            </PublicLayout>
          } />
        </Routes>
        
        <Toaster />
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
