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
    <div className="start-screen">
      <h2>Welcome, Hunter</h2>
      <p>An evil stalks the night. Enter your name to begin the hunt.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          autoFocus
        />
        <button type="submit">Begin Hunt</button>
      </form>
    </div>
  );
};

export default StartScreen;
