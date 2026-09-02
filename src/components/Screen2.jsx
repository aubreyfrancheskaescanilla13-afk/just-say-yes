import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const Screen2 = ({ onNext }) => {
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // Trigger confetti explosion on screen load
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fb7185']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fb7185']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Reveal sincere message after short delay
    const timer = setTimeout(() => {
      setShowSecondary(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80 animate-gentle-float">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>

        <h1 className="font-handwriting text-5xl md:text-6xl font-bold text-pink-600 mb-2">
          YAYYYYY!!! 🥹💕
        </h1>

        <p className="font-handwriting text-3xl md:text-4xl text-purple-800 font-semibold mb-6">
          I KNEW IT! 😂💜
        </p>

        {showSecondary && (
          <div className="transition-all duration-700 ease-in-out opacity-100 transform translate-y-0">
            <div className="border-t border-purple-200/60 my-6" />

            <p className="text-slate-600 text-lg md:text-xl font-medium mb-2">
              Okay... jokes aside.
            </p>
            <p className="font-handwriting text-2xl md:text-3xl text-purple-900 font-bold mb-8">
              I'm actually really happy you said yes. 🥹💕
            </p>

            <button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              💌 Okay, what's next?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen2;
