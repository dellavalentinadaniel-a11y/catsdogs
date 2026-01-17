
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { setupInitialAdmin } from '@/lib/setupAdmin';

const AdminSetupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // We modify this page to allow one-click setup for the specific requested user
  // or manual setup if needed.

  const handleAutoSetup = async () => {
    setIsSubmitting(true);
    const result = await setupInitialAdmin();
    
    if (result.success) {
      toast({ 
        title: "Éxito", 
        description: result.message || "Admin inicial configurado. Redirigiendo..." 
      });
      setTimeout(() => navigate('/admin/login'), 1500);
    } else {
      toast({ 
        title: "Error", 
        description: result.error || "Hubo un error al configurar el admin.", 
        variant: "destructive" 
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 bg-green-600 text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Configuración Rápida</h2>
          <p className="text-green-100">Sistema de Administración PetCare</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">Modo de Configuración Automática</p>
            <p>Este asistente configurará el usuario administrador predeterminado:</p>
            <ul className="list-disc list-inside mt-2 font-mono text-xs">
              <li>User: dellavalentina.daniel@gmail.com</li>
            </ul>
          </div>

          <button
            onClick={handleAutoSetup}
            disabled={isSubmitting}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <KeyRound className="w-5 h-5" /> 
                Configurar Admin Automáticamente
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSetupPage;
