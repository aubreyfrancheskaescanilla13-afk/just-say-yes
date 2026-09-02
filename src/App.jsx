import React, { useState } from 'react';
import Background from './components/Background';
import WorldMapScreen from './components/WorldMapScreen';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import Screen4 from './components/Screen4';
import Screen5 from './components/Screen5';
import Screen6 from './components/Screen6';
import Screen7 from './components/Screen7';
import ObstacleGame from './components/ObstacleGame';
import Screen8 from './components/Screen8';
import Screen9 from './components/Screen9';
import { Map, Gamepad2 } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [viewMode, setViewMode] = useState('stage'); // 'map' or 'stage'
  const [foodChoice, setFoodChoice] = useState('');

  const nextScreen = () => {
    const nextLevel = currentScreen + 1;
    if (nextLevel <= 10) {
      if (nextLevel > unlockedLevel) {
        setUnlockedLevel(nextLevel);
      }
      setCurrentScreen(nextLevel);
      // Return to map screen between stages so player sees progress on the map
      setViewMode('map');
    }
  };

  const handleSelectLevelFromMap = (lvl) => {
    setCurrentScreen(lvl);
  };

  const handleStartLevelFromMap = () => {
    setViewMode('stage');
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 antialiased overflow-x-hidden flex flex-col">
      {/* Background layer */}
      <Background isVibrant={currentScreen === 2 || currentScreen === 10} />

      {/* Top Header Navigation */}
      <header className="relative z-30 w-full max-w-4xl mx-auto px-4 pt-4 flex justify-between items-center font-mono">
        <div className="flex items-center gap-2 bg-slate-950/80 border border-purple-500/50 rounded-lg px-3 py-1.5 backdrop-blur-md">
          <Gamepad2 className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-['Press_Start_2P',monospace] text-purple-300">
            {viewMode === 'map' ? 'MAP VIEW' : `STAGE ${currentScreen}`}
          </span>
        </div>

        <button
          onClick={() => setViewMode((prev) => (prev === 'map' ? 'stage' : 'map'))}
          className="flex items-center gap-2 bg-purple-900/80 hover:bg-purple-800 border border-purple-400/80 text-purple-100 rounded-lg px-3 py-1.5 backdrop-blur-md transition-all duration-300 cursor-pointer text-xs font-['Press_Start_2P',monospace] hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
        >
          <Map className="w-4 h-4 text-pink-400" />
          {viewMode === 'map' ? 'RESUME GAME' : 'WORLD MAP'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-4">
        {viewMode === 'map' ? (
          <WorldMapScreen
            currentLevel={currentScreen}
            unlockedLevel={unlockedLevel}
            onSelectLevel={handleSelectLevelFromMap}
            onStartLevel={handleStartLevelFromMap}
          />
        ) : (
          <>
            {currentScreen === 1 && <Screen1 onAccept={nextScreen} />}
            {currentScreen === 2 && <Screen2 onNext={nextScreen} />}
            {currentScreen === 3 && <Screen3 onNext={nextScreen} />}
            {currentScreen === 4 && <Screen4 onNext={nextScreen} />}
            {currentScreen === 5 && <Screen5 onNext={nextScreen} />}
            {currentScreen === 6 && (
              <Screen6
                foodChoice={foodChoice}
                setFoodChoice={setFoodChoice}
                onNext={nextScreen}
              />
            )}
            {currentScreen === 7 && <Screen7 onNext={nextScreen} />}
            {currentScreen === 8 && <ObstacleGame onNext={nextScreen} />}
            {currentScreen === 9 && (
              <Screen8 foodChoice={foodChoice} onFinalAccept={nextScreen} />
            )}
            {currentScreen === 10 && <Screen9 foodChoice={foodChoice} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
