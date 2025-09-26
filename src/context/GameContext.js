import React, { createContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import storyData from '../data/story.json';

// Export the context so other components can use it
export const GameContext = createContext();

// Define the default state for a new game
const initialPlayerState = {
  playerName: '',
  hp: 100,
  inventory: [],
  currentSceneId: 'start',
  gameState: 'start', // 'start', 'playing', 'gameOver', 'victory'
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
      // 1. Get the ID of the next scene from the choice
      const nextSceneId = choice.to;
      const nextScene = storyData[nextSceneId];

      let newHp = currentState.hp;
      let newInventory = [...currentState.inventory];

      // 2. Apply effects from the *new* scene's onArrive block
      if (nextScene.onArrive) {
        if (nextScene.onArrive.addItem && !newInventory.includes(nextScene.onArrive.addItem)) {
          newInventory.push(nextScene.onArrive.addItem);
        }
        if (nextScene.onArrive.takeDamage) {
          newHp -= nextScene.onArrive.takeDamage;
        }
      }

      // 3. Check for HP-loss game over condition
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

      // 4. Check if the new scene is an ending
      let newGameState = 'playing'; // Default to 'playing'
      if (nextScene.isEnding) {
        // Determine if it's a victory or game over based on the scene ID
        newGameState = nextSceneId.includes('good') ? 'victory' : 'gameOver';
      }

      // 5. Update the state with all the new information
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
