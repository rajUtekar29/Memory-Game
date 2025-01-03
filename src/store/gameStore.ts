import { create } from 'zustand';
import { GameState } from '../types/game';
import { createDeck, INITIAL_STYLES } from '../utils/gameUtils';
import { INITIAL_POWERUPS } from '../utils/powerUps';
import { INITIAL_ACHIEVEMENTS } from '../utils/achievements';

const initialState: GameState = {
  score: 0,
  timeLeft: 120,
  cards: createDeck(8),
  isGameOver: false,
  bestScore: 0,
  level: 1,
  coins: 0,
  selectedStyle: 'default',
  cardStyles: INITIAL_STYLES,
  powerUps: INITIAL_POWERUPS,
  achievements: INITIAL_ACHIEVEMENTS,
  comboCount: 0,
  maxCombo: 0,
  isTimeFrozen: false,
  hintedPair: [],
  dailyChallenge: null,
};

export const useGameStore = create<GameState & {
  updateScore: (score: number) => void;
  updateTimeLeft: (time: number) => void;
  updateCards: (cards: Card[]) => void;
  setGameOver: (isOver: boolean) => void;
  updateBestScore: (score: number) => void;
  updateLevel: (level: number) => void;
  updateCoins: (coins: number) => void;
  unlockCardStyle: (styleId: string) => void;
  setSelectedStyle: (styleId: string) => void;
  updatePowerUp: (powerUpId: string, updates: Partial<PowerUp>) => void;
  updateAchievement: (achievementId: string, updates: Partial<Achievement>) => void;
  incrementCombo: () => void;
  resetCombo: () => void;
  setHintedPair: (pair: number[]) => void;
  setTimeFrozen: (frozen: boolean) => void;
  resetGame: () => void;
}>((set) => ({
  ...initialState,
  updateScore: (score) => set({ score }),
  updateTimeLeft: (timeLeft) => set({ timeLeft }),
  updateCards: (cards) => set({ cards }),
  setGameOver: (isGameOver) => set({ isGameOver }),
  updateBestScore: (bestScore) => set({ bestScore }),
  updateLevel: (level) => set({ level }),
  updateCoins: (coins) => set({ coins }),
  unlockCardStyle: (styleId) => set((state) => ({
    cardStyles: state.cardStyles.map(style =>
      style.id === styleId ? { ...style, unlocked: true } : style
    )
  })),
  setSelectedStyle: (styleId) => set({ selectedStyle: styleId }),
  updatePowerUp: (powerUpId, updates) => set((state) => ({
    powerUps: state.powerUps.map(powerUp =>
      powerUp.id === powerUpId ? { ...powerUp, ...updates } : powerUp
    )
  })),
  updateAchievement: (achievementId, updates) => set((state) => ({
    achievements: state.achievements.map(achievement =>
      achievement.id === achievementId ? { ...achievement, ...updates } : achievement
    )
  })),
  incrementCombo: () => set((state) => {
    const newComboCount = state.comboCount + 1;
    return {
      comboCount: newComboCount,
      maxCombo: Math.max(state.maxCombo, newComboCount)
    };
  }),
  resetCombo: () => set({ comboCount: 0 }),
  setHintedPair: (pair) => set({ hintedPair: pair }),
  setTimeFrozen: (frozen) => set({ isTimeFrozen: frozen }),
  resetGame: () => set((state) => ({
    ...initialState,
    bestScore: state.bestScore,
    coins: state.coins,
    cardStyles: state.cardStyles,
    selectedStyle: state.selectedStyle,
    level: state.level,
    achievements: state.achievements,
  })),
}));