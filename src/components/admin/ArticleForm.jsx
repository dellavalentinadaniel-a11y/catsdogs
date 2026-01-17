
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { generateSlug } from '@/lib/adminUtils';
import { useArticleValidation } from '@/lib/useArticleValidation';
import { sanitizeHtmlContent } from '@/lib/sanitizeHtmlContent';
import { cn } from '@/lib/utils';
import AdvancedArticleEditor from './AdvancedArticleEditor';
import FeaturedImageUpload from './FeaturedImageUpload';
import SEOPreview from './SEOPreview';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

const ArticleForm = ({ initialData, isEdit = false, table = 'blog_articles' }) => {
  const navigate = useNavigate();
  const { currentAdmin } = useAdminAuth();
  const { toast } = useToast();
  const { validate, errors, setErrors } = useArticleValidation();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category_id: '', // Changed to use category_id
    tags: [],
    status: 'draft',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    published: false,
    author: '',
    ...initialData
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load categories
  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from('blog_categories').select('*').order('name');
      setCategories(data || []);
    };
    fetchCats();
  }, []);

  // Sync formData if initialData changes late
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Autosave warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleChange = (field, value) => {
    setHasUnsavedChanges(true);
    setFormData(prev => {
      const updates = { [field]: value };
      if (field === 'title' && !isEdit && !prev.slug) {
        updates.slug = generateSlug(value);
      }
      // Sync published boolean with status text
      if (field === 'status') {
        updates.published = value === 'published';
      }
      return { ...prev, ...updates };
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Run validation
    const { isValid } = await validate(formData, isEdit, initialData?.slug, table);
    if (!isValid) {
      toast({ title: "Error de Validación", description: "Revisa los campos marcados.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: sanitizeHtmlContent(formData.content),
        featured_image: formData.featured_image,
        category_id: formData.category_id || null, // Ensure null if empty
        status: formData.status,
        published: formData.status === 'published',
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords,
        updated_at: new Date().toISOString()
      };

      if (!isEdit) {
        payload.created_at = new Date().toISOString();
        if (currentAdmin) payload.author = currentAdmin.email;
      }

      if (formData.status === 'published' && !initialData?.published_at) {
        payload.published_at = new Date().toISOString();
      }

      let error;
      if (isEdit) {
        const res = await supabase.from(table).update(payload).eq('id', initialData.id);
        error = res.error;
      } else {
        const res = await supabase.from(table).insert(payload);
        error = res.error;
      }

      if (error) throw error;

      toast({ title: "Éxito", description: isEdit ? "Actualizado correctamente." : "Creado correctamente." });
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      // Determine redirect path based on table
      let redirectPath = '/admin/articulos';
      if (table === 'blog_resources') redirectPath = '/admin/resources';
      if (table === 'blog_news') redirectPath = '/admin/news';
      if (table === 'blog_tools') redirectPath = '/admin/tools';

      if (!isEdit) navigate(redirectPath);

    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Fallo al guardar.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur shadow-sm p-4 rounded-b-lg border-x border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} type="button">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{isEdit ? 'Editar' : 'Crear Nuevo'}</h1>
            {hasUnsavedChanges && <span className="text-xs text-amber-600 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Cambios sin guardar</span>}
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
          {isSubmitting ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <Save className="mr-2 w-4 h-4" />} Guardar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Fields */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título <span className="text-red-500">*</span></label>
              <input
                value={formData.title} onChange={(e) => handleChange('title', e.target.value)}
                className={cn("w-full p-3 border rounded-lg text-lg", errors.title && "border-red-500")}
                placeholder="Título principal"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL) <span className="text-red-500">*</span></label>
              <div className="flex">
                <span className="bg-gray-100 p-2 border border-r-0 rounded-l-lg text-gray-500">/</span>
                <input
                  value={formData.slug} onChange={(e) => handleChange('slug', generateSlug(e.target.value))}
                  className={cn("w-full p-2 border rounded-r-lg font-mono bg-gray-50", errors.slug && "border-red-500")}
                />
              </div>
              {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-2">
            <label className="text-sm font-medium">Contenido <span className="text-red-500">*</span></label>
            <AdvancedArticleEditor value={formData.content} onChange={(val) => handleChange('content', val)} />
            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-2">
            <label className="text-sm font-medium">Extracto</label>
            <textarea
              value={formData.excerpt || ''} onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={3} className="w-full p-3 border rounded-lg" placeholder="Breve descripción..."
            />
            <p className="text-xs text-right text-gray-400">{(formData.excerpt || '').length}/500</p>
          </div>

          {/* SEO */}
          <Accordion type="single" collapsible className="bg-white rounded-lg border shadow-sm">
            <AccordionItem value="seo" className="border-0">
              <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50 rounded-t-lg">
                <span className="font-semibold text-gray-900">SEO (Meta Datos)</span>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-2 space-y-4">
                <SEOPreview title={formData.title} slug={formData.slug} metaDescription={formData.meta_description} />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Descripción</label>
                  <textarea value={formData.meta_description || ''} onChange={(e) => handleChange('meta_description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Palabras Clave (Meta Keywords)</label>
                  <input value={formData.meta_keywords || ''} onChange={(e) => handleChange('meta_keywords', e.target.value)} className="w-full p-2 border rounded-lg" placeholder="perros, gatos, cuidados" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
            <h3 className="font-semibold">Estado y Publicación</h3>
            <div className="flex items-center justify-between p-3 border rounded bg-gray-50">
              <span className="text-sm font-medium">Estado:</span>
              <span className={cn("text-xs px-2 py-1 rounded-full uppercase font-bold", formData.status === 'published' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800")}>
                {formData.status === 'published' ? 'Publicado' : 'Borrador'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={formData.status === 'published'} onCheckedChange={(c) => handleChange('status', c ? 'published' : 'draft')} />
              <label className="text-sm">Publicar inmediatamente</label>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <FeaturedImageUpload value={formData.featured_image} onChange={(url) => handleChange('featured_image', url)} />
            {errors.featured_image && <p className="text-xs text-red-500 mt-2">{errors.featured_image}</p>}
          </div>

          {(table === 'blog_articles' || table === 'blog_resources') && (
            <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
              {/* Categoría */}
              <div className="space-y-2">
                <label className="font-medium text-sm">Categoría <span className="text-red-500">*</span></label>
                <select
                  value={formData.category_id || ''}
                  onChange={(e) => handleChange('category_id', e.target.value)}
                  className={cn("w-full p-2 border rounded-lg bg-white", errors.category_id && "border-red-500")}
                >
                  <option value="">Seleccionar Categoría...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.category_id && <p className="text-xs text-red-500">{errors.category_id}</p>}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="font-medium text-sm">Etiquetas (Tags)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.tags || []).map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          handleChange('tags', newTags);
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Escribe y presiona Enter..."
                  className="w-full p-2 border rounded-lg text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.target.value.trim();
                      if (val && !formData.tags?.includes(val)) {
                        handleChange('tags', [...(formData.tags || []), val]);
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-400">Presiona Enter para añadir una etiqueta.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
