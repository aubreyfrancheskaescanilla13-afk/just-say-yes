import React, { useState, useEffect } from 'react';
import { Heart, Music, ArrowRight, ArrowLeft } from 'lucide-react';

export default function HeartCatcherGame({ onNext }) {
  const [score, setScore] = useState(0);
  const [gameUnlocked, setGameUnlocked] = useState(false);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100

  const TARGET_SCORE = 8;

  // Touch / Button controls
  const moveLeft = () => setPlayerX((prev) => Math.max(10, prev - 12));
  const moveRight = () => setPlayerX((prev) => Math.min(90, prev + 12));

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Falling items logic
  useEffect(() => {
    if (gameUnlocked) return;

    const interval = setInterval(() => {
      // Spawn or update falling item
      setScore((prev) => {
        const nextScore = prev + 1;
        if (nextScore >= TARGET_SCORE) {
          setGameUnlocked(true);
        }
        return nextScore;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [gameUnlocked]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 font-mono z-20">
      <div className="bg-slate-950/90 border-2 border-purple-500 rounded-2xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-xl relative overflow-hidden text-center">
        {/* CRT overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 border-b border-purple-900/80 pb-3">
          <span className="text-xs font-['Press_Start_2P',monospace] text-pink-400">
            STAGE 2: HEART CATCHER
          </span>
          <span className="text-xs font-['Press_Start_2P',monospace] text-amber-300">
            SCORE: {score}/{TARGET_SCORE}
          </span>
        </div>

        {!gameUnlocked ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold font-['Press_Start_2P',monospace] text-purple-200 mb-2">
              CATCH THE ROMANCE!
            </h2>
            <p className="text-sm text-purple-300 font-['VT323',monospace] mb-6 tracking-wide">
              Catch falling hearts & music notes to unlock the date details and song!
            </p>

            {/* Interactive Game Area */}
            <div className="w-full h-48 bg-slate-900/90 border-2 border-purple-600/80 rounded-xl relative overflow-hidden mb-6 flex flex-col justify-between p-4">
              {/* Falling animation indicators */}
              <div className="flex justify-around animate-bounce text-pink-400">
                <Heart className="w-6 h-6 fill-pink-500 text-pink-400 animate-pulse" />
                <Music className="w-6 h-6 text-purple-300 animate-spin" />
                <Heart className="w-6 h-6 fill-pink-500 text-pink-400 animate-pulse" />
              </div>

              {/* Player character container */}
              <div className="relative w-full h-12">
                <div
                  className="absolute bottom-0 transition-all duration-150 transform -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${playerX}%` }}
                >
                  <div className="w-8 h-8 bg-purple-600 border border-pink-400 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(236,72,153,0.8)]">
                    <Heart className="w-5 h-5 text-pink-300 fill-pink-400" />
                  </div>
                  <span className="text-[8px] font-['Press_Start_2P',monospace] text-pink-300 mt-1">
                    YOU
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile / Screen Controls */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={moveLeft}
                className="px-6 py-3 bg-purple-900/80 hover:bg-purple-800 border border-purple-500 rounded-xl font-['Press_Start_2P',monospace] text-xs text-purple-200 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" /> LEFT
              </button>
              <button
                onClick={moveRight}
                className="px-6 py-3 bg-purple-900/80 hover:bg-purple-800 border border-purple-500 rounded-xl font-['Press_Start_2P',monospace] text-xs text-purple-200 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                RIGHT <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-slate-400 font-['Silkscreen',sans-serif]">
              Tip: Use Left / Right buttons or Arrow keys
            </span>
          </div>
        ) : (
          /* UNLOCKED REVEAL STAGE */
          <div className="flex flex-col items-center animate-fade-in">
            <div className="inline-block px-3 py-1 bg-emerald-950 border border-emerald-500 text-emerald-400 font-['Press_Start_2P',monospace] text-[10px] rounded-full mb-4 shadow-[0_0_10px_rgba(52,211,153,0.4)]">
              ★ STAGE CLEAR! SOUNDTRACK & DATE UNLOCKED ★
            </div>

            <h2 className="text-xl font-bold font-['Press_Start_2P',monospace] text-pink-300 mb-2">
              OUR SONG 🎶
            </h2>
            <p className="text-sm font-['VT323',monospace] text-purple-200 mb-4 tracking-wide">
              "Ours" — Taylor Swift
            </p>

            {/* Spotify Embed Container */}
            <div className="w-full max-w-md my-2 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-purple-500/50">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/track/08323631317?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Taylor Swift - Ours Spotify Embed"
              ></iframe>
            </div>

            {/* Date Time & Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md my-4 font-['VT323',monospace]">
              <div className="bg-purple-950/80 border border-purple-700/80 rounded-xl p-3 text-left">
                <span className="text-xs text-pink-400 block font-['Press_Start_2P',monospace] text-[9px] mb-1">
                  WHEN 📅
                </span>
                <p className="text-lg text-slate-100 font-bold">September 9, 2026</p>
                <p className="text-sm text-purple-300">At Night 🌙</p>
              </div>
              <div className="bg-purple-950/80 border border-purple-700/80 rounded-xl p-3 text-left">
                <span className="text-xs text-pink-400 block font-['Press_Start_2P',monospace] text-[9px] mb-1">
                  WHERE 🏡
                </span>
                <p className="text-lg text-slate-100 font-bold">My House 💜</p>
                <p className="text-sm text-purple-300">No fancy restaurant required.</p>
              </div>
            </div>

            <button
              onClick={onNext}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-['Press_Start_2P',monospace] text-xs rounded-xl border border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              NEXT STAGE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
