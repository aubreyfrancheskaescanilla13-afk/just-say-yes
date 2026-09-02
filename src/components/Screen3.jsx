import React from 'react';

const Screen3 = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full transition-all duration-500 shadow-2xl border border-white/80">
        <div className="text-5xl mb-3 animate-pulse">🎵</div>

        <h2 className="font-handwriting text-4xl md:text-5xl font-bold text-purple-900 mb-2">
          First things first... 🎶💜
        </h2>

        <p className="text-slate-700 text-lg md:text-xl font-medium mb-6">
          We need music for our date.
        </p>

        <div className="bg-purple-100/60 p-4 rounded-2xl border border-purple-200/80 mb-6">
          <p className="font-handwriting text-3xl font-bold text-pink-700 mb-2">
            🎵 Ours — Taylor Swift
          </p>

          <p className="text-slate-600 text-sm md:text-base italic mb-2">
            Because apparently we need a soundtrack now. 😂💕
          </p>

          <p className="font-handwriting text-xl text-purple-800 font-semibold">
            But honestly... this one just feels right. 🥹💜
          </p>
        </div>

        {/* Spotify iFrame Embed */}
        <div className="w-full mb-8 overflow-hidden rounded-2xl shadow-md border border-purple-200">
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/track/0832J336Pjh19S838J36kG?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Taylor Swift - Ours Spotify Embed"
          ></iframe>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          ✨ Continue
        </button>
      </div>
    </div>
  );
};

export default Screen3;
