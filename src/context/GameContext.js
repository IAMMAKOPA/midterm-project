import React, { createContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import storyData from '../data/story.json';


export const GameContext = createContext();

const initialPlayerState = {
  playerName: '',
  hp: 100,
  inventory: [],
  currentSceneId: 'start',
  gameState: 'start', 
};

const GameProvider = ({ children }) => {
  const [playerState, setPlayerState] = useLocalStorage('aswangHunterState', initialPlayerState);

  const startGame = (name) => {
    setPlayerState({
      ...initialPlayerState,
      playerName: name,
      gameState: 'playing',
    });
  };

  const makeChoice = useCallback((choice) => {
    setPlayerState(currentState => {
      
      const nextSceneId = choice.to;
      const nextScene = storyData[nextSceneId];

      let newHp = currentState.hp;
      let newInventory = [...currentState.inventory];

      if (nextScene.onArrive) {
        if (nextScene.onArrive.addItem && !newInventory.includes(nextScene.onArrive.addItem)) {
          newInventory.push(nextScene.onArrive.addItem);
        }
        if (nextScene.onArrive.takeDamage) {
          newHp -= nextScene.onArrive.takeDamage;
        }
      }

      if (newHp <= 0) {
        // Redirect to the dedicated HP game over scene
        const hpGameOverScene = storyData['gameOver_hp'];
        return {
          ...currentState,
          hp: 0,
          inventory: newInventory,
          currentSceneId: 'gameOver_hp',
          gameState: hpGameOverScene.isEnding ? 'gameOver' : 'playing',
        };
      }

      let newGameState = 'playing'; 
      if (nextScene.isEnding) {
        newGameState = nextSceneId.includes('good') ? 'victory' : 'gameOver';
      }

      return {
        ...currentState,
        hp: newHp,
        inventory: newInventory,
        currentSceneId: nextSceneId,
        gameState: newGameState,
      };
    });
  }, [setPlayerState]);

  const restartGame = () => {
    setPlayerState(initialPlayerState);
  };

  return (
    <GameContext.Provider value={{ playerState, startGame, makeChoice, restartGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
