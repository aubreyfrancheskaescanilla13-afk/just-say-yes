import React from 'react';
import { Film, Gamepad2, Heart, Moon } from 'lucide-react';

const Screen7 = ({ onNext }) => {
  const activities = [
    {
      id: 'movies',
      icon: <Film className="w-8 h-8 text-pink-500" />,
      emoji: '🎬',
      title: 'Watch Movies',
      description: 'You pick some. I pick some. We pretend we\'ll agree. 😂'
    },
    {
      id: 'games',
      icon: <Gamepad2 className="w-8 h-8 text-purple-500" />,
      emoji: '🎮',
      title: 'Play Online Games',
      description: 'Just don\'t blame me if I win. 👀😂'
    },
    {
      id: 'cuddle',
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      emoji: '🤍',
      title: 'Cuddle',
      description: 'This one doesn\'t need much explanation. 🥹💜'
    },
    {
      id: 'sleep',
      icon: <Moon className="w-8 h-8 text-indigo-500" />,
      emoji: '💤',
      title: 'Sleep',
      description: 'After all that... we\'ll probably be tired anyway. 😂💕'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-6 md:p-10 max-w-2xl w-full transition-all duration-500 shadow-2xl border border-white/80">
        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-2">
          Here's what I have in mind for us... 💕
        </h2>

        <p className="text-slate-600 text-sm md:text-base font-medium mb-8">
          A full schedule of high-quality quality time.
        </p>

        {/* Desktop: 2x2 grid, Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 text-left">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-white/80 hover:bg-white p-5 rounded-2xl border border-pink-200/80 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{act.emoji}</span>
                  <div className="p-2 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    {act.icon}
                  </div>
                </div>
                <h3 className="font-handwriting text-2xl font-bold text-purple-950 mb-1">
                  {act.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Continue 💕
        </button>
      </div>
    </div>
  );
};

export default Screen7;
