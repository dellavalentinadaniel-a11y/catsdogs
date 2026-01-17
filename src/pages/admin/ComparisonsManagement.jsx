
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function ComparisonsManagement() {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      setLoading(true);
      // Placeholder for comparisons data
      setComparisons([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load comparisons',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Placeholder for delete logic
      setComparisons(comparisons.filter(comparison => comparison.id !== id));
      toast({
        title: 'Success',
        description: 'Comparison deleted successfully',
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete comparison',
        variant: 'destructive',
      });
    }
  };

  const filteredComparisons = comparisons.filter(comparison =>
    comparison.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Comparisons Management - Admin</title>
        <meta name="description" content="Manage comparisons" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Comparisons Management</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Comparison
          </Button>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search comparisons by title..."
        />

        {loading ? (
          <div className="text-center py-8">Loading comparisons...</div>
        ) : filteredComparisons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No comparisons found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Items Compared</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComparisons.map(comparison => (
                  <tr key={comparison.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{comparison.title}</td>
                    <td className="px-4 py-2 text-sm">{comparison.type}</td>
                    <td className="px-4 py-2 text-sm">{comparison.items_count || 0}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(comparison.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(comparison.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteConfirm && (
          <ConfirmDeleteModal
            title="Delete Comparison"
            message="Are you sure you want to delete this comparison? This action cannot be undone."
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </>
  );
}
