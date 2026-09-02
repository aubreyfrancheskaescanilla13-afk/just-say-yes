import React, { useState, useEffect } from 'react';

const Screen5 = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(() => setStep(3), 2800);
    const t4 = setTimeout(() => setStep(4), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="text-5xl mb-3">🗺️🏡</div>

        <div className="font-pixel text-[10px] text-purple-300 bg-purple-950/80 px-3 py-1 rounded border border-purple-500 inline-block mb-3 tracking-widest uppercase">
          MAP LOCATION DISCOVERY
        </div>

        <h2 className="font-pixel text-lg md:text-xl font-bold text-pink-400 mb-6 leading-relaxed">
          AND WHERE ARE WE GOING? 👀
        </h2>

        <div className="min-h-[220px] flex flex-col items-center justify-center space-y-3 mb-6">
          {step >= 1 && (
            <p className="text-purple-300 text-xs md:text-sm font-vt tracking-wider transition-all duration-300">
              📍 Scanning location: Somewhere nice...
            </p>
          )}

          {step >= 2 && (
            <p className="text-purple-300 text-xs md:text-sm font-vt tracking-wider transition-all duration-300">
              ☕ Scanning location: Somewhere cozy...
            </p>
          )}

          {step >= 3 && (
            <p className="text-purple-300 text-xs md:text-sm font-vt tracking-wider transition-all duration-300">
              🎮 Scanning location: Somewhere we can just be ourselves...
            </p>
          )}

          {step >= 4 && (
            <div className="pt-2 transition-all duration-500 w-full">
              <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 text-white p-5 rounded-lg border-2 border-yellow-400 shadow-xl mb-4">
                <div className="font-pixel text-[10px] text-yellow-300 uppercase tracking-widest mb-1">
                  🏰 MAP LOCATION DISCOVERED
                </div>
                <p className="font-pixel text-lg md:text-xl font-bold">
                  🏡 MY HOUSE 💜
                </p>
              </div>

              <p className="text-purple-200 text-xs font-vt tracking-wider">
                No fancy restaurant required.
              </p>
              <p className="font-pixel text-xs text-pink-300 mt-2 leading-relaxed">
                Just us, food, movies, and questionable gaming skills. 😂💕
              </p>
            </div>
          )}
        </div>

        {step >= 4 && (
          <button
            onClick={onNext}
            className="pixel-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
          >
            CONTINUE QUEST 💕 →
          </button>
        )}
      </div>
    </div>
  );
};

export default Screen5;
