import React from 'react';
import { Film, Gamepad2, Heart, Moon } from 'lucide-react';

const Screen7 = ({ onNext }) => {
  const activities = [
    {
      id: 'movies',
      icon: <Film className="w-6 h-6 text-pink-400" />,
      title: 'Watch Movies',
      description: 'You pick some. I pick some. We pretend we\'ll agree.'
    },
    {
      id: 'games',
      icon: <Gamepad2 className="w-6 h-6 text-yellow-400" />,
      title: 'Play Online Games',
      description: 'Just don\'t blame me if I win.'
    },
    {
      id: 'cuddle',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'Cuddle',
      description: 'This one doesn\'t need much explanation.'
    },
    {
      id: 'sleep',
      icon: <Moon className="w-6 h-6 text-purple-400" />,
      title: 'Sleep',
      description: 'After all that... we\'ll probably be tired anyway.'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-2xl w-full transition-all duration-300">
        <div className="font-pixel text-[10px] text-pink-400 bg-pink-950/80 px-3 py-1 rounded border border-pink-500 inline-block mb-3 tracking-widest uppercase">
          QUEST ACTIVITIES MENU
        </div>

        <h2 className="font-pixel text-base md:text-lg font-bold text-pink-400 mb-2 leading-relaxed">
          HERE'S WHAT I HAVE IN MIND FOR US...
        </h2>

        <p className="text-purple-300 text-xs font-vt tracking-wider mb-6">
          SELECTABLE CO-OP MINI-GAMES & QUEST BRANCHES:
        </p>

        {/* Desktop: 2x2 grid, Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-purple-950/80 hover:bg-purple-900/90 p-4 rounded-lg border-2 border-purple-500/70 hover:border-pink-400 transition-all duration-200 shadow-md group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded bg-purple-900 border border-purple-600 group-hover:border-pink-400">
                  {act.icon}
                </div>
              </div>
              <h3 className="font-pixel text-xs font-bold text-yellow-300 mb-2">
                {act.title}
              </h3>
              <p className="text-purple-200 text-xs font-vt leading-relaxed">
                {act.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="pixel-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
        >
          CONTINUE QUEST →
        </button>
      </div>
    </div>
  );
};

export default Screen7;
