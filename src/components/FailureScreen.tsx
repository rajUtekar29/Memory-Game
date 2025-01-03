import React from 'react';
import { XCircle, RotateCcw, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface FailureScreenProps {
  onRetry: () => void;
  onHome: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ onRetry, onHome }) => {
  const { level } = useGameStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4">
        <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
        <p className="text-gray-600 mb-6">
          Don't worry! You can try Level {level} again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Level
          </button>
          <button
            onClick={onHome}
            className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};