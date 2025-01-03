export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  style: CardStyle;
}

export interface CardStyle {
  id: string;
  name: string;
  price: number;
  bgColor: string;
  borderColor: string;
  unlocked: boolean;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  duration: number;
  cooldown: number;
  isActive: boolean;
  remainingCooldown: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  requirement: number;
}

export interface GameState {
  score: number;
  timeLeft: number;
  cards: Card[];
  isGameOver: boolean;
  bestScore: number;
  level: number;
  coins: number;
  selectedStyle: string;
  cardStyles: CardStyle[];
  powerUps: PowerUp[];
  achievements: Achievement[];
  comboCount: number;
  maxCombo: number;
  isTimeFrozen: boolean;
  hintedPair: number[];
  dailyChallenge: DailyChallenge | null;
}

export interface LevelConfig {
  cardCount: number;
  timeLimit: number;
  reward: number;
}

export interface AnimalEmoji {
  emoji: string;
  name: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  completed: boolean;
  reward: number;
  config: LevelConfig;
}