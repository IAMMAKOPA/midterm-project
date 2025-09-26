import React, { useContext } from 'react';
import { GameContext } from './context/GameContext';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import './App.css';

function App() {
  const { playerState } = useContext(GameContext);

  const renderScreen = () => {
    switch (playerState.gameState) {
      case 'playing':
        return <GameScreen />;
      case 'gameOver':
      case 'victory':
        return <EndScreen />;
      case 'start':
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Aswang Hunter</h1>
      </header>
      <main className="container">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
