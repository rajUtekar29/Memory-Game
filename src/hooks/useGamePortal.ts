import { useEffect } from 'react';
import { gamePortal } from '../utils/gamePortal';
import { useGameStore } from '../store/gameStore';

export const useGamePortal = () => {
  const { score, level, bestScore, coins, cardStyles } = useGameStore();

  // Save game data when important stats change
  useEffect(() => {
    const gameData = {
      score,
      level,
      bestScore,
      coins,
      unlockedStyles: cardStyles.filter(style => style.unlocked).map(style => style.id)
    };
    
    gamePortal.saveGameData(gameData);
  }, [score, level, bestScore, coins, cardStyles]);

  // Show ad on game over
  const showGameOverAd = async () => {
    if (gamePortal.isInitialized() && gamePortal.getEnvironment() !== 'disabled') {
      await gamePortal.showAd();
    }
  };

  return {
    showGameOverAd
  };
};