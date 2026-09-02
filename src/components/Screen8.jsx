import React from 'react';

const Screen8 = ({ foodChoice, onFinalAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80">
        <div className="text-5xl mb-3">💌</div>

        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-6">
          Okay... one last thing. 💜
        </h2>

        {/* Date Recap Summary */}
        <div className="bg-purple-50/90 p-5 rounded-2xl border border-purple-200 text-left mb-6 space-y-2 text-slate-700 font-medium">
          <p className="flex items-center space-x-2">
            <span>📅</span>
            <span><strong className="text-purple-900">Date:</strong> September 9, 2026</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🌙</span>
            <span><strong className="text-purple-900">Time:</strong> Night time</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🏡</span>
            <span><strong className="text-purple-900">Location:</strong> My house</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>🍽️</span>
            <span><strong className="text-purple-900">Food:</strong> {foodChoice || 'Your special choice'}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>✨</span>
            <span><strong className="text-purple-900">Plan:</strong> Movies, games, cuddles, and memories</span>
          </p>
        </div>

        {/* Sincere Message */}
        <div className="mb-8">
          <p className="font-handwriting text-2xl md:text-3xl text-purple-900 font-semibold leading-relaxed mb-3">
            I know this might sound simple...
          </p>
          <p className="font-handwriting text-2xl md:text-3xl text-pink-700 font-bold leading-relaxed">
            but I think spending time with you would make it special. 🥹💜
          </p>
        </div>

        <div className="border-t border-purple-200/60 pt-6 mb-6">
          <p className="font-handwriting text-3xl font-bold text-purple-950">
            So... what do you say? 👀
          </p>
          <p className="text-slate-500 text-xs mt-1">
            (Notice there's no No button anymore. 😂)
          </p>
        </div>

        {/* Only 1 Large Button */}
        <button
          onClick={onFinalAccept}
          className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl md:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse-glow cursor-pointer"
        >
          💖 IT'S A DATE
        </button>
      </div>
    </div>
  );
};

export default Screen8;
