import React from 'react';
import { Timer, Trophy, Coins } from 'lucide-react';

interface GameStatsProps {
  score: number;
  timeLeft: number;
  bestScore: number;
  coins: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  score,
  timeLeft,
  bestScore,
  coins
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600">Score</p>
          <p className="font-bold">{score}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
        <Timer className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-sm text-gray-600">Time</p>
          <p className="font-bold">{timeLeft}s</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
        <Trophy className="w-6 h-6 text-purple-500" />
        <div>
          <p className="text-sm text-gray-600">Best</p>
          <p className="font-bold">{bestScore}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
        <Coins className="w-6 h-6 text-green-500" />
        <div>
          <p className="text-sm text-gray-600">Coins</p>
          <p className="font-bold">{coins}</p>
        </div>
      </div>
    </div>
  );
};