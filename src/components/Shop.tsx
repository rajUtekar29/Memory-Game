import React from 'react';
import { ShoppingBag, Coins, ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface ShopProps {
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ onClose }) => {
  const { cardStyles, coins, unlockCardStyle, setSelectedStyle, selectedStyle } = useGameStore();

  const handlePurchase = (styleId: string, price: number) => {
    if (coins >= price) {
      unlockCardStyle(styleId);
      useGameStore.getState().updateCoins(coins - price);
      setSelectedStyle(styleId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Card Shop
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
            <Coins className="w-6 h-6 text-yellow-500" />
            <span className="font-bold">{coins}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardStyles.map((style) => (
            <div
              key={style.id}
              className={`p-6 rounded-lg border-2 ${
                style.borderColor
              } ${
                selectedStyle === style.id ? 'ring-2 ring-blue-500' : ''
              } transition-all duration-300 hover:shadow-lg bg-white`}
            >
              <div 
                className={`w-full h-32 ${style.bgColor} rounded-lg mb-4 flex items-center justify-center text-4xl
                  ${style.unlocked ? 'opacity-100' : 'opacity-50'}`}
              >
                🎴
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{style.name}</h3>
                {!style.unlocked && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Coins className="w-4 h-4" />
                    <span>{style.price}</span>
                  </div>
                )}
              </div>
              {style.unlocked ? (
                <button
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    selectedStyle === style.id
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {selectedStyle === style.id ? 'Selected' : 'Select'}
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(style.id, style.price)}
                  disabled={coins < style.price}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    coins >= style.price
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {coins >= style.price ? 'Purchase' : 'Not enough coins'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};