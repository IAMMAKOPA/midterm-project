import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

// This component receives a single 'choice' object as a prop.
const ChoiceButton = ({ choice }) => {
  // Use the standard useContext hook to get the makeChoice function
  const { makeChoice } = useContext(GameContext);

  const handleClick = () => {
    makeChoice(choice);
  };

  return (
    <button onClick={handleClick} className="choice-button">
      {choice.text}
    </button>
  );
};

export default ChoiceButton;
