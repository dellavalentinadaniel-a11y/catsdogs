
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { comparePassword, hashPassword } from '@/lib/adminUtils';
import { useToast } from '@/components/ui/use-toast';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage for existing session
    const storedAdmin = localStorage.getItem('petcare_admin_user');
    if (storedAdmin) {
      setCurrentAdmin(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      // Fetch user from Supabase admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        throw new Error('Usuario no encontrado o credenciales inválidas.');
      }

      // Verify password
      const isValid = await comparePassword(password, data.password_hash);
      
      if (!isValid) {
        throw new Error('Contraseña incorrecta.');
      }

      // Success
      const adminData = { id: data.id, email: data.email, role: data.role };
      setCurrentAdmin(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('petcare_admin_user', JSON.stringify(adminData));
      
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente.",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(() => {
    setCurrentAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('petcare_admin_user');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
  }, [toast]);

  const createFirstAdmin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      
      // Check if any admins exist
      const { count } = await supabase.from('admin_users').select('*', { count: 'exact', head: true });
      
      if (count > 0) {
        throw new Error("Ya existen administradores. No se puede crear uno nuevo por esta vía.");
      }

      const passwordHash = await hashPassword(password);
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert([{ email, password_hash: passwordHash, role: 'superadmin' }])
        .select()
        .single();

      if (error) throw error;

      return { success: true };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear admin",
        description: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return (
    <AdminAuthContext.Provider value={{ currentAdmin, isAuthenticated, login, logout, createFirstAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
