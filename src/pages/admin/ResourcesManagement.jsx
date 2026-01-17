
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Trash2, Edit2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_resources')
        .select(`
          *,
          blog_categories ( name )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudieron cargar los recursos.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const isPublished = newStatus === 'published';
    
    try {
      const { error } = await supabase
        .from('blog_resources')
        .update({ 
          status: newStatus, 
          published: isPublished,
          published_at: isPublished ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      setResources(resources.map(res => 
        res.id === id ? { ...res, status: newStatus, published: isPublished } : res
      ));

      toast({
        title: 'Estado actualizado',
        description: `Recurso ${isPublished ? 'publicado' : 'retirado'} correctamente.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase.from('blog_resources').delete().eq('id', deleteConfirm);
      if (error) throw error;
      setResources(prev => prev.filter(r => r.id !== deleteConfirm));
      toast({ title: 'Éxito', description: 'Recurso eliminado.' });
      setDeleteConfirm(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Fallo al eliminar.', variant: 'destructive' });
    }
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Gestión de Recursos - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recursos y Guías</h1>
            <p className="text-gray-500 mt-1">Gestiona guías descargables y materiales</p>
          </div>
          <Link to="/admin/resources/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" /> Nuevo Recurso
            </Button>
          </Link>
        </div>

        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar por título..." />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Cargando...
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">No hay recursos encontrados.</div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Título</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Categoría</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Estado</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Publicar</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredResources.map(res => (
                  <tr key={res.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{res.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{res.blog_categories?.name || 'General'}</td>
                    <td className="px-6 py-4">
                      {res.status === 'published' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" /> Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <XCircle className="w-3 h-3 mr-1" /> Borrador
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Switch 
                        checked={res.status === 'published'} 
                        onCheckedChange={() => handleToggleStatus(res.id, res.status)} 
                      />
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                       <Link to={`/admin/resources/${res.id}/edit`}>
                         <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4 text-blue-600" /></Button>
                       </Link>
                       <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(res.id)}>
                         <Trash2 className="w-4 h-4 text-red-600" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <ConfirmDeleteModal 
           isOpen={!!deleteConfirm} 
           onClose={() => setDeleteConfirm(null)} 
           onConfirm={handleDelete} 
           itemName="este recurso"
        />
      </div>
    </>
  );
}
