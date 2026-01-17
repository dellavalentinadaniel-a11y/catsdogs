
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function CategoriesTagsManagement() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('categories');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Placeholder for categories and tags data
      setCategories([]);
      setTags([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      // Placeholder for delete logic
      if (type === 'category') {
        setCategories(categories.filter(cat => cat.id !== id));
      } else {
        setTags(tags.filter(tag => tag.id !== id));
      }
      toast({
        title: 'Success',
        description: `${type === 'category' ? 'Category' : 'Tag'} deleted successfully`,
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to delete ${type}`,
        variant: 'destructive',
      });
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Categories & Tags Management - Admin</title>
        <meta name="description" content="Manage categories and tags" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Categories & Tags Management</h1>

        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'categories'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'tags'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Tags
          </button>
        </div>

        {activeTab === 'categories' && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Category
              </Button>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search categories..."
            />

            {loading ? (
              <div className="text-center py-8">Loading categories...</div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No categories found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Slug</th>
                      <th className="px-4 py-2 text-left">Articles Count</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map(category => (
                      <tr key={category.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{category.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{category.slug}</td>
                        <td className="px-4 py-2 text-sm">{category.articles_count || 0}</td>
                        <td className="px-4 py-2 text-center">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(category.id)}
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
          </>
        )}

        {activeTab === 'tags' && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Tags</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Tag
              </Button>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search tags..."
            />

            {loading ? (
              <div className="text-center py-8">Loading tags...</div>
            ) : filteredTags.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No tags found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Slug</th>
                      <th className="px-4 py-2 text-left">Articles Count</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTags.map(tag => (
                      <tr key={tag.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{tag.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{tag.slug}</td>
                        <td className="px-4 py-2 text-sm">{tag.articles_count || 0}</td>
                        <td className="px-4 py-2 text-center">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(tag.id)}
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
          </>
        )}

        {deleteConfirm && (
          <ConfirmDeleteModal
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone."
            onConfirm={() => handleDelete(deleteConfirm, activeTab === 'categories' ? 'category' : 'tag')}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </>
  );
}
