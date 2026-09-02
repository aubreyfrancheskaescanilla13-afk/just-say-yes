import React, { useState } from 'react';
import Background from './components/Background';
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

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [foodChoice, setFoodChoice] = useState('');

  const nextScreen = () => {
    setCurrentScreen((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 antialiased overflow-x-hidden">
      {/* Background layer */}
      <Background isVibrant={currentScreen === 2 || currentScreen === 10} />

      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center">
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
      </main>
    </div>
  );
}

export default App;
