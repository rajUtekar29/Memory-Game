import React from 'react';
import { Play, ShoppingBag, Trophy, Timer, Brain } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface HomeScreenProps {
  onPlay: () => void;
  onShop: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPlay, onShop }) => {
  const { level, bestScore, coins } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Memory Match</h1>
          <p className="text-gray-600">Challenge your memory and earn rewards!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold">Current Level</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{level}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h3 className="font-semibold">Best Score</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{bestScore}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">Games Played</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{Math.max(1, level - 1)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">Coins</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{coins}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onPlay}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Play className="w-6 h-6" />
            <span className="font-semibold">Play Game</span>
          </button>
          
          <button
            onClick={onShop}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-semibold">Card Shop</span>
          </button>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4">How to Play</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Match pairs of cards before time runs out
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Complete levels to earn coins
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Buy new card styles in the shop
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Each level gets progressively challenging
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};