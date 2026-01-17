
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

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('blog_news').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Error al cargar noticias.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const isPublished = newStatus === 'published';
    try {
      const { error } = await supabase
        .from('blog_news')
        .update({ 
          status: newStatus,
          published: isPublished,
          published_at: isPublished ? new Date().toISOString() : null 
        })
        .eq('id', id);

      if (error) throw error;
      setNews(news.map(n => n.id === id ? { ...n, status: newStatus, published: isPublished } : n));
      toast({ title: 'Éxito', description: 'Estado actualizado correctamente.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Error al actualizar estado.', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase.from('blog_news').delete().eq('id', deleteConfirm);
      if (error) throw error;
      setNews(prev => prev.filter(n => n.id !== deleteConfirm));
      toast({ title: 'Éxito', description: 'Noticia eliminada.' });
      setDeleteConfirm(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Fallo al eliminar.', variant: 'destructive' });
    }
  };

  const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Helmet><title>Gestión de Noticias - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Noticias</h1>
          <Link to="/admin/news/create">
            <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> Nueva Noticia</Button>
          </Link>
        </div>
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar noticias..." />
        
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
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold">Fecha</th>
                  <th className="px-6 py-3 text-xs uppercase text-gray-500 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNews.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4">
                      {item.status === 'published' ? (
                        <span className="text-green-600 flex items-center text-xs font-bold uppercase"><CheckCircle className="w-3 h-3 mr-1"/> Publicado</span>
                      ) : (
                        <span className="text-amber-600 flex items-center text-xs font-bold uppercase"><XCircle className="w-3 h-3 mr-1"/> Borrador</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Switch 
                        checked={item.status === 'published'} 
                        onCheckedChange={() => handleToggleStatus(item.id, item.status)} 
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                       <Link to={`/admin/news/${item.id}/edit`}><Button variant="ghost" size="sm"><Edit2 className="w-4 h-4 text-blue-600" /></Button></Link>
                       <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(item.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ConfirmDeleteModal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={handleDelete} itemName="esta noticia" />
      </div>
    </>
  );
}
