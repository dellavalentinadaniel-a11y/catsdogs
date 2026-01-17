
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { sanitizeHtmlContent } from './sanitizeContent';

export const useArticleOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const checkSlugUnique = async (slug, excludeId = null) => {
    let query = supabase.from('blog_articles').select('id').eq('slug', slug);
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data.length === 0;
  };

  const getArticle = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      toast({ title: 'Error', description: 'No se pudo cargar el artículo', variant: 'destructive' });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getArticleBySlug = useCallback(async (slug) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createArticle = async (formData) => {
    setLoading(true);
    try {
      // Validate Slug
      const isUnique = await checkSlugUnique(formData.slug);
      if (!isUnique) throw new Error('El slug ya existe. Por favor elige otro.');

      const sanitizedContent = sanitizeHtmlContent(formData.content);

      const { data, error } = await supabase
        .from('blog_articles')
        .insert([{
          ...formData,
          content: sanitizedContent,
          created_at: new Date(),
          updated_at: new Date()
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({ title: 'Éxito', description: 'Artículo creado correctamente' });
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id, formData) => {
    setLoading(true);
    try {
       // Validate Slug uniqueness if changed
      const isUnique = await checkSlugUnique(formData.slug, id);
      if (!isUnique) throw new Error('El slug ya existe en otro artículo.');

      const sanitizedContent = sanitizeHtmlContent(formData.content);

      const { data, error } = await supabase
        .from('blog_articles')
        .update({
          ...formData,
          content: sanitizedContent,
          updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({ title: 'Éxito', description: 'Artículo actualizado correctamente' });
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('blog_articles').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Éxito', description: 'Artículo eliminado' });
      return true;
    } catch (err) {
      setError(err.message);
      toast({ title: 'Error', description: 'No se pudo eliminar', variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (id) => {
    try {
      await supabase.rpc('increment_views', { article_id: id }); 
      // Note: Needs a Postgres function or simple update logic. 
      // Simple update logic for now to avoid custom SQL requirement if RPC not exists
      /*
      const { data } = await supabase.from('blog_articles').select('views').eq('id', id).single();
      if(data) {
         await supabase.from('blog_articles').update({ views: (data.views || 0) + 1 }).eq('id', id);
      }
      */
    } catch (err) {
      console.error('Error incrementing views', err);
    }
  };

  return {
    loading,
    error,
    getArticle,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
    incrementViews,
    checkSlugUnique
  };
};
