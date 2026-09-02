import React, { useState } from 'react';
import { Utensils, ArrowRight } from 'lucide-react';

const FOOD_PRESETS = [
  '🍕 Pizza & Wings',
  '🍜 Ramen & Boba',
  '🌮 Tacos & Churros',
  '🍔 Burgers & Fries',
  '🍣 Sushi & Miso',
  '🍝 Pasta & Garlic Bread',
];

export default function FoodQuestGame({ foodChoice, setFoodChoice, onNext }) {
  const [customFood, setCustomFood] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customFood.trim()) {
      setFoodChoice(customFood);
      setSubmitted(true);
    }
  };

  const handleSelectPreset = (preset) => {
    setFoodChoice(preset);
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 font-mono z-20">
      <div className="bg-slate-950/90 border-2 border-purple-500 rounded-2xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-xl relative overflow-hidden text-center">
        {/* CRT Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 border-b border-purple-900/80 pb-3">
          <span className="text-xs font-['Press_Start_2P',monospace] text-pink-400">
            STAGE 4: FOOD QUEST
          </span>
          <Utensils className="w-5 h-5 text-amber-300" />
        </div>

        <h2 className="text-lg font-bold font-['Press_Start_2P',monospace] text-purple-200 mb-2">
          MOST IMPORTANT QUESTION 🍽️
        </h2>
        <p className="text-sm font-['VT323',monospace] text-purple-300 mb-6 tracking-wide">
          What do you want to eat for date night? You get total freedom of choice.
        </p>

        {!submitted ? (
          <div>
            {/* Food Presets Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {FOOD_PRESETS.map((food, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(food)}
                  className="p-3 bg-slate-900/90 border border-purple-700/80 hover:border-pink-400 hover:bg-purple-950/80 rounded-xl font-['VT323',monospace] text-base text-purple-200 transition-all duration-200 cursor-pointer text-left flex items-center justify-between hover:scale-105 active:scale-95"
                >
                  <span>{food}</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
              <span className="text-xs font-['Silkscreen',sans-serif] text-slate-400 text-left">
                Or type custom craving:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFood}
                  onChange={(e) => setCustomFood(e.target.value)}
                  placeholder="e.g. Extra cheesy pizza..."
                  className="flex-1 bg-slate-900 border border-purple-600 rounded-xl px-4 py-2 text-sm text-slate-200 font-['VT323',monospace] text-base focus:outline-none focus:border-pink-400"
                />
                <button
                  type="submit"
                  disabled={!customFood.trim()}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-['Press_Start_2P',monospace] text-[10px] rounded-xl border border-pink-400 cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fade-in my-4">
            <div className="inline-block px-3 py-1 bg-emerald-950 border border-emerald-500 text-emerald-400 font-['Press_Start_2P',monospace] text-[10px] rounded-full mb-4 shadow-[0_0_10px_rgba(52,211,153,0.4)]">
              ★ STAGE CLEAR! FOOD ORDER CONFIRMED ★
            </div>

            <div className="bg-purple-950/90 border-2 border-purple-500 rounded-2xl p-4 w-full max-w-md my-2">
              <span className="text-xs font-['Press_Start_2P',monospace] text-pink-400 block mb-2">
                OFFICIAL FOOD ORDER:
              </span>
              <p className="text-2xl font-['VT323',monospace] text-amber-300 font-bold tracking-wider">
                "{foodChoice}"
              </p>
              <p className="text-xs text-slate-300 font-['VT323',monospace] mt-2">
                Noted! Your food request has been officially accepted into the date itinerary. 💜
              </p>
            </div>

            <button
              onClick={onNext}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-['Press_Start_2P',monospace] text-xs rounded-xl border border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              NEXT STAGE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
