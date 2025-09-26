import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import storyData from '../data/story.json';
import ChoiceButton from './ChoiceButton';

const GameScreen = () => {
  const { playerState } = useContext(GameContext);
  const { playerName, hp, inventory, currentSceneId } = playerState;

  const currentScene = storyData[currentSceneId];

  // Filter choices based on the player's inventory and the rules in story.json
  const availableChoices = currentScene.choices.filter(choice => {
    // Condition 1: If a choice REQUIRES an item, the player must have it.
    const hasRequiredItem = !choice.requires || inventory.includes(choice.requires);
    
    // Condition 2: If a choice should be HIDDEN by an item, the player must NOT have it.
    const isNotHidden = !choice.hideIf || !inventory.includes(choice.hideIf);

    // A choice is only available if both conditions are true
    return hasRequiredItem && isNotHidden;
  });

  return (
    // The main container now looks like a game screen in the woods
    <div className="game-screen rpg-container">
      
      {/* Top HUD/Stats Bar - styled like a classic RPG overlay */}
      <div className="stats-bar rpg-stats-bar">
        <span className="rpg-stat-item"><strong>Hunter:</strong> {playerName}</span>
        {/* HP styling remains, but is now inside the RPG bar style */}
        <span className={`rpg-stat-item ${hp < 30 ? 'hp-low' : ''}`}><strong> 💓HP:</strong> {hp}</span>
        <span className="rpg-stat-item"><strong> 🎒Inventory:</strong> {inventory.join(', ') || 'None'}</span>
      </div>

      {/* The main story text box - styled like a classic RPG Maker message box */}
      <div className="story-text rpg-text-box">
        <p>{currentScene.text}</p>
      </div>

      {/* Choices Container - positioned and styled for RPG menus */}
      <div className="choices-container rpg-choices-container">
        {/* We now map over the *filtered* list of choices */}
        {availableChoices.map((choice, index) => (
          // ChoiceButton would also need a class like 'rpg-choice-button' inside its component
          <ChoiceButton key={index} choice={choice} /> 
        ))}
      </div>
    </div>
  );
};

export default GameScreen;