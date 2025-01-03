import React from 'react';
import { Lightbulb, Timer, Shuffle } from 'lucide-react';
import { PowerUp } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface PowerUpsBarProps {
  onUsePowerUp: (powerUpId: string) => void;
}

export const PowerUpsBar: React.FC<PowerUpsBarProps> = ({ onUsePowerUp }) => {
  const { powerUps, coins } = useGameStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6" />;
      case 'Timer':
        return <Timer className="w-6 h-6" />;
      case 'Shuffle':
        return <Shuffle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      {powerUps.map((powerUp) => (
        <button
          key={powerUp.id}
          onClick={() => onUsePowerUp(powerUp.id)}
          disabled={powerUp.isActive || powerUp.remainingCooldown > 0 || coins < powerUp.price}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg ${
            powerUp.isActive
              ? 'bg-green-500 text-white'
              : powerUp.remainingCooldown > 0
              ? 'bg-gray-300 cursor-not-allowed'
              : coins < powerUp.price
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {getIcon(powerUp.icon)}
          <span>{powerUp.name}</span>
          {powerUp.remainingCooldown > 0 && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center text-white">
              {Math.ceil(powerUp.remainingCooldown / 1000)}s
            </div>
          )}
        </button>
      ))}
    </div>
  );
};