import React, { useState, useEffect, useRef } from 'react';

export default function ObstacleGame({ onNext }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER, WON
  const [score, setScore] = useState(0);

  // Game physical constants
  const CANVAS_WIDTH = 640;
  const CANVAS_HEIGHT = 280;
  const GROUND_Y = 220;
  const BOY_X = 80;
  const GOAL_DISTANCE = 1000; // Total distance needed to reach the girl

  const gameRef = useRef({
    distance: 0,
    boyY: GROUND_Y - 40,
    boyVy: 0,
    isJumping: false,
    obstacles: [],
    spawnTimer: 0,
    speed: 4,
  });

  const resetGame = React.useCallback(() => {
    gameRef.current = {
      distance: 0,
      boyY: GROUND_Y - 40,
      boyVy: 0,
      isJumping: false,
      obstacles: [],
      spawnTimer: 0,
      speed: 4.5,
    };
    setScore(0);
  }, []);

  const jump = React.useCallback(() => {
    if (gameState === 'START') {
      setGameState('PLAYING');
      resetGame();
      return;
    }
    if (gameState === 'GAMEOVER') {
      resetGame();
      setGameState('PLAYING');
      return;
    }
    if (gameState === 'PLAYING' && !gameRef.current.isJumping) {
      gameRef.current.boyVy = -11;
      gameRef.current.isJumping = true;
    }
  }, [gameState, resetGame]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, jump]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const loop = () => {
      const state = gameRef.current;

      // Update distance
      state.distance += state.speed * 0.5;
      setScore(Math.floor(state.distance));

      // Check win condition
      if (state.distance >= GOAL_DISTANCE) {
        setGameState('WON');
        return;
      }

      // Boy physics
      state.boyY += state.boyVy;
      state.boyVy += 0.6; // Gravity

      if (state.boyY >= GROUND_Y - 40) {
        state.boyY = GROUND_Y - 40;
        state.boyVy = 0;
        state.isJumping = false;
      }

      // Spawn obstacles
      state.spawnTimer++;
      if (state.spawnTimer > 75 + Math.random() * 40) {
        state.spawnTimer = 0;
        // Obstacle type: 0 = Glitch Spike, 1 = Error Block
        const isTall = Math.random() > 0.5;
        state.obstacles.push({
          x: CANVAS_WIDTH,
          y: isTall ? GROUND_Y - 35 : GROUND_Y - 25,
          w: isTall ? 22 : 28,
          h: isTall ? 35 : 25,
          type: isTall ? 'spike' : 'block',
        });
      }

      // Move obstacles & collision check
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.x -= state.speed;

        // Collision check (Boy bounding box: BOY_X + 6, state.boyY + 4, width 24, height 32)
        const boyBox = {
          x: BOY_X + 6,
          y: state.boyY + 4,
          w: 24,
          h: 32,
        };

        if (
          boyBox.x < obs.x + obs.w &&
          boyBox.x + boyBox.w > obs.x &&
          boyBox.y < obs.y + obs.h &&
          boyBox.y + boyBox.h > obs.y
        ) {
          setGameState('GAMEOVER');
          return;
        }

        if (obs.x + obs.w < 0) {
          state.obstacles.splice(i, 1);
        }
      }

      // RENDER
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Background Grid / Stars
      ctx.fillStyle = '#120224';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Distant stars
      ctx.fillStyle = 'rgba(236, 72, 153, 0.4)';
      for (let s = 0; s < 15; s++) {
        const sx = (s * 45 - state.distance * 0.2) % CANVAS_WIDTH;
        const realSx = sx < 0 ? sx + CANVAS_WIDTH : sx;
        ctx.fillRect(realSx, (s * 17) % 120 + 20, 3, 3);
      }

      // Ground Line
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();

      // Ground pattern
      ctx.fillStyle = '#2e1065';
      ctx.fillRect(0, GROUND_Y + 2, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

      // Grid stripes under ground
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.2)';
      ctx.lineWidth = 1;
      for (let g = 0; g < CANVAS_WIDTH; g += 30) {
        const gx = (g - (state.distance % 30)) % CANVAS_WIDTH;
        ctx.beginPath();
        ctx.moveTo(gx, GROUND_Y);
        ctx.lineTo(gx - 40, CANVAS_HEIGHT);
        ctx.stroke();
      }

      // Draw Goal Girl if near end
      const girlX = CANVAS_WIDTH - (GOAL_DISTANCE - state.distance);
      if (girlX > -50 && girlX < CANVAS_WIDTH + 50) {
        // Girl Pixel Sprite
        ctx.fillStyle = '#ec4899'; // Dress
        ctx.fillRect(girlX, GROUND_Y - 36, 24, 24);
        ctx.fillStyle = '#fbcfe8'; // Face
        ctx.fillRect(girlX + 4, GROUND_Y - 34, 16, 12);
        ctx.fillStyle = '#a855f7'; // Hair
        ctx.fillRect(girlX - 2, GROUND_Y - 40, 28, 10);
        // Floating Heart
        ctx.fillStyle = '#f43f5e';
        ctx.font = '14px sans-serif';
        ctx.fillText('♥', girlX + 6, GROUND_Y - 44);
      }

      // Draw Boy Pixel Sprite
      const bx = BOY_X;
      const by = state.boyY;
      ctx.fillStyle = '#3b82f6'; // Shirt
      ctx.fillRect(bx + 4, by + 12, 24, 18);
      ctx.fillStyle = '#fed7aa'; // Face
      ctx.fillRect(bx + 6, by + 2, 20, 12);
      ctx.fillStyle = '#1e1b4b'; // Hair
      ctx.fillRect(bx + 4, by, 24, 6);
      ctx.fillStyle = '#a855f7'; // Pants
      ctx.fillRect(bx + 6, by + 30, 20, 10);

      // Draw Obstacles
      for (const obs of state.obstacles) {
        if (obs.type === 'spike') {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.h);
          ctx.lineTo(obs.x + obs.w / 2, obs.y);
          ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#fca5a5';
          ctx.stroke();
        } else {
          ctx.fillStyle = '#d946ef';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeStyle = '#fae8ff';
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-2xl mx-auto">
      <div className="w-full bg-slate-950/90 border-2 border-purple-500/80 rounded-xl p-4 md:p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-md text-purple-200 text-center font-mono relative overflow-hidden">

        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>

        {/* Title */}
        <div className="flex items-center justify-between border-b border-purple-500/40 pb-3 mb-4">
          <span className="text-xs md:text-sm font-bold tracking-widest text-purple-400 font-['VT323',monospace]">
            LEVEL 7.5: OBSTACLE COURSE
          </span>
          <span className="text-xs bg-purple-900/60 text-pink-300 px-3 py-1 rounded border border-purple-500/50">
            DIST: {score} / {GOAL_DISTANCE}m
          </span>
        </div>

        {/* Canvas Game Box */}
        <div
          onClick={jump}
          className="relative w-full aspect-[16/7] bg-slate-950 rounded-lg border border-purple-500/50 overflow-hidden cursor-pointer touch-none flex items-center justify-center"
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full object-contain"
          />

          {/* Overlay Screens */}
          {gameState === 'START' && (
            <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-4 z-10">
              <h3 className="text-sm md:text-base font-bold text-pink-400 mb-2 font-['Press_Start_2P',monospace]">
                HELP HIM REACH HER
              </h3>
              <p className="text-xs text-purple-300 mb-4 max-w-md font-['Silkscreen',sans-serif]">
                Dodge obstacles to reach her across the level.
              </p>
              <button
                onClick={jump}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 px-6 rounded shadow-lg border border-pink-400 transform transition active:scale-95 text-xs font-['Press_Start_2P',monospace]"
              >
                START RUN
              </button>
            </div>
          )}

          {gameState === 'GAMEOVER' && (
            <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 z-10">
              <h3 className="text-sm md:text-base font-bold text-red-400 mb-2 font-['Press_Start_2P',monospace]">
                GLITCH DETECTED!
              </h3>
              <p className="text-xs text-purple-300 mb-4 font-['Silkscreen',sans-serif]">
                Don't give up! Time your jumps.
              </p>
              <button
                onClick={jump}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded border border-purple-400 shadow-lg text-xs font-['Press_Start_2P',monospace]"
              >
                RETRY LEVEL
              </button>
            </div>
          )}

          {gameState === 'WON' && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 z-10 animate-fade-in">
              <h3 className="text-sm md:text-lg font-bold text-pink-400 mb-2 font-['Press_Start_2P',monospace]">
                PATH CLEARED!
              </h3>
              <p className="text-xs md:text-sm text-purple-200 mb-5 font-['Silkscreen',sans-serif]">
                You reached her!
              </p>
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-3 px-8 rounded shadow-[0_0_20px_rgba(236,72,153,0.6)] border border-pink-300 text-xs font-['Press_Start_2P',monospace] animate-bounce"
              >
                CONTINUE QUEST →
              </button>
            </div>
          )}
        </div>

        {/* Controls Hint */}
        <div className="mt-3 flex justify-between items-center text-[10px] md:text-xs text-purple-400 font-['VT323',monospace]">
          <span>CONTROLS: SPACEBAR / UP ARROW / TAP SCREEN</span>
          {gameState === 'PLAYING' && (
            <button
              onClick={jump}
              className="bg-purple-800/80 hover:bg-purple-700 text-purple-100 px-4 py-1.5 rounded border border-purple-500 text-xs active:scale-95 font-['Press_Start_2P',monospace]"
            >
              JUMP ▲
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
