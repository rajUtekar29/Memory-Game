import React from 'react';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

interface ParticleEffectProps {
  type: 'match' | 'levelUp' | 'powerUp';
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ type }) => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const getConfig = () => {
    switch (type) {
      case 'match':
        return {
          particles: {
            number: { value: 30 },
            color: { value: "#FFD700" },
            shape: { type: "star" },
            opacity: { value: 0.8 },
            size: { value: 3 },
            move: {
              direction: "none",
              speed: 6,
              outModes: "out"
            }
          }
        };
      case 'levelUp':
        return {
          particles: {
            number: { value: 50 },
            color: { value: ["#FFD700", "#FF69B4", "#4169E1"] },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: 4 },
            move: {
              direction: "top",
              speed: 8,
              outModes: "out"
            }
          }
        };
      case 'powerUp':
        return {
          particles: {
            number: { value: 20 },
            color: { value: "#7B68EE" },
            shape: { type: "triangle" },
            opacity: { value: 0.8 },
            size: { value: 3 },
            move: {
              direction: "none",
              speed: 4,
              outModes: "bounce"
            }
          }
        };
    }
  };

  return (
    <Particles
      id={`tsparticles-${type}`}
      init={particlesInit}
      options={getConfig()}
      className="absolute inset-0 pointer-events-none z-50"
    />
  );
};