
import { supabase } from '@/lib/customSupabaseClient';

export const validateImageFile = (file, maxSizeMB = 5) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no válido. Se permiten JPG, PNG, WebP y GIF.');
  }
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`El archivo excede el tamaño máximo de ${maxSizeMB}MB.`);
  }
  
  return true;
};

export const compressImage = async (file, maxWidth = 1200, quality = 0.8) => {
  if (file.type === 'image/gif') return file; // Skip GIF compression to preserve animation

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Error al comprimir la imagen'));
          return;
        }
        const newFile = new File([blob], file.name, {
          type: 'image/jpeg', // Convert to JPEG for better compression
          lastModified: Date.now(),
        });
        resolve(newFile);
      }, 'image/jpeg', quality);
    };
    img.onerror = (error) => reject(error);
  });
};

export const uploadToSupabase = async (file, bucket = 'article-images') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
};
