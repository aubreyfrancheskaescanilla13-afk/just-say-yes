import React, { useState } from 'react';
import { Play, CheckCircle2, Lock, Sparkles, MapPin } from 'lucide-react';

export default function WorldMapScreen({ currentLevel, unlockedLevel, onSelectLevel, onStartLevel }) {
  const [selectedNode, setSelectedNode] = useState(currentLevel);

  const stops = [
    { num: 1, id: 'prompt', label: '1. SYSTEM PROMPT', desc: 'The initial question. Choose wisely!' },
    { num: 2, id: 'yes', label: '2. QUEST ACCEPTED', desc: 'I knew it! Time to celebrate.' },
    { num: 3, id: 'song', label: '3. OUR SONG', desc: 'Setting up the date soundtrack.' },
    { num: 4, id: 'when', label: '4. WHEN', desc: 'Date schedule reveal.' },
    { num: 5, id: 'where', label: '5. WHERE', desc: 'Location coordinates revealed.' },
    { num: 6, id: 'food', label: '6. FOOD SELECTION', desc: 'Custom menu request input.' },
    { num: 7, id: 'quests', label: '7. DATE QUESTS', desc: 'Movies, games, cuddles & sleep.' },
    { num: 8, id: 'runner', label: '8. OBSTACLE RUNNER', desc: 'Avoid glitches to reach her!' },
    { num: 9, id: 'final', label: '9. SWEET MESSAGE', desc: 'A sincere personal message.' },
    { num: 10, id: 'date', label: '10. IT\'S A DATE!', desc: 'Final celebration destination.' },
  ];

  const activeStop = stops.find((s) => s.num === selectedNode) || stops[0];
  const isLocked = selectedNode > unlockedLevel;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 z-20 font-mono">
      <div className="bg-slate-950/95 border-2 border-purple-500 rounded-2xl p-4 md:p-6 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-xl relative overflow-hidden">
        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-purple-900/80 gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-400 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 font-['Press_Start_2P',monospace]">
              WORLD MAP
            </h1>
          </div>
          <div className="text-xs font-['Silkscreen',sans-serif] text-purple-300 bg-purple-950/80 border border-purple-800/80 px-3 py-1.5 rounded-full">
            PROGRESS: STAGE {unlockedLevel}/10
          </div>
        </div>

        {/* Map Grid / Path Layout */}
        <div className="relative py-8 px-2 md:px-6 bg-slate-900/80 rounded-xl border border-purple-900/50 mb-6">
          {/* Overworld Grid background lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b0764_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

          {/* Connected Path Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 relative z-10">
            {stops.map((stop) => {
              const isBoyHere = currentLevel === stop.num;
              const isGirlHere = stop.num === 10;
              const stopLocked = stop.num > unlockedLevel;
              const stopCompleted = stop.num < unlockedLevel;
              const isSelected = selectedNode === stop.num;

              return (
                <button
                  key={stop.num}
                  onClick={() => setSelectedNode(stop.num)}
                  className={`relative p-3 rounded-xl border-2 flex flex-col items-center justify-between min-h-[100px] transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-pink-400 bg-purple-900/60 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                      : stopLocked
                      ? 'border-slate-800 bg-slate-950/80 opacity-50'
                      : 'border-purple-600/80 bg-slate-950/90 hover:border-purple-400 hover:bg-purple-950/50'
                  }`}
                >
                  {/* Boy Sprite Overlay if at this level */}
                  {isBoyHere && (
                    <div className="absolute -top-3 left-2 z-20 flex flex-col items-center">
                      <div className="w-6 h-6 bg-blue-600 border border-blue-300 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.9)] animate-bounce flex flex-col items-center justify-between p-0.5">
                        <div className="w-full h-1 bg-slate-950"></div>
                        <div className="w-2 h-1 bg-amber-200"></div>
                        <div className="w-full h-1.5 bg-blue-500"></div>
                      </div>
                      <span className="text-[7px] font-bold text-blue-300 font-['Press_Start_2P',monospace] bg-slate-950/90 px-1 rounded border border-blue-500/50">
                        BOY
                      </span>
                    </div>
                  )}

                  {/* Girl Sprite Overlay if at Stop 10 */}
                  {isGirlHere && (
                    <div className="absolute -top-3 right-2 z-20 flex flex-col items-center">
                      <div className="w-6 h-6 bg-pink-600 border border-pink-300 rounded-sm shadow-[0_0_10px_rgba(236,72,153,0.9)] flex flex-col items-center justify-between p-0.5">
                        <div className="w-full h-1 bg-purple-900"></div>
                        <div className="w-2 h-1 bg-pink-200"></div>
                        <div className="w-full h-1.5 bg-pink-500"></div>
                      </div>
                      <span className="text-[7px] font-bold text-pink-300 font-['Press_Start_2P',monospace] bg-slate-950/90 px-1 rounded border border-pink-500/50">
                        GIRL
                      </span>
                    </div>
                  )}

                  {/* Level Number Badge */}
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-['Press_Start_2P',monospace] text-purple-300">
                      LVL {stop.num}
                    </span>
                    {stopCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : stopLocked ? (
                      <Lock className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
                    )}
                  </div>

                  {/* Level Label */}
                  <span className="text-[11px] font-['VT323',monospace] tracking-wider text-slate-200 text-center line-clamp-2 my-auto">
                    {stop.label}
                  </span>

                  {/* Node Status Dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1 ${
                      stopCompleted
                        ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                        : isBoyHere
                        ? 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.9)] animate-ping'
                        : stopLocked
                        ? 'bg-slate-700'
                        : 'bg-purple-400'
                    }`}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="bg-slate-900/90 border border-purple-800/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-['Press_Start_2P',monospace] text-pink-400">
                STAGE {activeStop.num}
              </span>
              <span className="text-xs text-purple-300 font-['Silkscreen',sans-serif]">
                — {activeStop.label}
              </span>
            </div>
            <p className="text-sm font-['VT323',monospace] text-slate-300 tracking-wide">
              {activeStop.desc}
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center justify-end">
            <button
              onClick={() => {
                if (!isLocked) {
                  onSelectLevel(selectedNode);
                  onStartLevel();
                }
              }}
              disabled={isLocked}
              className={`w-full md:w-auto px-6 py-3 rounded-xl font-['Press_Start_2P',monospace] text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                isLocked
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white border border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer hover:scale-105 active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              {isLocked ? 'LOCKED' : `ENTER STAGE ${selectedNode}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
