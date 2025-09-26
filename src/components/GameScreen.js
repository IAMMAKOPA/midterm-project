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
    <div className="game-screen">
      <div className="stats-bar">
        <span><strong>Hunter:</strong> {playerName}</span>
        <span className={hp < 30 ? 'hp-low' : ''}><strong>HP:</strong> {hp}</span>
        <span><strong>Inventory:</strong> {inventory.join(', ') || 'None'}</span>
      </div>

      <div className="story-text">
        <p>{currentScene.text}</p>
      </div>

      <div className="choices-container">
        {/* We now map over the *filtered* list of choices */}
        {availableChoices.map((choice, index) => (
          <ChoiceButton key={index} choice={choice} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
