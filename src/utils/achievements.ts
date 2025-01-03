import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a level in half the given time',
    icon: '⚡',
    isUnlocked: false,
    progress: 0,
    requirement: 1
  },
  {
    id: 'combo_master',
    name: 'Combo Master',
    description: 'Achieve a 5x combo streak',
    icon: '🔥',
    isUnlocked: false,
    progress: 0,
    requirement: 5
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a level without any mistakes',
    icon: '✨',
    isUnlocked: false,
    progress: 0,
    requirement: 1
  },
  {
    id: 'collector',
    name: 'Card Collector',
    description: 'Unlock all card styles',
    icon: '🎴',
    isUnlocked: false,
    progress: 0,
    requirement: 4
  }
];