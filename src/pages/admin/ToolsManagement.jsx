
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Trash2, Edit2, Plus, Wrench } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ToolsManagement() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  useEffect(() => { fetchTools(); }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('blog_tools').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Error al cargar herramientas.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const isPublished = newStatus === 'published';
    try {
      const { error } = await supabase
        .from('blog_tools')
        .update({ 
          status: newStatus,
          published: isPublished,
          published_at: isPublished ? new Date().toISOString() : null 
        })
        .eq('id', id);

      if (error) throw error;
      setTools(tools.map(t => t.id === id ? { ...t, status: newStatus, published: isPublished } : t));
      toast({ title: 'Éxito', description: 'Estado actualizado correctamente.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Error al actualizar estado.', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase.from('blog_tools').delete().eq('id', deleteConfirm);
      if (error) throw error;
      setTools(prev => prev.filter(t => t.id !== deleteConfirm));
      toast({ title: 'Éxito', description: 'Herramienta eliminada.' });
      setDeleteConfirm(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Fallo al eliminar.', variant: 'destructive' });
    }
  };

  const filteredTools = tools.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Helmet><title>Gestión de Herramientas - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Herramientas</h1>
          <Link to="/admin/tools/create">
            <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> Nueva Herramienta</Button>
          </Link>
        </div>
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar herramientas..." />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Cargando...
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Título</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Estado</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Publicar</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTools.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                       <Wrench className="w-4 h-4 text-gray-400"/> {item.title}
                    </td>
                    <td className="px-6 py-4 uppercase text-xs font-bold text-gray-600">{item.status}</td>
                    <td className="px-6 py-4">
                      <Switch 
                        checked={item.status === 'published'} 
                        onCheckedChange={() => handleToggleStatus(item.id, item.status)} 
                      />
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                       <Link to={`/admin/tools/${item.id}/edit`}><Button variant="ghost" size="sm"><Edit2 className="w-4 h-4 text-blue-600" /></Button></Link>
                       <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(item.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ConfirmDeleteModal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={handleDelete} itemName="esta herramienta" />
      </div>
    </>
  );
}
