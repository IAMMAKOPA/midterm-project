import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';


const ChoiceButton = ({ choice }) => {
  
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
