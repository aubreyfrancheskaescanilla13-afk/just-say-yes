import React, { useState, useEffect } from 'react';

const Screen4 = ({ onNext }) => {
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReveal(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="text-5xl mb-3">⏳📅</div>

        <div className="font-pixel text-[10px] text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded border border-cyan-500 inline-block mb-3 tracking-widest uppercase">
          QUEST SCHEDULE DISCOVERY
        </div>

        <h2 className="font-pixel text-lg md:text-xl font-bold text-pink-400 mb-6 leading-relaxed">
          SO... WHEN IS THIS HAPPENING? 👀
        </h2>

        {/* Dramatic Pause Reveal */}
        <div className="min-h-[160px] flex flex-col items-center justify-center">
          {!showReveal ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="font-pixel text-xs text-yellow-300 animate-pulse">
                [DECODING QUEST TIMELINE...]
              </div>
              <div className="flex items-center space-x-2 text-purple-400 font-medium">
                <div className="w-3 h-3 bg-pink-500 rounded animate-ping" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-purple-500 rounded animate-ping" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-cyan-500 rounded animate-ping" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : (
            <div className="transition-all duration-500 w-full">
              <div className="bg-purple-950/90 border-2 border-pink-500/80 p-5 rounded-lg mb-4 shadow-xl">
                <div className="font-pixel text-[10px] text-pink-400 uppercase tracking-widest mb-2">
                  ✨ QUEST DATE UNLOCKED
                </div>
                <p className="font-pixel text-lg md:text-xl font-bold text-yellow-300 mb-2 leading-relaxed">
                  📅 SEPTEMBER 9, 2026
                </p>
                <p className="font-silkscreen text-base md:text-lg font-bold text-purple-200">
                  🌙 AT NIGHT TIME
                </p>
              </div>

              <p className="font-pixel text-xs text-purple-300 mb-6">
                PRO TIP: Don't be late! 😂💕
              </p>
            </div>
          )}
        </div>

        {showReveal && (
          <button
            onClick={onNext}
            className="pixel-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
          >
            NEXT QUEST LOCALE →
          </button>
        )}
      </div>
    </div>
  );
};

export default Screen4;
