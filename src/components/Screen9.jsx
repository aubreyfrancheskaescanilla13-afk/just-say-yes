import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Screen9 = ({ foodChoice }) => {
  useEffect(() => {
    // Grand celebration confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ec4899', '#a855f7']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#f43f5e', '#fb7185']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#e9d5ff', '#fbcfe8']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/90 animate-gentle-float">
        <div className="text-6xl md:text-7xl mb-4 animate-bounce">🥹💕</div>

        <h1 className="font-handwriting text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 mb-4 tracking-wide">
          IT'S A DATE!!! 🥹💕
        </h1>

        <p className="font-handwriting text-3xl text-purple-900 font-bold mb-6">
          No backing out now. 😂💜
        </p>

        <div className="bg-gradient-to-r from-purple-100/90 to-pink-100/90 p-6 rounded-3xl border border-pink-300 shadow-md mb-6">
          <p className="font-handwriting text-3xl font-bold text-pink-700 mb-2">
            See you on September 9! 🌙💕
          </p>
          <p className="text-slate-600 font-medium text-sm md:text-base">
            At my house • Night time • {foodChoice ? `Eating ${foodChoice}` : 'Delicious food'}
          </p>
        </div>

        <p className="text-slate-500 text-sm italic">
          Can't wait! 💖
        </p>
      </div>
    </div>
  );
};

export default Screen9;
