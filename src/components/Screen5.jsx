import React, { useState, useEffect } from 'react';

const Screen5 = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setStep(3), 3400);
    const t4 = setTimeout(() => setStep(4), 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80">
        <div className="text-5xl mb-3">🏡</div>

        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-6">
          And where are we going? 👀
        </h2>

        <div className="min-h-[220px] flex flex-col items-center justify-center space-y-3 mb-6">
          {step >= 1 && (
            <p className="text-slate-600 text-lg md:text-xl font-medium transition-all duration-500 animate-fade-in">
              Somewhere nice...
            </p>
          )}

          {step >= 2 && (
            <p className="text-slate-600 text-lg md:text-xl font-medium transition-all duration-500 animate-fade-in">
              Somewhere cozy...
            </p>
          )}

          {step >= 3 && (
            <p className="text-slate-600 text-lg md:text-xl font-medium transition-all duration-500 animate-fade-in">
              Somewhere we can just be ourselves...
            </p>
          )}

          {step >= 4 && (
            <div className="pt-2 transition-all duration-700 animate-gentle-float">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-5 rounded-3xl shadow-xl mb-4">
                <p className="font-handwriting text-4xl md:text-5xl font-bold tracking-wide">
                  🏡 My House 💜
                </p>
              </div>

              <p className="text-slate-700 text-base md:text-lg font-medium">
                No fancy restaurant required.
              </p>
              <p className="font-handwriting text-2xl text-purple-900 font-bold mt-1">
                Just us, food, movies, and questionable gaming skills. 😂💕
              </p>
            </div>
          )}
        </div>

        {step >= 4 && (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Continue 💕
          </button>
        )}
      </div>
    </div>
  );
};

export default Screen5;
