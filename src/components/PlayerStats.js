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
    // Use the main background/font style
    <div className="start-screen rpg-container">
      
      {/* Use a central box for the content to match the other screens */}
      <div className="rpg-end-box rpg-start-box">
        
        {/* Use the title style. Changed from h1 to h2 for consistency. */}
        <h2 className="rpg-end-title">Aswang Hunter</h2>
        
        <form className="rpg-form" onSubmit={handleStart}>
          
          {/* Use the text box style for the prompt to match other components */}
          <div className="rpg-text-box rpg-start-text">
            <p>Enter your name to begin the hunt:</p>
          </div>
          
          {/* Input styled for the RPG look */}
          <input
            className="rpg-input"
            type="text"
            id="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="e.g., Alunsina"
          />
          
          {/* Use the generic RPG button style */}
          <button className="rpg-button" type="submit">
            Begin Adventure
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartPage;