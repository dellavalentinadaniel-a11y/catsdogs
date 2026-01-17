
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import DOMPurify from 'dompurify';
import { Loader2, Calendar, User, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState({ top: null, middle: null, bottom: null, sidebar: null });
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Fetch article
        const { data: articleData, error } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setArticle(articleData);

        // Increment Views
        await supabase.rpc('increment_article_views', { article_id: articleData.id }).catch(() => {
            // Fallback if RPC doesn't exist
            supabase.from('blog_articles')
              .update({ views: (articleData.views || 0) + 1 })
              .eq('id', articleData.id);
        });

        // Fetch Ads for this article
        const { data: adData } = await supabase
          .from('article_ads')
          .select('ad_block_id, ad_blocks(name, position, ad_code, enabled)')
          .eq('article_id', articleData.id)
          .eq('enabled', true);

        const adsMap = { top: null, middle: null, bottom: null, sidebar: null };
        adData?.forEach(item => {
          if (item.ad_blocks && item.ad_blocks.enabled) {
             // Only take the first ad for a position if multiple
             if (!adsMap[item.ad_blocks.position]) {
                adsMap[item.ad_blocks.position] = item.ad_blocks.ad_code;
             }
          }
        });
        setAds(adsMap);

        // Fetch Related Articles
        const { data: related } = await supabase
          .from('blog_articles')
          .select('title, slug, featured_image, created_at')
          .eq('category', articleData.category)
          .eq('published', true)
          .neq('id', articleData.id)
          .limit(3);
        setRelatedArticles(related || []);

      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Inject Middle Ad
  const renderContent = () => {
    if (!article?.content) return null;
    let contentHtml = DOMPurify.sanitize(article.content, { ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"] });

    if (ads.middle) {
      // Simple injection: After first paragraph
      const closingP = '</p>';
      const index = contentHtml.indexOf(closingP);
      if (index !== -1) {
        const insertion = `${closingP}<div class="my-8 flex justify-center ad-middle">${ads.middle}</div>`;
        contentHtml = contentHtml.substring(0, index) + insertion + contentHtml.substring(index + closingP.length);
      }
    }
    return <div className="prose prose-lg max-w-none prose-blue" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Artículo no encontrado</h1>
        <Link to="/blog">
          <Button>Volver al Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Helmet>
        <title>{article.meta_title || article.title}</title>
        <meta name="description" content={article.meta_description || article.excerpt} />
        {article.meta_keywords && <meta name="keywords" content={article.meta_keywords} />}
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.featured_image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{article.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center">
                 <Calendar className="w-4 h-4 mr-1" />
                 {new Date(article.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6 mt-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author || 'Equipo PetCare'}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {article.views} Lecturas
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border">
            {article.featured_image && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                <img 
                  src={article.featured_image} 
                  alt={article.title} 
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Top Ad */}
            {ads.top && (
              <div className="mb-8 flex justify-center ad-top" dangerouslySetInnerHTML={{ __html: ads.top }} />
            )}

            {renderContent()}

            {/* Bottom Ad */}
            {ads.bottom && (
              <div className="mt-8 flex justify-center ad-bottom" dangerouslySetInnerHTML={{ __html: ads.bottom }} />
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Temas relacionados:</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sidebar Ad */}
            {ads.sidebar && (
              <div className="bg-white p-4 rounded-xl shadow-sm border flex justify-center ad-sidebar" dangerouslySetInnerHTML={{ __html: ads.sidebar }} />
            )}

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Artículos Relacionados</h3>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                   <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group flex gap-3 items-start">
                     {rel.featured_image && (
                       <img src={rel.featured_image} alt="" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                     )}
                     <div>
                       <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                         {rel.title}
                       </h4>
                       <span className="text-xs text-gray-500 mt-1 block">
                         {new Date(rel.created_at).toLocaleDateString()}
                       </span>
                     </div>
                   </Link>
                ))}
                {relatedArticles.length === 0 && (
                  <p className="text-sm text-gray-500">No hay artículos relacionados por el momento.</p>
                )}
              </div>
            </div>

            {/* Newsletter Promo (Hardcoded for now as placeholder for real widget) */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-2">¡Únete a nuestra comunidad!</h3>
              <p className="text-blue-100 text-sm mb-4">Recibe los mejores consejos para tu mascota cada semana.</p>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full px-3 py-2 rounded-md text-gray-900 text-sm mb-2 focus:outline-none"
              />
              <Button variant="secondary" className="w-full text-blue-900 font-bold">Suscribirse</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
