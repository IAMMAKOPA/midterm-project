import React, { useState } from 'react';
import { useGame } from '../context/GameContext'; // If you're using useGame here

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
    <div>
      <h1>Aswang Hunter</h1>
      <form onSubmit={handleStart}>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          id="name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="e.g., Alunsina"
        />
        <button type="submit">Begin Adventure</button>
      </form>
    </div>
  );
};

export default StartPage;