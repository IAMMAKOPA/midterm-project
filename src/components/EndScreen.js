import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import storyData from '../data/story.json';

const EndScreen = () => {
  const { playerState, restartGame } = useContext(GameContext);
  const { gameState, currentSceneId } = playerState;

  const endScene = storyData[currentSceneId];
  const isVictory = gameState === 'victory';

  return (
    // 1. Use the main background/font style
    <div className={`end-screen rpg-container`}>
      
      {/* 2. Use the central message box style, conditional on victory/defeat */}
      <div className={`rpg-end-box ${isVictory ? 'rpg-victory-box' : 'rpg-game-over-box'}`}>
        
        {/* 3. Use the title style */}
        <h2 className="rpg-end-title">
          {isVictory ? 'Victory Achieved!' : 'Game Over'}
        </h2>
        
        {/* 4. Use the story text box style for the narrative */}
        <div className="rpg-text-box rpg-end-text">
          <p>{endScene.text}</p>
        </div>
        
        {/* 5. Use the generic RPG button style */}
        <button className="rpg-button" onClick={restartGame}>
          Hunt Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;