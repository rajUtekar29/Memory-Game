import { Howl } from 'howler';

class SoundManager {
  private sounds: { [key: string]: Howl } = {};
  private isMuted: boolean = false;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    this.sounds = {
      flip: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
        volume: 0.5,
      }),
      match: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
        volume: 0.6,
      }),
      success: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
        volume: 0.7,
      }),
      fail: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'],
        volume: 0.5,
      }),
      powerup: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3'],
        volume: 0.6,
      }),
      levelUp: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3'],
        volume: 0.7,
      }),
      tick: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3'],
        volume: 0.3,
      }),
    };
  }

  play(soundName: keyof typeof this.sounds) {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }

  getMuteStatus() {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();