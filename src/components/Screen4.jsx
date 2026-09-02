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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80">
        <div className="text-5xl mb-3">📅</div>

        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-6">
          So... when is this happening? 👀
        </h2>

        {/* Dramatic Pause Reveal */}
        <div className="min-h-[160px] flex flex-col items-center justify-center">
          {!showReveal ? (
            <div className="flex items-center space-x-2 text-purple-600 font-medium py-8">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className="transition-all duration-700 animate-gentle-float">
              <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-2 border-pink-300 p-6 rounded-3xl mb-4 shadow-inner">
                <p className="font-handwriting text-4xl md:text-5xl font-bold text-pink-600 mb-1">
                  📅 September 9, 2026
                </p>
                <p className="font-handwriting text-3xl md:text-4xl font-bold text-purple-800">
                  🌙 At Night
                </p>
              </div>

              <p className="font-handwriting text-2xl text-purple-900 font-semibold mb-6">
                Don't be late. 😂💕
              </p>
            </div>
          )}
        </div>

        {showReveal && (
          <button
            onClick={onNext}
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default Screen4;
