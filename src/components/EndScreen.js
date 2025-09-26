import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import storyData from '../data/story.json';

const EndScreen = () => {
  const { playerState, restartGame } = useContext(GameContext);
  const { gameState, currentSceneId } = playerState;

  const endScene = storyData[currentSceneId];
  const isVictory = gameState === 'victory';

  return (
    
    <div className={`end-screen rpg-container`}>
      
      {}
      <div className={`rpg-end-box ${isVictory ? 'rpg-victory-box' : 'rpg-game-over-box'}`}>
        
        {}
        <h2 className="rpg-end-title">
          {isVictory ? 'Victory Achieved!' : 'Game Over'}
        </h2>
        
        {}
        <div className="rpg-text-box rpg-end-text">
          <p>{endScene.text}</p>
        </div>
        
        {}
        <button className="rpg-button" onClick={restartGame}>
          Hunt Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;