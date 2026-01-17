
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, Loader2 } from 'lucide-react';
import { generateSlug } from '@/lib/adminUtils';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las categorías.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({ 
        name: category.name, 
        slug: category.slug, 
        description: category.description || '' 
      });
    } else {
      setCurrentCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: !currentCategory ? generateSlug(name) : prev.slug // Auto-generate slug only for new items or if desired
    }));
    if (formErrors.name) setFormErrors(prev => ({ ...prev, name: null }));
  };

  const validateForm = async () => {
    const errors = {};
    if (!formData.name || formData.name.length < 3) errors.name = "El nombre debe tener al menos 3 caracteres.";
    if (!formData.slug) errors.slug = "El slug es obligatorio.";

    // Check slug uniqueness
    if (!errors.slug) {
      let query = supabase.from('blog_categories').select('id').eq('slug', formData.slug);
      if (currentCategory) query = query.neq('id', currentCategory.id);
      
      const { data } = await query;
      if (data && data.length > 0) errors.slug = "Este slug ya está en uso.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    if (!(await validateForm())) {
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        updated_at: new Date().toISOString()
      };

      if (currentCategory) {
        const { error } = await supabase
          .from('blog_categories')
          .update(payload)
          .eq('id', currentCategory.id);
        if (error) throw error;
        toast({ title: 'Éxito', description: 'Categoría actualizada correctamente.' });
      } else {
        const { error } = await supabase
          .from('blog_categories')
          .insert({ ...payload, created_at: new Date().toISOString() });
        if (error) throw error;
        toast({ title: 'Éxito', description: 'Categoría creada correctamente.' });
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({ title: 'Error', description: 'Fallo al guardar la categoría.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', deleteConfirm);

      if (error) throw error;
      
      setCategories(prev => prev.filter(c => c.id !== deleteConfirm));
      toast({ title: 'Éxito', description: 'Categoría eliminada.' });
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({ title: 'Error', description: 'No se pudo eliminar la categoría.', variant: 'destructive' });
    }
  };

  // Filter and Pagination
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <title>Gestión de Categorías - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
            <p className="text-gray-500 mt-1">Organiza el contenido de tu blog</p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Button>
        </div>

        <SearchFilter 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Buscar categorías..." 
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredCategories.length === 0 ? (
           <div className="text-center py-12 border rounded-lg bg-white">
             <p className="text-gray-500">No se encontraron categorías.</p>
           </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCategories.map(cat => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{cat.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{cat.description || '-'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenModal(cat)}>
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(cat.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
                <Button 
                  variant="outline" size="sm" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-gray-500">Página {currentPage} de {totalPages}</span>
                <Button 
                  variant="outline" size="sm" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={handleNameChange}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                <Input 
                  id="slug" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className={formErrors.slug ? "border-red-500 bg-gray-50 font-mono" : "bg-gray-50 font-mono"}
                />
                {formErrors.slug && <p className="text-xs text-red-500">{formErrors.slug}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Descripción</Label>
                <Textarea 
                  id="desc" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmDeleteModal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={handleDelete}
          itemName="esta categoría"
          isLoading={false}
        />
      </div>
    </>
  );
}
