import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Achievement } from '../types/game';

export const useAchievements = () => {
  const {
    achievements,
    updateAchievement,
    score,
    timeLeft,
    level,
    maxCombo,
    cardStyles
  } = useGameStore();

  const checkAchievements = () => {
    achievements.forEach((achievement) => {
      if (achievement.isUnlocked) return;

      switch (achievement.id) {
        case 'speed_demon': {
          const levelConfig = getLevelConfig(level);
          if (timeLeft >= levelConfig.timeLimit / 2) {
            updateAchievement(achievement.id, {
              isUnlocked: true,
              progress: 1
            });
          }
          break;
        }
        case 'combo_master':
          if (maxCombo >= achievement.requirement) {
            updateAchievement(achievement.id, {
              isUnlocked: true,
              progress: maxCombo
            });
          }
          break;
        case 'perfectionist':
          // This would be checked when level is completed without mistakes
          break;
        case 'collector':
          const unlockedStyles = cardStyles.filter(style => style.unlocked).length;
          if (unlockedStyles === cardStyles.length) {
            updateAchievement(achievement.id, {
              isUnlocked: true,
              progress: unlockedStyles
            });
          }
          break;
      }
    });
  };

  useEffect(() => {
    checkAchievements();
  }, [score, timeLeft, level, maxCombo, cardStyles]);

  return {
    achievements,
    checkAchievements
  };
};