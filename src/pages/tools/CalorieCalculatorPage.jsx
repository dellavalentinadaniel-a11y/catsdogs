
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save, Activity, Dog, Cat, Utensils } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSpace from '@/components/AdSpace';
import { trackCalculatorUsage, trackToolUsage } from '@/lib/analytics';
import { useToast } from '@/components/ui/use-toast';

const CalorieCalculatorPage = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    petType: 'dog',
    weight: 10,
    age: 3,
    activityLevel: 'moderate',
    foodType: 'dry'
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    trackToolUsage('Calorie Calculator');
  }, []);

  const calculateCalories = () => {
    // Resting Energy Requirement (RER)
    const rer = 70 * Math.pow(inputs.weight, 0.75);
    
    let factor = 1.6; // Default Adult Dog Neuter

    if (inputs.petType === 'dog') {
      if (inputs.age < 1) factor = 3.0; // Puppy
      else if (inputs.age > 7) factor = 1.4; // Senior
      else {
        switch (inputs.activityLevel) {
          case 'sedentary': factor = 1.4; break;
          case 'moderate': factor = 1.6; break;
          case 'active': factor = 2.0; break;
          case 'very active': factor = 3.0; break;
          default: factor = 1.6;
        }
      }
    } else { // Cat
      if (inputs.age < 1) factor = 2.5; // Kitten
      else {
        switch (inputs.activityLevel) {
          case 'sedentary': factor = 1.0; break;
          case 'moderate': factor = 1.2; break;
          case 'active': factor = 1.4; break;
          default: factor = 1.2;
        }
      }
    }

    const dailyCalories = Math.round(rer * factor);
    
    setResult({
      calories: dailyCalories,
      protein: inputs.petType === 'dog' ? '18-25%' : '26-40%',
      fat: inputs.petType === 'dog' ? '10-15%' : '9-20%',
      carbs: inputs.petType === 'dog' ? '30-50%' : '10-15%', // Cats need less carbs
      timestamp: new Date().toISOString()
    });

    trackCalculatorUsage(inputs.petType);
  };

  const saveResult = () => {
    if (!result) return;
    const history = JSON.parse(localStorage.getItem('calorieHistory') || '[]');
    history.push({ ...inputs, ...result });
    localStorage.setItem('calorieHistory', JSON.stringify(history));
    toast({
      title: "Resultado Guardado",
      description: "El cálculo se ha guardado en tu historial."
    });
  };

  const breadcrumbs = [
    { name: 'Herramientas', path: '/recursos' },
    { name: 'Calculadora de Calorías', path: '/herramientas/calculadora-calorias' }
  ];

  return (
    <>
      <SEO 
        title="Calculadora de Calorías para Perros y Gatos" 
        description="Calcula las necesidades calóricas diarias de tu mascota según su peso, edad y nivel de actividad."
        breadcrumbs={breadcrumbs}
      />
      
      <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 mt-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Calculadora de Nutrición
            </h1>
            <p className="text-xl text-gray-600">
              Descubre cuánto debe comer tu mejor amigo para mantenerse saludable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <Activity className="w-6 h-6 text-blue-500" /> Datos de la Mascota
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Mascota</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setInputs({ ...inputs, petType: 'dog' })}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${inputs.petType === 'dog' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Dog className="w-5 h-5" /> Perro
                    </button>
                    <button
                      onClick={() => setInputs({ ...inputs, petType: 'cat' })}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${inputs.petType === 'cat' ? 'bg-pink-100 text-pink-700 ring-2 ring-pink-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Cat className="w-5 h-5" /> Gato
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg): {inputs.weight}kg</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="60" 
                    step="0.5"
                    value={inputs.weight}
                    onChange={(e) => setInputs({...inputs, weight: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad (años): {inputs.age}</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="20" 
                    step="0.1"
                    value={inputs.age}
                    onChange={(e) => setInputs({...inputs, age: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Actividad</label>
                  <select 
                    value={inputs.activityLevel}
                    onChange={(e) => setInputs({...inputs, activityLevel: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sedentary">Sedentario (Poco ejercicio)</option>
                    <option value="moderate">Moderado (Paseos normales)</option>
                    <option value="active">Activo (Mucho juego/correr)</option>
                    <option value="very active">Muy Activo (Trabajo/Deporte)</option>
                  </select>
                </div>

                <button 
                  onClick={calculateCalories}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" /> Calcular Requerimiento
                </button>
              </div>
            </motion.div>

            <motion.div 
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="space-y-6"
            >
              {result ? (
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Resultados Estimados</h3>
                  
                  <div className="text-center py-6 bg-green-50 rounded-xl mb-6">
                    <span className="block text-sm text-green-700 uppercase tracking-wider font-semibold">Calorías Diarias</span>
                    <span className="text-5xl font-black text-green-600">{result.calories}</span>
                    <span className="text-green-700 font-medium"> kcal/día</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 font-bold mb-1">PROTEÍNA</div>
                      <div className="font-bold text-gray-800">{result.protein}</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-xs text-yellow-600 font-bold mb-1">GRASA</div>
                      <div className="font-bold text-gray-800">{result.fat}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-xs text-orange-600 font-bold mb-1">CARBOS</div>
                      <div className="font-bold text-gray-800">{result.carbs}</div>
                    </div>
                  </div>

                  <button 
                    onClick={saveResult}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Guardar Resultado
                  </button>
                  
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    * Estos valores son estimados. Consulta siempre con tu veterinario para una dieta específica.
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-white/50 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center text-gray-400">
                  <Utensils className="w-16 h-16 mb-4 opacity-50" />
                  <p>Ingresa los datos de tu mascota para ver el cálculo nutricional detallado aquí.</p>
                </div>
              )}

              <AdSpace size="medium" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalorieCalculatorPage;
