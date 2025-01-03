import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const usePowerUps = () => {
  const {
    powerUps,
    updatePowerUp,
    cards,
    updateCards,
    setHintedPair,
    setTimeFrozen,
    updateCoins,
    coins
  } = useGameStore();

  const handlePowerUp = (powerUpId: string) => {
    const powerUp = powerUps.find(p => p.id === powerUpId);
    if (!powerUp || powerUp.isActive || powerUp.remainingCooldown > 0 || coins < powerUp.price) {
      return;
    }

    updateCoins(coins - powerUp.price);
    updatePowerUp(powerUpId, { isActive: true });

    switch (powerUpId) {
      case 'hint': {
        const unmatchedCards = cards.filter(card => !card.isMatched);
        if (unmatchedCards.length >= 2) {
          const firstCard = unmatchedCards[0];
          const matchingCard = unmatchedCards.find(
            card => card.id !== firstCard.id && card.emoji === firstCard.emoji
          );
          if (matchingCard) {
            setHintedPair([firstCard.id, matchingCard.id]);
          }
        }
        break;
      }
      case 'freeze':
        setTimeFrozen(true);
        break;
      case 'shuffle':
        const unmatchedCards = cards.filter(card => !card.isMatched);
        const matchedCards = cards.filter(card => card.isMatched);
        const shuffledUnmatched = [...unmatchedCards].sort(() => Math.random() - 0.5);
        updateCards([...matchedCards, ...shuffledUnmatched]);
        break;
    }

    // Start cooldown timer
    setTimeout(() => {
      updatePowerUp(powerUpId, { isActive: false, remainingCooldown: powerUp.cooldown });
      
      // Reset power-up specific states
      if (powerUpId === 'hint') {
        setHintedPair([]);
      } else if (powerUpId === 'freeze') {
        setTimeFrozen(false);
      }

      // Start countdown for remaining cooldown
      const cooldownInterval = setInterval(() => {
        updatePowerUp(powerUpId, (prev) => ({
          remainingCooldown: Math.max(0, prev.remainingCooldown - 1000)
        }));
      }, 1000);

      setTimeout(() => {
        clearInterval(cooldownInterval);
        updatePowerUp(powerUpId, { remainingCooldown: 0 });
      }, powerUp.cooldown);
    }, powerUp.duration);
  };

  return { handlePowerUp };
};