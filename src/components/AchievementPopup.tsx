import React from 'react';
import { Trophy } from 'lucide-react';
import { Achievement } from '../types/game';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  achievement,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-100 p-2 rounded-full">
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{achievement.name}</h3>
          <p className="text-gray-600 text-sm">{achievement.description}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};