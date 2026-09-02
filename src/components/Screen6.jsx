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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="font-pixel text-[10px] text-amber-400 bg-amber-950/80 px-3 py-1 rounded border border-amber-500 inline-block mb-3 tracking-widest uppercase">
          INVENTORY SELECTION / MANA RESTORATION
        </div>

        <h2 className="font-pixel text-base md:text-lg font-bold text-pink-400 mb-2">
          MOST IMPORTANT QUEST QUESTION...
        </h2>

        <p className="font-silkscreen text-lg md:text-xl font-semibold text-purple-200 mb-2">
          What do you want to eat?
        </p>

        <p className="text-purple-300 text-xs font-vt tracking-wider mb-8">
          Seriously, you get to choose your HP restoration item. Don't say I never let you decide!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <label className="block text-yellow-300 font-pixel text-xs mb-3 text-left">
                SELECT FOOD ITEM:
              </label>
              <input
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Pizza, Tacos, Sushi, Ramen..."
                className="w-full px-5 py-4 rounded-lg bg-purple-950 border-2 border-pink-500 focus:border-yellow-400 text-pink-200 font-silkscreen text-base outline-none shadow-inner placeholder:text-purple-500"
              />
            </div>

            <button
              type="submit"
              className="pixel-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
            >
              CONFIRM FOOD SELECTION
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-purple-950/90 p-5 rounded-lg border-2 border-green-500 shadow-xl">
              <p className="text-green-400 font-pixel text-[10px] uppercase tracking-wider mb-2">
                FOOD REQUEST ADDED TO QUEST INVENTORY
              </p>
              <p className="font-silkscreen text-xl md:text-2xl font-bold text-yellow-300 mb-3">
                "{inputValue || foodChoice}"
              </p>
              <p className="font-pixel text-xs text-pink-300 leading-relaxed">
                Noted! Your food request has been officially accepted.
              </p>
            </div>

            <button
              onClick={onNext}
              className="pixel-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
            >
              CONTINUE QUEST →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen6;
