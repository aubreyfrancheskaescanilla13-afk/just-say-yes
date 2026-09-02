import React from 'react';

const Screen8 = ({ foodChoice, onFinalAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="text-5xl mb-3">💌🎮</div>

        <div className="font-pixel text-[10px] text-yellow-300 bg-yellow-950/80 px-3 py-1 rounded border border-yellow-500 inline-block mb-3 tracking-widest uppercase">
          FINAL QUEST SUMMARY & PROMPT
        </div>

        <h2 className="font-pixel text-base md:text-lg font-bold text-pink-400 mb-6 leading-relaxed">
          OKAY... ONE LAST THING. 💜
        </h2>

        {/* Date Recap Summary */}
        <div className="bg-purple-950/90 p-4 rounded-lg border-2 border-purple-500/80 text-left mb-6 space-y-2 text-purple-200 font-vt text-sm md:text-base">
          <p className="flex items-center space-x-2">
            <span>📅</span>
            <span><strong className="text-yellow-300 font-pixel text-xs">Date:</strong> September 9, 2026</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🌙</span>
            <span><strong className="text-yellow-300 font-pixel text-xs">Time:</strong> Night time</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🏡</span>
            <span><strong className="text-yellow-300 font-pixel text-xs">Location:</strong> My house</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🍽️</span>
            <span><strong className="text-yellow-300 font-pixel text-xs">Food:</strong> {foodChoice || 'Your special choice'}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>✨</span>
            <span><strong className="text-yellow-300 font-pixel text-xs">Quest Plan:</strong> Movies, games, cuddles, memories</span>
          </p>
        </div>

        {/* Sincere Message */}
        <div className="mb-6">
          <p className="font-pixel text-xs text-purple-200 leading-relaxed mb-3">
            I know this might sound simple...
          </p>
          <p className="font-pixel text-xs md:text-sm text-pink-300 font-bold leading-relaxed">
            but I think spending time with you would make it special. 🥹💜
          </p>
        </div>

        <div className="border-t-2 border-dashed border-purple-500/50 pt-4 mb-6">
          <p className="font-pixel text-xs md:text-sm font-bold text-yellow-300">
            SO... WHAT DO YOU SAY? 👀
          </p>
          <p className="text-purple-400 text-[10px] font-pixel mt-2">
            (Notice: 'NO' button has been permanently purged from system memory. 😂)
          </p>
        </div>

        {/* Only 1 Large Button */}
        <button
          onClick={onFinalAccept}
          className="w-full pixel-btn bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-pixel py-4 px-6 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-widest animate-pulse-glow"
        >
          💖 PRESS START: IT'S A DATE!
        </button>
      </div>
    </div>
  );
};

export default Screen8;
