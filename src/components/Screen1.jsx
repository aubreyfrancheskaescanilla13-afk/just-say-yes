import React, { useState, useRef, useEffect } from 'react';

const NO_MESSAGES = [
  'No 😭',
  'Are you sure? 🥺',
  'Really? 😭',
  'HEY— 😂',
  'Why are you chasing me?! 😭',
  'Stop trying to click me! 😂',
  'Just click Yes 💜',
  'You know you want to 👀',
  'Okay, catch me then 😂'
];

const Screen1 = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState(null);
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  // Current No message
  const currentNoMsg = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  // Scale factor for Yes button
  // Grows with each No escape attempt: 1.0, 1.25, 1.5, 1.8, 2.1, 2.5, 3.0, 3.6, 4.2...
  const yesScale = 1 + noCount * 0.35;
  const glowIntensity = Math.min(noCount * 12 + 15, 60);

  const moveNoButton = () => {
    setNoCount((prev) => prev + 1);

    if (typeof window === 'undefined') return;

    const btnWidth = noBtnRef.current ? noBtnRef.current.offsetWidth : 160;
    const btnHeight = noBtnRef.current ? noBtnRef.current.offsetHeight : 50;

    // Viewport padding so button doesn't hug screen edges
    const padding = 20;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setNoPosition({ x: randomX, y: randomY });
  };

  // Handle window resize to keep escaping button on screen
  useEffect(() => {
    const handleResize = () => {
      if (noPosition) {
        setNoPosition((prev) => {
          if (!prev) return null;
          const maxX = window.innerWidth - 150;
          const maxY = window.innerHeight - 60;
          return {
            x: Math.min(prev.x, Math.max(20, maxX)),
            y: Math.min(prev.y, Math.max(20, maxY))
          };
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [noPosition]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center select-none overflow-hidden"
    >
      {/* Frosted Glass Card */}
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full z-10 transition-all duration-500 shadow-2xl border border-white/60">
        <div className="text-5xl md:text-6xl mb-4 animate-bounce">💌</div>

        <h1 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-3 tracking-wide">
          Hey... 🥺💜
        </h1>

        <p className="font-handwriting text-3xl md:text-4xl text-pink-700 font-semibold mb-6">
          Will you go on a date with me? 💕
        </p>

        <p className="text-slate-600 text-sm md:text-base font-medium mb-8 bg-purple-50/70 p-3 rounded-2xl border border-purple-100/80">
          Choose wisely... one of these buttons is clearly better. 👀😂
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px] relative">
          {/* YES Button */}
          <button
            onClick={onAccept}
            style={{
              transform: `scale(${yesScale})`,
              boxShadow: `0 0 ${glowIntensity}px rgba(236, 72, 153, 0.7), 0 0 ${glowIntensity * 1.5}px rgba(168, 85, 247, 0.5)`
            }}
            className="z-20 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold px-8 py-3.5 rounded-full text-lg md:text-xl shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            💖 Yes
          </button>

          {/* Initial Inline NO Button placeholder if not escaped yet */}
          {!noPosition && (
            <button
              ref={noBtnRef}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              onClick={moveNoButton}
              className="bg-slate-200/90 hover:bg-slate-300 text-slate-700 font-medium px-6 py-3 rounded-full text-base transition-all duration-300 cursor-pointer whitespace-nowrap shadow"
            >
              {currentNoMsg}
            </button>
          )}
        </div>
      </div>

      {/* Escaped Fixed NO Button */}
      {noPosition && (
        <button
          ref={noBtnRef}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          onClick={moveNoButton}
          style={{
            position: 'fixed',
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 50,
          }}
          className="bg-slate-200/95 hover:bg-slate-300 text-slate-800 font-semibold px-6 py-3 rounded-full text-base shadow-xl border border-slate-300/80 cursor-pointer whitespace-nowrap"
        >
          {currentNoMsg}
        </button>
      )}
    </div>
  );
};

export default Screen1;
