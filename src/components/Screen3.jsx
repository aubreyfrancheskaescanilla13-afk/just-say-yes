import React from 'react';

const Screen3 = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center crt-scanlines">
      <div className="game-card rounded-xl p-6 md:p-10 max-w-lg w-full transition-all duration-300">
        <div className="text-5xl mb-3 animate-pulse">📻🎶</div>

        <div className="font-pixel text-[10px] text-green-400 bg-green-950/80 px-3 py-1 rounded border border-green-500 inline-block mb-3 tracking-widest uppercase">
          AUDIO QUEST OBJECTIVE
        </div>

        <h2 className="font-pixel text-lg md:text-xl font-bold text-pink-400 mb-2">
          EQUIP SOUNDTRACK 🎶💜
        </h2>

        <p className="text-purple-300 text-sm md:text-base font-vt tracking-wider mb-6">
          Every epic game adventure requires background music.
        </p>

        <div className="bg-purple-950/80 p-4 rounded-lg border border-purple-500/50 mb-6 text-left">
          <div className="font-pixel text-xs text-yellow-300 mb-2 flex items-center gap-2">
            <span>💿 TRACK SELECTED:</span>
          </div>
          <p className="font-silkscreen text-base md:text-lg font-bold text-pink-300 mb-2">
            🎵 Ours — Taylor Swift
          </p>

          <p className="text-purple-300 text-xs font-vt italic mb-2">
            "Because apparently our quest needs a theme song now. 😂💕"
          </p>

          <p className="font-pixel text-xs text-purple-200">
            Status: Perfect fit for this quest. 🥹💜
          </p>
        </div>

        {/* Spotify iFrame Embed */}
        <div className="w-full mb-8 overflow-hidden rounded-xl border-2 border-purple-500/80 shadow-2xl">
          <iframe
            style={{ borderRadius: '8px' }}
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
          className="pixel-btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel px-6 py-4 rounded-lg text-xs md:text-sm cursor-pointer uppercase tracking-wider"
        >
          ✨ CONTINUE QUEST →
        </button>
      </div>
    </div>
  );
};

export default Screen3;
