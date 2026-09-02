import React, { useState } from 'react';
import { Film, Gamepad, Heart, Moon, ArrowRight, Sparkles } from 'lucide-react';

const INITIAL_CARDS = [
  { id: 1, type: 'movies', label: 'Watch Movies', icon: Film, desc: 'You pick some, I pick some' },
  { id: 2, type: 'games', label: 'Play Games', icon: Gamepad, desc: 'Don\'t blame me if I win 👀' },
  { id: 3, type: 'cuddle', label: 'Cuddle', icon: Heart, desc: 'Self-explanatory 💜' },
  { id: 4, type: 'sleep', label: 'Sleep', icon: Moon, desc: 'After all that energy 💤' },
  { id: 5, type: 'movies', label: 'Watch Movies', icon: Film, desc: 'You pick some, I pick some' },
  { id: 6, type: 'games', label: 'Play Games', icon: Gamepad, desc: 'Don\'t blame me if I win 👀' },
  { id: 7, type: 'cuddle', label: 'Cuddle', icon: Heart, desc: 'Self-explanatory 💜' },
  { id: 8, type: 'sleep', label: 'Sleep', icon: Moon, desc: 'After all that energy 💤' },
];

export default function MemoryMatchGame({ onNext }) {
  const [cards] = useState(() => [...INITIAL_CARDS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].type)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].type === cards[secondIndex].type) {
        setMatched((prev) => [...prev, cards[firstIndex].type]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isGameComplete = matched.length === 4;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 font-mono z-20">
      <div className="bg-slate-950/90 border-2 border-purple-500 rounded-2xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-xl relative overflow-hidden text-center">
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 border-b border-purple-900/80 pb-3">
          <span className="text-xs font-['Press_Start_2P',monospace] text-pink-400">
            STAGE 3: ACTIVITY MEMORY MATCH
          </span>
          <span className="text-xs font-['Press_Start_2P',monospace] text-amber-300">
            MATCHES: {matched.length}/4
          </span>
        </div>

        <h2 className="text-lg font-bold font-['Press_Start_2P',monospace] text-purple-200 mb-2">
          WHAT WE'LL DO ON OUR DATE
        </h2>
        <p className="text-sm font-['VT323',monospace] text-purple-300 mb-6 tracking-wide">
          Match pairs of pixel cards to unlock our date night activities agenda!
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(card.type);
            const Icon = card.icon;

            return (
              <button
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`h-24 md:h-28 rounded-xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-2 relative ${
                  isFlipped
                    ? 'border-pink-400 bg-purple-900/80 shadow-[0_0_15px_rgba(236,72,153,0.5)] rotate-y-180'
                    : 'border-purple-600/80 bg-slate-900 hover:border-purple-400 hover:scale-105'
                }`}
              >
                {isFlipped ? (
                  <>
                    <Icon className="w-6 h-6 text-pink-400 mb-1" />
                    <span className="text-[10px] font-['Press_Start_2P',monospace] text-purple-200 text-center leading-tight">
                      {card.label}
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-5 h-5 text-purple-400/80 mb-1" />
                    <span className="text-[9px] font-['Press_Start_2P',monospace] text-purple-400/60">
                      ?
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Activities Summary once complete */}
        {isGameComplete && (
          <div className="bg-purple-950/90 border border-emerald-500/80 rounded-xl p-4 mb-6 animate-fade-in text-left">
            <div className="text-center mb-3">
              <span className="inline-block px-3 py-1 bg-emerald-900 text-emerald-300 font-['Press_Start_2P',monospace] text-[10px] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                ★ STAGE CLEAR! ACTIVITIES UNLOCKED ★
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-['VT323',monospace]">
              <div className="bg-slate-900/80 border border-purple-800 p-2 rounded-lg">
                <span className="text-pink-400 font-bold block">🎬 MOVIES</span> You pick, I pick. We pretend to agree.
              </div>
              <div className="bg-slate-900/80 border border-purple-800 p-2 rounded-lg">
                <span className="text-pink-400 font-bold block">🎮 ONLINE GAMES</span> Winner gets bragging rights.
              </div>
              <div className="bg-slate-900/80 border border-purple-800 p-2 rounded-lg">
                <span className="text-pink-400 font-bold block">🤍 CUDDLES</span> Pure comfort & cozy vibes.
              </div>
              <div className="bg-slate-900/80 border border-purple-800 p-2 rounded-lg">
                <span className="text-pink-400 font-bold block">💤 SLEEP</span> After a full night of fun.
              </div>
            </div>
          </div>
        )}

        {isGameComplete && (
          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-['Press_Start_2P',monospace] text-xs rounded-xl border border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            NEXT STAGE <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
