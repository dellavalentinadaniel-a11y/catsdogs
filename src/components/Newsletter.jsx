
import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { trackNewsletterSubscription } from '@/lib/analytics';

const Newsletter = ({ variant = 'footer' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido.",
        variant: "destructive"
      });
      return;
    }

    // Mock API call
    localStorage.setItem('newsletter_subscriber', email);
    setSubscribed(true);
    trackNewsletterSubscription();
    
    toast({
      title: "¡Suscripción exitosa!",
      description: "Gracias por unirte a nuestra comunidad.",
    });
    setEmail('');
  };

  if (variant === 'sidebar') {
    return (
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-xl font-bold mb-2 text-blue-900">Únete a PetCare</h3>
        <p className="text-sm text-blue-700 mb-4">Recibe consejos semanales para el cuidado de tu mascota.</p>
        
        {subscribed ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">¡Ya estás suscrito!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Suscribirme
            </button>
            <p className="text-xs text-blue-400 text-center">No enviamos spam. Política de Privacidad.</p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4 text-white">Boletín Informativo</h3>
      {subscribed ? (
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>¡Gracias por suscribirte!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
          >
            Suscribir
          </button>
        </form>
      )}
      <p className="text-xs text-gray-400 mt-2">
        Al suscribirte aceptas nuestra <a href="/privacidad" className="underline hover:text-white">política de privacidad</a>.
      </p>
    </div>
  );
};

export default Newsletter;
