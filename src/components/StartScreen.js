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
    // 1. Use the main background/font style
    <div className="start-screen rpg-container">
      
      {/* 2. Use a central box for the content */}
      <div className="rpg-end-box rpg-start-box">
        
        {/* 3. Use the title style */}
        <h2 className="rpg-end-title">Welcome, Hunter</h2>
        
        {/* 4. Use the text box style for the introduction */}
        <div className="rpg-text-box rpg-start-text">
          <p>An evil stalks the night. Enter your name to begin the hunt.</p>
        </div>
        
        <form className="rpg-form" onSubmit={handleSubmit}>
          
          {/* 5. Input styled for the RPG look */}
          <input
            className="rpg-input"
            type="text"
            placeholder="Your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            autoFocus
          />
          
          {/* 6. Use the generic RPG button style */}
          <button className="rpg-button" type="submit">
            Begin Hunt
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;