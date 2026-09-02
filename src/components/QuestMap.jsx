import React from 'react';

export default function QuestMap({ currentScreen }) {
  const totalScreens = 10;

  const stops = [
    { num: 1, label: 'START' },
    { num: 2, label: 'YES' },
    { num: 3, label: 'SONG' },
    { num: 4, label: 'WHEN' },
    { num: 5, label: 'WHERE' },
    { num: 6, label: 'FOOD' },
    { num: 7, label: 'QUESTS' },
    { num: 8, label: 'RUNNER' },
    { num: 9, label: 'FINAL' },
    { num: 10, label: 'DATE' },
  ];

  // Calculate percentage along path (0% at stop 1, 100% at stop 10)
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentScreen - 1) / (totalScreens - 1)) * 100)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4 pb-2 z-20">
      <div className="bg-slate-950/90 border-2 border-purple-500/80 rounded-xl p-3 md:p-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md relative overflow-hidden font-mono">
        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>

        {/* Map Header */}
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-purple-400 font-['VT323',monospace]">
            QUEST MAP — PROGRESS: {Math.round(progressPercent)}%
          </span>
          <span className="text-[10px] md:text-xs text-pink-300 font-['Silkscreen',sans-serif]">
            {currentScreen === 10 ? 'REACHED HER!' : 'DESTINATION: HER'}
          </span>
        </div>

        {/* Map Track Container */}
        <div className="relative my-6 px-4">
          {/* Base Track Line */}
          <div className="h-2 w-full bg-slate-800 rounded-full border border-purple-900/60 relative">
            {/* Active Filled Progress Line */}
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Stops along the track */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
            {stops.map((stop) => {
              const isPassed = stop.num <= currentScreen;
              const isCurrent = stop.num === currentScreen;

              return (
                <div key={stop.num} className="relative flex flex-col items-center">
                  {/* Stop Node */}
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-pink-500 border-white scale-125 shadow-[0_0_12px_rgba(236,72,153,0.9)]'
                        : isPassed
                        ? 'bg-purple-600 border-pink-400'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    <span className="text-[8px] md:text-[9px] font-bold text-white font-['Press_Start_2P',monospace]">
                      {stop.num}
                    </span>
                  </div>

                  {/* Stop Label */}
                  <span
                    className={`absolute top-6 text-[8px] md:text-[9px] font-['VT323',monospace] tracking-wider whitespace-nowrap ${
                      isCurrent
                        ? 'text-pink-300 font-bold scale-110'
                        : isPassed
                        ? 'text-purple-300'
                        : 'text-slate-600'
                    }`}
                  >
                    {stop.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Boy Avatar */}
          <div
            className="absolute -top-7 transition-all duration-700 ease-out z-20 pointer-events-none"
            style={{
              left: `calc(${progressPercent}% + 16px - ${(progressPercent / 100) * 32}px)`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Boy Sprite Representation */}
              <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-600 rounded-sm border border-blue-300 flex flex-col items-center justify-between p-0.5 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-bounce">
                <div className="w-full h-1.5 bg-slate-950 rounded-xs"></div>
                <div className="w-3 h-2 bg-amber-200 rounded-xs"></div>
                <div className="w-full h-2 bg-blue-500"></div>
              </div>
              <span className="text-[8px] font-bold text-blue-300 font-['Press_Start_2P',monospace] mt-0.5">
                BOY
              </span>
            </div>
          </div>

          {/* Girl Avatar (Stationed at Stop 10 at the end of track) */}
          <div className="absolute right-2 -top-7 z-20 pointer-events-none">
            <div className="relative flex flex-col items-center">
              {/* Floating Heart if Boy reached Girl */}
              {currentScreen === 10 && (
                <span className="absolute -top-4 text-xs animate-ping text-pink-400">
                  ♥
                </span>
              )}
              {/* Girl Sprite Representation */}
              <div className="w-6 h-6 md:w-7 md:h-7 bg-pink-600 rounded-sm border border-pink-300 flex flex-col items-center justify-between p-0.5 shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                <div className="w-full h-1.5 bg-purple-900 rounded-xs"></div>
                <div className="w-3 h-2 bg-pink-200 rounded-xs"></div>
                <div className="w-full h-2 bg-pink-500"></div>
              </div>
              <span className="text-[8px] font-bold text-pink-300 font-['Press_Start_2P',monospace] mt-0.5">
                GIRL
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
