import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Screen9 = ({ foodChoice }) => {
  useEffect(() => {
    // Grand pixel victory confetti burst
    const count = 250;
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
      spread: 30,
      startVelocity: 55,
      colors: ['#ff79c6', '#bd93f9', '#50fa7b']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ff5555', '#ffb86c', '#8be9fd']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#f1fa8c', '#bd93f9']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="text-6xl md:text-7xl mb-4 animate-bounce">🏆💖</div>

        <div className="font-pixel text-[10px] md:text-xs text-green-400 bg-green-950/90 px-3 py-1.5 rounded border border-green-500 inline-block mb-3 tracking-widest uppercase animate-pulse">
          ★ ALL QUEST OBJECTIVES COMPLETED ★
        </div>

        <h1 className="font-pixel text-xl md:text-2xl font-bold text-pink-400 mb-4 leading-relaxed tracking-wider">
          IT'S A DATE!!! 🥹💕
        </h1>

        <p className="font-silkscreen text-lg text-purple-200 font-bold mb-6">
          NO BACKING OUT NOW. 😂💜
        </p>

        <div className="bg-purple-950/90 p-5 rounded-lg border-2 border-yellow-400 shadow-xl mb-6">
          <p className="font-pixel text-sm md:text-base font-bold text-yellow-300 mb-2">
            SEE YOU ON SEPTEMBER 9! 🌙💕
          </p>
          <p className="text-purple-200 font-vt text-sm md:text-base">
            At my house • Night time • {foodChoice ? `Eating ${foodChoice}` : 'Delicious food'}
          </p>
        </div>

        <p className="font-pixel text-xs text-pink-300">
          GAME OVER: PERFECT ENDING UNLOCKED! 💖
        </p>
      </div>
    </div>
  );
};

export default Screen9;
