import React, { useState, useEffect } from 'react';
import { Card as CardComponent } from './components/Card';
import { GameStats } from './components/GameStats';
import { GameOver } from './components/GameOver';
import { Shop } from './components/Shop';
import { LevelInfo } from './components/LevelInfo';
import { LevelTransition } from './components/LevelTransition';
import { HomeScreen } from './components/HomeScreen';
import { FailureScreen } from './components/FailureScreen';
import { useGameStore } from './store/gameStore';
import { createDeck, getLevelConfig, calculateScore, getGridConfig } from './utils/gameUtils';
import { Home, ShoppingBag } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game' | 'shop'>('home');
  const [showLevelTransition, setShowLevelTransition] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const {
    score,
    timeLeft,
    cards,
    isGameOver,
    bestScore,
    level,
    coins,
    updateScore,
    updateTimeLeft,
    updateCards,
    setGameOver,
    updateBestScore,
    updateLevel,
    updateCoins,
    resetGame
  } = useGameStore();

  const gridConfig = getGridConfig(cards.length);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && currentScreen === 'game') {
      const timer = setInterval(() => {
        updateTimeLeft(timeLeft - 1);
        if (timeLeft - 1 <= 0) {
          setGameOver(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver, currentScreen]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || isGameOver) return;

    updateCards(
      cards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards([...flippedCards, cardId]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        updateScore(score + 100);
        updateCards(
          cards.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          updateCards(
            cards.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCards([]);
    }
  }, [flippedCards]);

  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && !isGameOver && currentScreen === 'game') {
      const config = getLevelConfig(level);
      const levelScore = calculateScore(cards.length / 2, timeLeft);
      updateScore(levelScore);
      updateCoins(coins + config.reward);
      updateBestScore(Math.max(bestScore, levelScore));
      setGameOver(true);
      setShowLevelTransition(true);
    }
  }, [cards]);

  const startNextLevel = () => {
    const nextLevel = level + 1;
    const config = getLevelConfig(nextLevel);
    updateLevel(nextLevel);
    updateTimeLeft(config.timeLimit);
    updateScore(0);
    updateCards(createDeck(config.cardCount));
    setGameOver(false);
    setFlippedCards([]);
    setShowLevelTransition(false);
  };

  const restartLevel = () => {
    const config = getLevelConfig(level);
    resetGame();
    updateTimeLeft(config.timeLimit);
    updateCards(createDeck(config.cardCount));
    setGameOver(false);
  };

  const startGame = () => {
    setCurrentScreen('game');
    restartLevel();
  };

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        onPlay={startGame}
        onShop={() => setCurrentScreen('shop')}
      />
    );
  }

  if (currentScreen === 'shop') {
    return <Shop onClose={() => setCurrentScreen('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 hover:bg-white rounded-full transition-colors"
            aria-label="Home"
          >
            <Home className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Memory Game</h1>
          <button
            onClick={() => setCurrentScreen('shop')}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>

        <LevelInfo level={level} />
        <GameStats
          score={score}
          timeLeft={timeLeft}
          bestScore={bestScore}
          coins={coins}
        />

        <div
          className={`grid gap-4 justify-items-center mx-auto`}
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
            maxWidth: `${gridConfig.cols * 120}px`
          }}
        >
          {cards.map(card => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={() => !card.isFlipped && !card.isMatched && handleCardClick(card.id)}
            />
          ))}
        </div>

        {showLevelTransition && !timeLeft <= 0 && (
          <LevelTransition
            currentLevel={level}
            onNextLevel={startNextLevel}
            score={score}
          />
        )}

        {timeLeft <= 0 && (
          <FailureScreen
            onRetry={restartLevel}
            onHome={() => setCurrentScreen('home')}
          />
        )}

        {isGameOver && timeLeft > 0 && !showLevelTransition && (
          <GameOver
            score={score}
            bestScore={bestScore}
            onRestart={restartLevel}
            onNextLevel={startNextLevel}
            level={level}
            allLevelsCompleted={level >= Object.keys(getLevelConfig).length}
          />
        )}
      </div>
    </div>
  );
}

export default App;