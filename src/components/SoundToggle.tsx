import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuteStatus());

  const toggleSound = () => {
    const newMuteStatus = soundManager.toggleMute();
    setIsMuted(newMuteStatus);
  };

  return (
    <button
      onClick={toggleSound}
      className="p-2 hover:bg-white rounded-full transition-colors"
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </button>
  );
};