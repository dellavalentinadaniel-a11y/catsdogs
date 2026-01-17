
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, RefreshCcw, Share2, Save } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackQuizCompletion, trackToolUsage } from '@/lib/analytics';
import { useToast } from '@/components/ui/use-toast';

const questions = [
  { id: 1, text: "¿En qué tipo de vivienda habitas?", options: [{ label: "Apartamento pequeño", value: "small" }, { label: "Casa con patio", value: "medium" }, { label: "Casa grande con jardín", value: "large" }] },
  { id: 2, text: "¿Cuánto tiempo libre tienes al día?", options: [{ label: "Menos de 1 hora", value: "low" }, { label: "1-2 horas", value: "medium" }, { label: "Más de 3 horas", value: "high" }] },
  { id: 3, text: "¿Nivel de actividad deseado?", options: [{ label: "Tranquilo y relajado", value: "low" }, { label: "Moderado", value: "medium" }, { label: "Muy activo y deportista", value: "high" }] },
  { id: 4, text: "¿Experiencia previa con mascotas?", options: [{ label: "Principiante", value: "beginner" }, { label: "Intermedia", value: "intermediate" }, { label: "Experto", value: "expert" }] },
  { id: 5, text: "¿Preferencia de tamaño?", options: [{ label: "Pequeño", value: "small" }, { label: "Mediano", value: "medium" }, { label: "Grande", value: "large" }] },
];

const breeds = [
  { name: "Bulldog Francés", type: "dog", size: "small", energy: "low", space: "small", match: 0, desc: "Perfecto para apartamentos, cariñoso y requiere poco ejercicio." },
  { name: "Golden Retriever", type: "dog", size: "large", energy: "high", space: "large", match: 0, desc: "Amigable, inteligente y muy activo. Ideal para familias con espacio." },
  { name: "Beagle", type: "dog", size: "medium", energy: "medium", space: "medium", match: 0, desc: "Curioso, amigable y enérgico. Requiere paciencia pero es gran compañero." },
  { name: "Gato Persa", type: "cat", size: "small", energy: "low", space: "small", match: 0, desc: "Tranquilo, elegante y perfecto para interiores. Requiere cepillado diario." },
  { name: "Border Collie", type: "dog", size: "medium", energy: "high", space: "large", match: 0, desc: "Extremadamente inteligente y activo. Necesita mucho estímulo mental." },
];

const BreedCompatibilityPage = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    trackToolUsage('Breed Compatibility Test');
  }, []);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Simple heuristic matching logic for demo
    const calculated = breeds.map(breed => {
      let score = 0;
      if (answers[1] === breed.space) score += 30; // Space match
      if (answers[3] === breed.energy) score += 30; // Energy match
      if (answers[5] === breed.size) score += 20; // Size match
      // Randomize slightly for variety in demo if perfect matches vary
      score += Math.floor(Math.random() * 20); 
      return { ...breed, match: Math.min(score, 100) };
    }).sort((a, b) => b.match - a.match).slice(0, 3);

    setResults(calculated);
    setShowResults(true);
    trackQuizCompletion(calculated[0].match);
  };

  const saveResults = () => {
    localStorage.setItem('breedQuizResults', JSON.stringify({ date: new Date(), results }));
    toast({ title: "Resultados guardados", description: "Puedes consultarlos más tarde." });
  };

  const breadcrumbs = [
    { name: 'Herramientas', path: '/recursos' },
    { name: 'Test de Compatibilidad', path: '/herramientas/test-compatibilidad-razas' }
  ];

  return (
    <>
      <SEO title="Test de Compatibilidad de Razas" description="Descubre qué raza de perro o gato se adapta mejor a tu estilo de vida." breadcrumbs={breadcrumbs} />
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />
          
          {!showResults ? (
            <div className="mt-8">
              <div className="mb-8">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  />
                </div>
                <p className="text-right text-sm text-gray-500 mt-2">Pregunta {currentQuestion + 1} de {questions.length}</p>
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center"
              >
                <h2 className="text-2xl font-bold mb-8 text-gray-800">{questions[currentQuestion].text}</h2>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all font-medium text-gray-700 text-left flex justify-between items-center group"
                    >
                      {option.label}
                      <span className="w-6 h-6 rounded-full border-2 border-purple-200 group-hover:bg-purple-500 group-hover:border-purple-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">¡Tus Compañeros Ideales!</h2>
              
              {results.map((breed, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gray-200 relative h-48 md:h-auto">
                     {/* Placeholder image logic would go here */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xl">{breed.name}</div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{breed.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">{breed.match}% Compatible</span>
                    </div>
                    <p className="text-gray-600 mb-4">{breed.desc}</p>
                    <div className="flex gap-2 text-sm">
                      <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 capitalize">Tamaño: {breed.size}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 capitalize">Energía: {breed.energy}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-4 justify-center mt-8">
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Reiniciar
                </button>
                <button onClick={saveResults} className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BreedCompatibilityPage;
