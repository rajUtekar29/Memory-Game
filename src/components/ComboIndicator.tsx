import React from 'react';

interface ComboIndicatorProps {
  combo: number;
}

export const ComboIndicator: React.FC<ComboIndicatorProps> = ({ combo }) => {
  if (combo <= 1) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="text-6xl font-bold text-purple-500 animate-bounce">
        {combo}x Combo!
      </div>
    </div>
  );
};