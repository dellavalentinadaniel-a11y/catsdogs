
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, FileText, BookOpen, Wrench, Newspaper,
  Tags, LogOut, Menu, X, Users, Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { logout, currentAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/articulos", icon: FileText, label: "Artículos" },
    { to: "/admin/categories", icon: Tags, label: "Categorías" },
    { to: "/admin/resources", icon: BookOpen, label: "Recursos / Guías" },
    { to: "/admin/news", icon: Newspaper, label: "Noticias" },
    { to: "/admin/tools", icon: Wrench, label: "Herramientas" },
    { to: "/admin/newsletter", icon: Users, label: "Suscriptores" },
    { to: "/admin/anuncios", icon: Megaphone, label: "Anuncios" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">PetCare Admin</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400"><X className="w-6 h-6" /></button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to} to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1",
                isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" /> {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
           <div className="px-4 mb-4">
             <p className="text-xs text-slate-500 uppercase font-bold">Usuario</p>
             <p className="text-sm text-white truncate" title={currentAdmin?.email}>{currentAdmin?.email}</p>
           </div>
           <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg">
             <LogOut className="w-5 h-5 mr-3" /> Cerrar Sesión
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm lg:hidden h-16 flex items-center px-4 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:bg-gray-100 p-2 rounded-md"><Menu className="w-6 h-6" /></button>
          <span className="ml-4 font-semibold text-gray-800">Menú</span>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
