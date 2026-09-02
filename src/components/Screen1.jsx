import React, { useState, useRef, useEffect } from 'react';

const NO_MESSAGES = [
  'NO 😭',
  'SYSTEM REJECTED ⚠️',
  'ARE YOU SURE? 🤖',
  'ERROR: CHOICE DENIED! ❌',
  'WHY ARE YOU CHASING ME?! 😭',
  'STOP TRYING TO CLICK NO! 😂',
  'JUST CLICK YES 💜',
  'YOU KNOW YOU WANT TO 👀',
  'CATCH ME IF YOU CAN ⚡'
];

const Screen1 = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hasTriggeredError, setHasTriggeredError] = useState(false);
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  // Current No message
  const currentNoMsg = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  // Scale factor for Yes button
  const yesScale = 1 + noCount * 0.35;

  const handleFirstNoClick = () => {
    if (!hasTriggeredError) {
      setShowErrorModal(true);
      setHasTriggeredError(true);
    } else {
      moveNoButton();
    }
  };

  const moveNoButton = () => {
    if (!hasTriggeredError) return;
    setNoCount((prev) => prev + 1);

    if (typeof window === 'undefined') return;

    const btnWidth = noBtnRef.current ? noBtnRef.current.offsetWidth : 180;
    const btnHeight = noBtnRef.current ? noBtnRef.current.offsetHeight : 50;

    const padding = 30;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setNoPosition({ x: randomX, y: randomY });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (noPosition) {
        setNoPosition((prev) => {
          if (!prev) return null;
          const maxX = window.innerWidth - 180;
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
      className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center select-none overflow-hidden crt-scanlines"
    >
      {/* Game Card Window */}
      <div className="game-card rounded-xl p-6 md:p-10 max-w-xl w-full z-10 transition-all duration-300">
        {/* Game Title Bar */}
        <div className="flex items-center justify-between border-b-2 border-purple-500/50 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span className="font-pixel text-xs text-purple-300 ml-2 tracking-wider">QUEST_LOG_v2.0</span>
          </div>
          <div className="font-pixel text-[10px] text-pink-400 bg-purple-950/80 px-2 py-1 rounded border border-purple-700">
            LEVEL 1
          </div>
        </div>

        {/* Pixel Icon Avatar */}
        <div className="text-5xl md:text-6xl mb-4 animate-gentle-float">🎮</div>

        <h1 className="font-pixel text-xl md:text-2xl text-pink-400 mb-4 leading-relaxed tracking-wide">
          SYSTEM PROMPT:
        </h1>

        <p className="font-silkscreen text-xl md:text-2xl text-purple-200 font-bold mb-6 leading-relaxed">
          "Will you go on a date with me?" 💕
        </p>

        <div className="bg-purple-950/70 p-3.5 rounded-lg border border-purple-500/40 mb-8 text-xs md:text-sm text-purple-300 font-vt tracking-wider">
          💡 HINT: Choose wisely... Option [YES] boosts Power level! 👀
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative">
          {/* YES Button */}
          <button
            onClick={onAccept}
            style={{
              transform: `scale(${yesScale})`,
            }}
            className="z-20 pixel-btn animate-pulse-glow bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-pixel px-6 py-4 rounded-lg text-sm md:text-base cursor-pointer whitespace-nowrap uppercase tracking-wider"
          >
            💖 YES [ACCEPT QUEST]
          </button>

          {/* Initial Inline NO Button */}
          {!noPosition && (
            <button
              ref={noBtnRef}
              onClick={handleFirstNoClick}
              onMouseEnter={() => {
                if (hasTriggeredError) moveNoButton();
              }}
              onTouchStart={(e) => {
                if (hasTriggeredError) {
                  e.preventDefault();
                  moveNoButton();
                }
              }}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-rose-300 border-rose-500/80 font-pixel px-5 py-3.5 rounded-lg text-xs md:text-sm cursor-pointer whitespace-nowrap uppercase tracking-wider"
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
            transition: 'all 0.2s ease-out',
            zIndex: 50,
          }}
          className="pixel-btn bg-red-950 hover:bg-red-900 text-rose-300 border-2 border-red-500 font-pixel px-5 py-3 rounded-lg text-xs shadow-2xl cursor-pointer whitespace-nowrap uppercase"
        >
          {currentNoMsg}
        </button>
      )}

      {/* RETRO SYSTEM ERROR MODAL */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="game-card-error rounded-xl p-6 md:p-8 max-w-md w-full text-center border-4 border-red-500">
            <div className="text-4xl mb-3">⚠️</div>
            <h2 className="font-pixel text-lg text-red-400 mb-3 tracking-wider">
              SYSTEM FATAL ERROR
            </h2>
            <div className="bg-red-950/80 border border-red-500/50 p-4 rounded mb-6 text-left font-mono text-xs text-red-200 leading-relaxed">
              <p className="text-yellow-400 font-pixel text-[10px] mb-2">[ERROR CODE: 0xNO_WAY_3000]</p>
              <p className="mb-2">❌ CHOICE 'NO' IS CORRUPTED AND UNSTABLE.</p>
              <p className="text-pink-300">The system rejects this response. 'NO' button engine is malfunctioning!</p>
            </div>
            <button
              onClick={() => {
                setShowErrorModal(false);
                moveNoButton();
              }}
              className="pixel-btn bg-red-600 hover:bg-red-500 text-white font-pixel text-xs px-6 py-3.5 rounded cursor-pointer uppercase tracking-wider"
            >
              ⚠️ ACKNOWLEDGE & FIX ERROR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screen1;
