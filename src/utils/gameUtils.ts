import { Card, CardStyle, LevelConfig } from '../types/game';
import { animalEmojis } from './emojiConfig';

export const INITIAL_TIME = 60;
export const MATCH_SCORE = 100;
export const TIME_PENALTY = 10;

export const INITIAL_STYLES: CardStyle[] = [
  {
    id: 'default',
    name: 'Classic',
    price: 0,
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    unlocked: true
  },
  {
    id: 'neon',
    name: 'Neon',
    price: 1000,
    bgColor: 'bg-purple-500',
    borderColor: 'border-purple-300',
    unlocked: false
  },
  {
    id: 'golden',
    name: 'Golden',
    price: 2000,
    bgColor: 'bg-yellow-400',
    borderColor: 'border-yellow-600',
    unlocked: false
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    price: 3000,
    bgColor: 'bg-indigo-600',
    borderColor: 'border-blue-400',
    unlocked: false
  }
];

export const LEVEL_CONFIG: Record<number, LevelConfig> = {
  1: { cardCount: 12, timeLimit: 60, reward: 100 },   // 3x4 grid
  2: { cardCount: 16, timeLimit: 75, reward: 150 },   // 4x4 grid
  3: { cardCount: 20, timeLimit: 90, reward: 200 },   // 4x5 grid
  4: { cardCount: 24, timeLimit: 120, reward: 250 },  // 4x6 grid
  5: { cardCount: 30, timeLimit: 150, reward: 300 },  // 5x6 grid
  6: { cardCount: 36, timeLimit: 180, reward: 350 },  // 6x6 grid
  7: { cardCount: 40, timeLimit: 210, reward: 400 },  // 5x8 grid
  8: { cardCount: 48, timeLimit: 240, reward: 450 },  // 6x8 grid
  9: { cardCount: 54, timeLimit: 270, reward: 500 },  // 6x9 grid
  10: { cardCount: 60, timeLimit: 300, reward: 1000 } // 6x10 grid
};

export const getGridConfig = (cardCount: number): { cols: number; rows: number } => {
  const configs = {
    12: { cols: 4, rows: 3 },
    16: { cols: 4, rows: 4 },
    20: { cols: 5, rows: 4 },
    24: { cols: 6, rows: 4 },
    30: { cols: 6, rows: 5 },
    36: { cols: 6, rows: 6 },
    40: { cols: 8, rows: 5 },
    48: { cols: 8, rows: 6 },
    54: { cols: 9, rows: 6 },
    60: { cols: 10, rows: 6 }
  };
  return configs[cardCount] || { cols: 4, rows: 4 };
};

// Helper function to shuffle array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Store used emojis for the current game session
const usedEmojisInSession = new Map<number, Set<string>>();

export const createDeck = (count: number, level: number = 1): Card[] => {
  // Initialize set for this level if it doesn't exist
  if (!usedEmojisInSession.has(level)) {
    usedEmojisInSession.set(level, new Set());
  }

  const currentLevelEmojis = usedEmojisInSession.get(level)!;
  
  // Reset level emojis if we don't have enough unique ones left
  if (animalEmojis.length - currentLevelEmojis.size < count / 2) {
    currentLevelEmojis.clear();
  }

  // Get available emojis (not used in this level)
  const availableEmojis = animalEmojis.filter(
    animal => !currentLevelEmojis.has(animal.emoji)
  );

  // Shuffle and select required number of unique emojis
  const selectedEmojis = shuffleArray(availableEmojis).slice(0, count / 2);

  // Mark selected emojis as used for this level
  selectedEmojis.forEach(animal => currentLevelEmojis.add(animal.emoji));

  // Create pairs and shuffle them
  const pairs = shuffleArray(
    selectedEmojis.flatMap(animal => [
      { emoji: animal.emoji, name: animal.name },
      { emoji: animal.emoji, name: animal.name }
    ])
  );

  // Create and return cards
  return pairs.map((animal, index) => ({
    id: index,
    emoji: animal.emoji,
    isFlipped: false,
    isMatched: false,
    style: INITIAL_STYLES[0]
  }));
};

export const calculateScore = (matches: number, timeLeft: number): number => {
  return matches * MATCH_SCORE + timeLeft * 10;
};

export const getLevelConfig = (level: number): LevelConfig => {
  return LEVEL_CONFIG[level] || LEVEL_CONFIG[Object.keys(LEVEL_CONFIG).length];
};

// Reset the used emojis for a specific level
export const resetLevelEmojis = (level: number): void => {
  usedEmojisInSession.delete(level);
};

// Reset all used emojis across all levels
export const resetAllEmojis = (): void => {
  usedEmojisInSession.clear();
};