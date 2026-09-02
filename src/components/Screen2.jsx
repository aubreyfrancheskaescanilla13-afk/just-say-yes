import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const Screen2 = ({ onNext }) => {
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // Trigger pixel confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#ff79c6', '#bd93f9', '#50fa7b', '#ffb86c']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#ff79c6', '#bd93f9', '#50fa7b', '#ffb86c']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const timer = setTimeout(() => {
      setShowSecondary(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="font-pixel text-[10px] md:text-xs text-yellow-300 bg-yellow-950/80 px-3 py-1.5 rounded border border-yellow-500 inline-block mb-3 tracking-widest uppercase">
          CRITICAL HIT! +9999 EXP
        </div>

        <h1 className="font-pixel text-xl md:text-2xl text-pink-400 font-bold mb-3 leading-relaxed">
          QUEST ACCEPTED!
        </h1>

        <p className="font-silkscreen text-lg md:text-xl text-purple-200 font-semibold mb-6">
          I KNEW YOU WOULD CHOOSE YES!
        </p>

        {showSecondary && (
          <div className="transition-all duration-500 ease-in-out opacity-100 transform translate-y-0">
            <div className="border-t-2 border-dashed border-purple-500/40 my-6" />

            <p className="text-purple-300 text-sm md:text-base font-vt tracking-wider mb-2">
              [NPC DIALOGUE]: Okay... jokes aside.
            </p>
            <p className="font-pixel text-sm md:text-base text-pink-300 mb-8 leading-relaxed">
              I'm actually really happy you said yes.
            </p>

            <button
              onClick={onNext}
              className="pixel-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
            >
              NEXT QUEST STEP →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen2;
