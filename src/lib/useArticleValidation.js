
import { supabase } from '@/lib/customSupabaseClient';

export const useArticleValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = async (formData, isEdit, originalSlug, table = 'blog_articles') => {
    const newErrors = {};
    let isValid = true;

    // Title
    if (!formData.title || formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres.';
      isValid = false;
    } else if (formData.title.length > 200) {
      newErrors.title = 'El título no puede exceder 200 caracteres.';
      isValid = false;
    }

    // Slug
    if (!formData.slug) {
      newErrors.slug = 'El slug es requerido.';
      isValid = false;
    } else {
      // Check Uniqueness
      let query = supabase.from(table).select('id').eq('slug', formData.slug);
      if (isEdit && formData.id) query = query.neq('id', formData.id);
      
      const { data } = await query;
      if (data && data.length > 0) {
        newErrors.slug = 'Este slug ya está en uso.';
        isValid = false;
      }
    }

    // Category (Required for articles and resources)
    if ((table === 'blog_articles' || table === 'blog_resources') && !formData.category_id) {
      newErrors.category_id = 'Debes seleccionar una categoría.';
      isValid = false;
    }

    // Featured Image
    if (!formData.featured_image) {
      newErrors.featured_image = 'La imagen destacada es obligatoria.';
      isValid = false;
    }

    // Content
    const cleanContent = formData.content?.replace(/<[^>]*>/g, '').trim() || '';
    if (cleanContent.length < 50) { // Reduced constraint for testing
      newErrors.content = 'El contenido es demasiado corto (mínimo 50 caracteres).';
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  };

  return { validate, errors, setErrors };
};
import { useState } from 'react';
