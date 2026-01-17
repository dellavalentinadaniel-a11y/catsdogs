
import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const FeaturedImageUpload = ({ value, onChange, className }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "El tamaño de la imagen debe ser menor a 5MB",
        variant: "destructive"
      });
      return;
    }

    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: "Error",
        description: "Solo se permiten formatos JPG, PNG y WebP",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onChange(publicUrl);
      
      toast({
        title: "Éxito",
        description: "Imagen subida correctamente"
      });

    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Error al subir la imagen",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label className="block text-sm font-medium text-gray-700">
        Imagen Destacada <span className="text-red-500">*</span>
      </label>
      
      <div className="relative group">
        {preview ? (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img 
              src={preview} 
              alt="Featured" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {isUploading ? (
              <div className="flex flex-col items-center text-blue-600">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <span className="text-sm">Subiendo...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImageIcon className="w-10 h-10 mb-2" />
                <span className="text-sm font-medium">Haz clic para subir imagen</span>
                <span className="text-xs mt-1">JPG, PNG, WebP (Max 5MB)</span>
              </div>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FeaturedImageUpload;
