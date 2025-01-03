import React from 'react';
import { Trophy, Timer, Coins } from 'lucide-react';
import { getLevelConfig } from '../utils/gameUtils';

interface LevelInfoProps {
  level: number;
}

export const LevelInfo: React.FC<LevelInfoProps> = ({ level }) => {
  const config = getLevelConfig(level);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Level {level}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span>{config.timeLimit}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>{config.cardCount / 2} pairs</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-green-500" />
          <span>{config.reward} reward</span>
        </div>
      </div>
    </div>
  );
};