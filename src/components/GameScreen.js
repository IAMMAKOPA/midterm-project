import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import storyData from '../data/story.json';
import ChoiceButton from './ChoiceButton';

const GameScreen = () => {
  const { playerState } = useContext(GameContext);
  const { playerName, hp, inventory, currentSceneId } = playerState;

  const currentScene = storyData[currentSceneId];

  
  const availableChoices = currentScene.choices.filter(choice => {
   
    const hasRequiredItem = !choice.requires || inventory.includes(choice.requires);
    
    
    const isNotHidden = !choice.hideIf || !inventory.includes(choice.hideIf);

    return hasRequiredItem && isNotHidden;
  });

  return (
    <div className="game-screen rpg-container">
      
      {}
      <div className="stats-bar rpg-stats-bar">
        <span className="rpg-stat-item"><strong>Hunter:</strong> {playerName}</span>
        {}
        <span className={`rpg-stat-item ${hp < 30 ? 'hp-low' : ''}`}><strong> 💓HP:</strong> {hp}</span>
        <span className="rpg-stat-item"><strong> 🎒Inventory:</strong> {inventory.join(', ') || 'None'}</span>
      </div>

      {}
      <div className="story-text rpg-text-box">
        <p>{currentScene.text}</p>
      </div>

      {}
      <div className="choices-container rpg-choices-container">
        {}
        {availableChoices.map((choice, index) => (
          <ChoiceButton key={index} choice={choice} /> 
        ))}
      </div>
    </div>
  );
};

export default GameScreen;