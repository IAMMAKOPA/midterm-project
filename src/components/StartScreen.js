import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';

const StartScreen = () => {
  const [playerName, setPlayerName] = useState('');
  const { startGame } = useContext(GameContext);

  const handleSubmit = (e) => {
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
        <h2 className="rpg-end-title">Welcome, Hunter</h2>
        
        {}
        <div className="rpg-text-box rpg-start-text">
          <p>An evil stalks the night. Enter your name to begin the hunt.</p>
        </div>
        
        <form className="rpg-form" onSubmit={handleSubmit}>
          
          {}
          <input
            className="rpg-input"
            type="text"
            placeholder="Your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            autoFocus
          />
          
          {}
          <button className="rpg-button" type="submit">
            Begin Hunt
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;