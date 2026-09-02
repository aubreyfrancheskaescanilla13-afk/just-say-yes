import React, { useMemo } from 'react';

const Background = ({ isVibrant = false }) => {
  // Generate random particles once
  const particles = useMemo(() => {
    const items = ['✨', '✦', '★', '💜', '💗'];
    return Array.from({ length: 14 }, (_, index) => {
      const icon = items[index % items.length];
      const left = Math.floor((index * 7.1) % 100);
      const size = Math.floor((index % 3) * 4 + 12); // 12px to 20px
      const duration = Math.floor((index % 5) * 4 + 12); // 12s to 28s
      const delay = Math.floor((index % 7) * 2); // 0s to 12s
      return { id: index, icon, left, size, duration, delay };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Animated gradient background overlay */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isVibrant
            ? 'bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 animate-pulse'
            : 'bg-romantic-gradient'
        }`}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float opacity-70"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-50px',
          }}
        >
          {p.icon}
        </div>
      ))}

      {/* Glowing background ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-gentle-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Background;
