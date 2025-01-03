import React from 'react';
import { ArrowRight, Star, Trophy, Timer } from 'lucide-react';
import { getLevelConfig } from '../utils/gameUtils';

interface LevelTransitionProps {
  currentLevel: number;
  onNextLevel: () => void;
  score: number;
}

export const LevelTransition: React.FC<LevelTransitionProps> = ({
  currentLevel,
  onNextLevel,
  score,
}) => {
  const nextLevelConfig = getLevelConfig(currentLevel + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Level {currentLevel} Complete!</h2>
          <p className="text-lg text-gray-600">Score: {score}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-4">Next Level Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 justify-center">
              <Timer className="w-5 h-5 text-blue-500" />
              <span>{nextLevelConfig.timeLimit}s</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>{nextLevelConfig.cardCount / 2} pairs</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNextLevel}
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors w-full font-semibold"
        >
          Start Level {currentLevel + 1}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};