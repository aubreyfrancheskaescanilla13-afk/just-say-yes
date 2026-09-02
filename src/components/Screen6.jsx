import React, { useState } from 'react';

const Screen6 = ({ foodChoice, setFoodChoice, onNext }) => {
  const [submitted, setSubmitted] = useState(Boolean(foodChoice));
  const [inputValue, setInputValue] = useState(foodChoice || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setFoodChoice(inputValue.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80">
        <div className="text-5xl mb-3">🍽️</div>

        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-2">
          Most important question... 👀🍽️
        </h2>

        <p className="font-handwriting text-3xl md:text-4xl font-semibold text-pink-600 mb-2">
          What do you want to eat?
        </p>

        <p className="text-slate-600 text-sm md:text-base font-medium mb-8">
          Seriously, you get to choose. Don't say I never let you decide anything. 😂💜
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <label className="block text-slate-700 font-semibold mb-2 text-left text-sm md:text-base">
                I want to eat:
              </label>
              <input
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Pizza, Tacos, Sushi, Pasta..."
                className="w-full px-6 py-4 rounded-full bg-white/90 border-2 border-pink-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 text-slate-800 text-lg font-medium outline-none transition-all duration-300 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              💕 Sounds good!
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-gentle-float">
            <div className="bg-purple-100/80 p-6 rounded-3xl border border-purple-300/80 shadow-md">
              <p className="text-slate-600 text-sm uppercase tracking-wider font-semibold mb-1">
                Your Request
              </p>
              <p className="font-handwriting text-4xl font-bold text-purple-900 mb-3">
                "{inputValue || foodChoice}"
              </p>
              <p className="font-handwriting text-2xl font-bold text-pink-600">
                Noted! Your food request has been officially accepted. 😂🍽️💜
              </p>
            </div>

            <button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen6;
