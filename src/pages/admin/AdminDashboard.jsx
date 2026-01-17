
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, Users, BookOpen, GitCompare, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">+2.5% vs mes ant.</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    guides: 0,
    comparisons: 0,
    subscribers: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: articlesCount },
          { count: guidesCount },
          { count: comparisonsCount },
          { count: subscribersCount }
        ] = await Promise.all([
          supabase.from('blog_articles').select('*', { count: 'exact', head: true }),
          supabase.from('downloadable_guides').select('*', { count: 'exact', head: true }),
          supabase.from('comparisons').select('*', { count: 'exact', head: true }),
          supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          articles: articlesCount || 0,
          guides: guidesCount || 0,
          comparisons: comparisonsCount || 0,
          subscribers: subscribersCount || 0
        });

        // Fetch recent articles as activity log
        const { data: articles } = await supabase
          .from('blog_articles')
          .select('title, created_at, status')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentActivity(articles || []);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Mock data for charts
  const chartData = [
    { name: 'Lun', visitas: 400 },
    { name: 'Mar', visitas: 300 },
    { name: 'Mie', visitas: 550 },
    { name: 'Jue', visitas: 450 },
    { name: 'Vie', visitas: 600 },
    { name: 'Sab', visitas: 800 },
    { name: 'Dom', visitas: 750 },
  ];

  if (loading) return <div className="p-8">Cargando dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Artículos Publicados" value={stats.articles} icon={FileText} color="bg-blue-500" />
        <StatCard title="Guías Descargables" value={stats.guides} icon={BookOpen} color="bg-purple-500" />
        <StatCard title="Comparativas" value={stats.comparisons} icon={GitCompare} color="bg-orange-500" />
        <StatCard title="Suscriptores" value={stats.subscribers} icon={Users} color="bg-green-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Visitas Semanales (Demo)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                <Bar dataKey="visitas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Actividad Reciente</h3>
          <div className="space-y-6">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500">Nuevo artículo creado • {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <Link to="/admin/articulos" className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-4">
              Ver todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
