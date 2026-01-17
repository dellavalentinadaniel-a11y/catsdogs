
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit2, Megaphone, Code, Monitor } from 'lucide-react';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';

export default function AdBlocksManagement() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null); // For edit
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    position: 'middle',
    ad_code: '',
    enabled: true
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ad_blocks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudieron cargar los anuncios.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (ad = null) => {
    if (ad) {
      setCurrentAd(ad);
      setFormData({
        name: ad.name,
        position: ad.position,
        ad_code: ad.ad_code,
        enabled: ad.enabled
      });
    } else {
      setCurrentAd(null);
      setFormData({ name: '', position: 'middle', ad_code: '', enabled: true });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.ad_code) {
      toast({ title: 'Error', description: 'Nombre y código son requeridos.', variant: 'destructive' });
      return;
    }

    try {
      if (currentAd) {
        // Update
        const { error } = await supabase
          .from('ad_blocks')
          .update(formData)
          .eq('id', currentAd.id);
        if (error) throw error;
        toast({ title: 'Éxito', description: 'Bloque de anuncio actualizado.' });
      } else {
        // Create
        const { error } = await supabase
          .from('ad_blocks')
          .insert(formData);
        if (error) throw error;
        toast({ title: 'Éxito', description: 'Bloque de anuncio creado.' });
      }
      setIsModalOpen(false);
      fetchAds();
    } catch (error) {
      toast({ title: 'Error', description: 'Fallo al guardar.', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase.from('ad_blocks').delete().eq('id', deleteConfirm);
      if (error) throw error;
      setAds(ads.filter(a => a.id !== deleteConfirm));
      toast({ title: 'Éxito', description: 'Anuncio eliminado.' });
      setDeleteConfirm(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Fallo al eliminar.', variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestión de Anuncios - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bloques de Anuncios</h1>
            <p className="text-gray-500 mt-1">Gestiona scripts y banners publicitarios</p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Anuncio
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg border shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{ad.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{ad.position}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={ad.enabled}
                    onCheckedChange={async (checked) => {
                       // Optimistic update
                       setAds(ads.map(a => a.id === ad.id ? { ...a, enabled: checked } : a));
                       await supabase.from('ad_blocks').update({ enabled: checked }).eq('id', ad.id);
                    }}
                  />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4 border font-mono text-xs text-gray-600 overflow-hidden h-24 relative">
                  {ad.ad_code}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="ghost" size="sm" onClick={() => handleOpenModal(ad)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setDeleteConfirm(ad.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {ads.length === 0 && !loading && (
             <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
               <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500">No hay bloques de anuncios creados.</p>
             </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentAd ? 'Editar Anuncio' : 'Nuevo Bloque de Anuncio'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre Identificativo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Banner Home Top"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Posición</Label>
                <select
                  id="position"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="top">Arriba (Antes del contenido)</option>
                  <option value="middle">Medio (Después del primer párrafo)</option>
                  <option value="bottom">Abajo (Final del contenido)</option>
                  <option value="sidebar">Barra Lateral</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code" className="flex items-center gap-2">
                  <Code className="w-4 h-4" /> Código del Anuncio (HTML/JS)
                </Label>
                <Textarea
                  id="code"
                  value={formData.ad_code}
                  onChange={(e) => setFormData({ ...formData, ad_code: e.target.value })}
                  placeholder="<script>...</script> o <img src='...' />"
                  className="font-mono text-xs h-32"
                />
                <p className="text-xs text-yellow-600">
                  ⚠️ Ten cuidado al pegar scripts de terceros. Asegúrate de que provienen de fuentes confiables.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Switch 
                  id="modal-enabled"
                  checked={formData.enabled}
                  onCheckedChange={(c) => setFormData({ ...formData, enabled: c })}
                />
                <Label htmlFor="modal-enabled">Habilitar inmediatamente</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar Anuncio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmDeleteModal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={handleDelete}
          itemName="este bloque de anuncio"
          isLoading={false}
        />
      </div>
    </>
  );
}
