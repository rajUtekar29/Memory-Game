import React from 'react';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';

interface GameOverProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
  onNextLevel: () => void;
  level: number;
  allLevelsCompleted: boolean;
}

export const GameOver: React.FC<GameOverProps> = ({
  score,
  bestScore,
  onRestart,
  onNextLevel,
  level,
  allLevelsCompleted
}) => {
  const isNewBestScore = score > bestScore;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4">Level {level} Complete!</h2>
        <p className="text-xl mb-2">Score: {score}</p>
        {isNewBestScore && (
          <p className="text-lg text-purple-600 font-semibold mb-4">
            🎉 New Best Score! 🎉
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Level
          </button>
          {!allLevelsCompleted && (
            <button
              onClick={onNextLevel}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Next Level
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};