
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import SearchFilter from '@/components/admin/SearchFilter';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Trash2, Edit2, Plus, Send } from 'lucide-react';

export default function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('campaigns');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Placeholder for newsletter data
      setNewsletters([]);
      setSubscribers([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load newsletter data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Placeholder for delete logic
      setNewsletters(newsletters.filter(newsletter => newsletter.id !== id));
      toast({
        title: 'Success',
        description: 'Newsletter deleted successfully',
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete newsletter',
        variant: 'destructive',
      });
    }
  };

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Newsletter Management - Admin</title>
        <meta name="description" content="Manage newsletter campaigns and subscribers" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Newsletter Management</h1>

        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'campaigns'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'subscribers'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            Subscribers
          </button>
        </div>

        {activeTab === 'campaigns' && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Campaigns</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search campaigns by subject..."
            />

            {loading ? (
              <div className="text-center py-8">Loading campaigns...</div>
            ) : filteredNewsletters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No campaigns found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Recipients</th>
                      <th className="px-4 py-2 text-left">Sent Date</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNewsletters.map(newsletter => (
                      <tr key={newsletter.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{newsletter.subject}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            newsletter.status === 'sent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {newsletter.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm">{newsletter.recipients || 0}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {newsletter.sent_date ? new Date(newsletter.sent_date).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(newsletter.id)}
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

        {activeTab === 'subscribers' && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Subscribers ({subscribers.length})</h2>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search subscribers by email..."
            />

            {loading ? (
              <div className="text-center py-8">Loading subscribers...</div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No subscribers found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Subscribed Date</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map(subscriber => (
                      <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{subscriber.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            subscriber.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {new Date(subscriber.subscribed_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => setDeleteConfirm(subscriber.id)}
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
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </>
  );
}
