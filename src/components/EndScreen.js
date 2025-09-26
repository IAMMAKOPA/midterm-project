import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import storyData from '../data/story.json';

const EndScreen = () => {
  const { playerState, restartGame } = useContext(GameContext);
  const { gameState, currentSceneId } = playerState;

  const endScene = storyData[currentSceneId];
  const isVictory = gameState === 'victory';

  return (
    <div className={`end-screen ${isVictory ? 'victory' : 'game-over'}`}>
      <h2>{isVictory ? 'Victory!' : 'The Hunt is Over'}</h2>
      <p className="story-text">{endScene.text}</p>
      <button onClick={restartGame}>Hunt Again</button>
    </div>
  );
};

export default EndScreen;
