import React from 'react';
import { Card as CardType } from '../types/game';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/soundManager';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const { cardStyles, selectedStyle } = useGameStore();
  const currentStyle = cardStyles.find(style => style.id === selectedStyle && style.unlocked) || cardStyles[0];

  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      soundManager.play('flip');
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-24 h-24 cursor-pointer transition-all duration-300 transform hover:scale-105
        ${card.isFlipped || card.isMatched ? 'rotate-0' : 'rotate-180'}
        rounded-xl flex items-center justify-center text-5xl
        ${card.isMatched ? 'bg-green-100' : currentStyle.bgColor}
        border-2 ${currentStyle.borderColor} shadow-lg
        ${!card.isFlipped && !card.isMatched ? 'hover:shadow-xl' : ''}
        ${card.isMatched ? 'animate-pulse' : ''}`}
    >
      {(card.isFlipped || card.isMatched) ? (
        <span className="animate-fade-in select-none">{card.emoji}</span>
      ) : (
        <span className="rotate-180 text-3xl select-none">❓</span>
      )}
    </div>
  );
};