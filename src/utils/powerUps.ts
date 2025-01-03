import { PowerUp } from '../types/game';
import { Lightbulb, Timer, Shuffle } from 'lucide-react';

export const INITIAL_POWERUPS: PowerUp[] = [
  {
    id: 'hint',
    name: 'Hint',
    description: 'Reveals a matching pair for 3 seconds',
    price: 100,
    icon: 'Lightbulb',
    duration: 3000,
    cooldown: 30000,
    isActive: false,
    remainingCooldown: 0
  },
  {
    id: 'freeze',
    name: 'Time Freeze',
    description: 'Stops the timer for 5 seconds',
    price: 200,
    icon: 'Timer',
    duration: 5000,
    cooldown: 45000,
    isActive: false,
    remainingCooldown: 0
  },
  {
    id: 'shuffle',
    name: 'Shuffle',
    description: 'Rearranges all unmatched cards',
    price: 150,
    icon: 'Shuffle',
    duration: 0,
    cooldown: 20000,
    isActive: false,
    remainingCooldown: 0
  }
];