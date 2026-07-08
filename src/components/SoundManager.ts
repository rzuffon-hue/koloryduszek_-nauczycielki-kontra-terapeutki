/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private musicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private currentStyle: 'happy' | 'calm' | 'tension' | null = null;

  constructor() {
    // AudioContext is initialized lazily upon first user interaction to satisfy browser policies.
  }

  private initContext() {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAutoContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          this.musicGain = this.ctx.createGain();
          this.musicGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
          this.musicGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      // Audio context is disabled/restricted in the current iframe/sandbox environment; fall back gracefully
      this.ctx = null;
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.musicGain) {
      try {
        this.musicGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx?.currentTime || 0);
      } catch (e) {
        console.warn('Failed to set volume gain:', e);
      }
    }
  }

  toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  playClick() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Audio click failed', e);
    }
  }

  playSuccess() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn('Audio success failed', e);
    }
  }

  playStatGain(type: 'freedom' | 'order') {
    this.initContext();
    if (this.isMuted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'freedom') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.2);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(329.63, now);
        osc.frequency.linearRampToValueAtTime(392.00, now + 0.2);
      }

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio stat failed', e);
    }
  }

  playFail() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.45);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.46);
    } catch (e) {
      console.warn('Audio playFail failed', e);
    }
  }

  playTrophy() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.45);
      });
    } catch (e) {
      console.warn('Audio playTrophy failed', e);
    }
  }

  playSwipe() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.16);
    } catch (e) {
      console.warn('Audio playSwipe failed', e);
    }
  }

  playZap() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.23);
    } catch (e) {
      console.warn('Audio playZap failed', e);
    }
  }

  playPaint() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.16);
    } catch (e) {
      console.warn('Audio playPaint failed', e);
    }
  }

  playBlock() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(110, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.13);
    } catch (e) {
      console.warn('Audio playBlock failed', e);
    }
  }


  playMusic(style: 'happy' | 'calm' | 'tension') {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;
    if (this.currentStyle === style) return;

    this.stopMusic();
    this.currentStyle = style;

    let index = 0;
    const happyNotes = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66]; // C4, E4, G4, C5, B4, G4, E4, D4
    const calmNotes = [196.00, 220.00, 293.66, 329.63, 392.00, 440.00, 587.33, 659.25]; // G3, A3, D4, E4, G4, A4, D5, E5 (Pentatonic)
    const tensionNotes = [110.00, 116.54, 130.81, 146.83, 110.00, 116.54, 130.81, 146.83]; // Low creepy notes

    const playNote = () => {
      if (this.isMuted || !this.ctx || !this.musicGain) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        let freq = 440;
        if (style === 'happy') {
          freq = happyNotes[index % happyNotes.length];
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start();
          osc.stop(now + 0.55);
        } else if (style === 'calm') {
          freq = calmNotes[index % calmNotes.length];
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.start();
          osc.stop(now + 1.3);
        } else {
          freq = tensionNotes[index % tensionNotes.length];
          osc.type = 'sawtooth';
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.start();
          osc.stop(now + 0.75);
        }

        osc.frequency.setValueAtTime(freq, now);
        osc.connect(gain);
        gain.connect(this.musicGain);

        index++;
      } catch (e) {
        console.warn('Note playing failed', e);
      }
    };

    const intervalTime = style === 'calm' ? 1200 : style === 'happy' ? 400 : 600;
    this.musicInterval = setInterval(playNote, intervalTime);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.currentStyle = null;
  }
}

export const sound = new SoundManager();
