import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const StartPage = () => {
  const { startGame } = useGame();
  const [playerName, setPlayerName] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      startGame(playerName.trim());
    }
  };

  return (
    <div className="start-screen rpg-container">
      
      {}
      <div className="rpg-end-box rpg-start-box">
        
        {}
        <h2 className="rpg-end-title">Aswang Hunter</h2>
        
        <form className="rpg-form" onSubmit={handleStart}>
          
          {}
          <div className="rpg-text-box rpg-start-text">
            <p>Enter your name to begin the hunt:</p>
          </div>
          
          {}
          <input
            className="rpg-input"
            type="text"
            id="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="e.g., Alunsina"
          />
          
          {}
          <button className="rpg-button" type="submit">
            Begin Adventure
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;