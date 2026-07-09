/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private currentStyle: 'happy' | 'calm' | 'tension' | null = null;

  // Cached noise buffer to avoid reallocation during rapid tile zaps or hits
  private noiseBufferCache: AudioBuffer | null = null;

  // Multi-voice Step Sequencer State
  private nextNoteTime: number = 0;
  private currentStep: number = 0;

  constructor() {
    // AudioContext is initialized lazily on first user gesture (click/swipe)
  }

  private initContext() {
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as any).webkitAutoContext ||
          (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();

          // Master node for main volume & muting
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);

          // Dedicated background music channel
          this.musicGain = this.ctx.createGain();
          this.musicGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
          this.musicGain.connect(this.masterGain);

          // Dedicated sound effects channel
          this.sfxGain = this.ctx.createGain();
          this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
          this.sfxGain.connect(this.masterGain);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      this.ctx = null;
    }
  }

  // Pre-generate a 2-second buffer of white noise for crisp physical clicks/splashes
  private getNoiseBuffer(): AudioBuffer {
    if (this.noiseBufferCache) return this.noiseBufferCache;
    if (!this.ctx) return new AudioBuffer({ length: 1, sampleRate: 44100 });

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBufferCache = buffer;
      return buffer;
    } catch (e) {
      return new AudioBuffer({ length: 1, sampleRate: 44100 });
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    this.initContext();
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
      } catch (e) {
        console.warn('Failed to set master volume gain:', e);
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

  /* ------------------- SOUND EFFECTS (SFX) ------------------- */

  // Clean organic mechanical click with high-frequency transient click
  playClick() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);

      // Organic click high-pass transient spike
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(4000, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain || this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);

      noise.start(now);
      noise.stop(now + 0.01);
    } catch (e) {
      console.warn('Audio click failed', e);
    }
  }

  // Sparkling pentatonic chord arpeggiation (Cmaj9)
  playSuccess() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 987.77]; // C4, E4, G4, B4, C5, E5, B5
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.04;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.6);
      });
    } catch (e) {
      console.warn('Audio success failed', e);
    }
  }

  // Sparkling ascending or structured chime
  playStatGain(type: 'freedom' | 'order') {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      if (type === 'freedom') {
        // Rainbow/Creativity: playful bubbly cascade of 4 fast, ascending twinkles
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const time = now + idx * 0.04;
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);

          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.06, time + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

          osc.connect(gainNode);
          gainNode.connect(this.sfxGain || this.masterGain!);

          osc.start(time);
          osc.stop(time + 0.3);
        });
      } else {
        // Order/Aesthetics: structured solid perfect fifth chime (G4, D5)
        const notes = [392.00, 587.33];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gainNode.gain.setValueAtTime(0.08, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gainNode);
          gainNode.connect(this.sfxGain || this.masterGain!);

          osc.start(now);
          osc.stop(now + 0.4);
        });
      }
    } catch (e) {
      console.warn('Audio stat failed', e);
    }
  }

  // Sad decaying descending minor chords
  playFail() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [311.13, 277.18, 233.08, 196.00]; // Eb4, Db4, Bb3, G3
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.07;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.linearRampToValueAtTime(freq - 15, time + 0.3); // sad bend

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.07, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.5);
      });
    } catch (e) {
      console.warn('Audio fail failed', e);
    }
  }

  // Golden glowing grand chord cascade
  playTrophy() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25, 659.25, 1046.50]; // C3 -> C6 major arpeggio
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.05;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.7);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.8);
      });
    } catch (e) {
      console.warn('Audio trophy failed', e);
    }
  }

  // Clean satisfying tile swipe with bandpass filtered whoosh
  playSwipe() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4, now);
      filter.frequency.setValueAtTime(1900, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.14);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);

      noise.start(now);
      noise.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio swipe failed', e);
    }
  }

  // Fat futuristic synth-laser zap sweep
  playZap() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.18);

      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);

      // Short secondary echo zap for a lush cybernetic tail
      const osc2 = this.ctx.createOscillator();
      const filter2 = this.ctx.createBiquadFilter();
      const gain2 = this.ctx.createGain();

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(1600, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(100, now + 0.22);

      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(1200, now + 0.05);
      filter2.frequency.exponentialRampToValueAtTime(300, now + 0.22);

      gain2.gain.setValueAtTime(0.02, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(this.sfxGain || this.masterGain);

      osc2.start(now + 0.05);
      osc2.stop(now + 0.24);
    } catch (e) {
      console.warn('Audio zap failed', e);
    }
  }

  // Wet paint splash combining low bubbly pop and moving bandpass noise
  playPaint() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // Low frequency plucky bubble tone
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.13);

      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);

      // Wet noise splash
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(550, now);
      filter.frequency.linearRampToValueAtTime(1500, now + 0.07);
      filter.frequency.linearRampToValueAtTime(700, now + 0.13);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain || this.masterGain);

      noise.start(now);
      noise.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio paint failed', e);
    }
  }

  // Toy/block collision with solid woody snap
  playBlock() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(130, now + 0.04);

      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);
      osc.start(now);
      osc.stop(now + 0.12);

      // Solid metallic secondary resonant clink
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(680, now);

      bellGain.gain.setValueAtTime(0.04, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      bell.connect(bellGain);
      bellGain.connect(this.sfxGain || this.masterGain);
      bell.start(now);
      bell.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio block failed', e);
    }
  }

  // Shimmering rapid 8-note bubble cascade
  playAchievement() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // Octave scale
      freqs.forEach((freq, idx) => {
        const time = now + idx * 0.03;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.25);
      });
    } catch (e) {
      console.warn('Audio achievement failed', e);
    }
  }

  // Grand major fanfare level-up build
  playLevelUp() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const scale = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C major triad/fanfare steps
      scale.forEach((freq, idx) => {
        const time = now + idx * 0.06;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = idx === scale.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.07, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.45);
      });
    } catch (e) {
      console.warn('Audio levelUp failed', e);
    }
  }

  // Woody resonant block click
  playChoice() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gainNode);
      gainNode.connect(this.sfxGain || this.masterGain);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio choice failed', e);
    }
  }

  // Low warning cinematic heartbeat followed by warning chime
  playAlert() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // Heartbeat sub pulse
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(75, now);
      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      sub.connect(subGain);
      subGain.connect(this.sfxGain || this.masterGain);
      sub.start(now);
      sub.stop(now + 0.3);

      // Heartbeat second beat
      const sub2 = this.ctx.createOscillator();
      const sub2Gain = this.ctx.createGain();
      sub2.type = 'sine';
      sub2.frequency.setValueAtTime(75, now + 0.12);
      sub2Gain.gain.setValueAtTime(0.18, now + 0.12);
      sub2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.37);

      sub2.connect(sub2Gain);
      sub2Gain.connect(this.sfxGain || this.masterGain);
      sub2.start(now + 0.12);
      sub2.stop(now + 0.4);

      // Eerie low warning chime
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sawtooth';
      bell.frequency.setValueAtTime(130.81, now); // low C3
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);

      bellGain.gain.setValueAtTime(0.05, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      bell.connect(filter);
      filter.connect(bellGain);
      bellGain.connect(this.sfxGain || this.masterGain);
      bell.start(now);
      bell.stop(now + 0.45);
    } catch (e) {
      console.warn('Audio alert failed', e);
    }
  }

  // Sparkling upward harp run
  playUnlock() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // G4, C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.035;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, time + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.4);
      });
    } catch (e) {
      console.warn('Audio unlock failed', e);
    }
  }

  // Grand epic battle rumble & sweep
  playBattleStart() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy bass drum explosion
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(180, now);
      sub.frequency.exponentialRampToValueAtTime(40, now + 0.4);

      subGain.gain.setValueAtTime(0.28, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      sub.connect(subGain);
      subGain.connect(this.sfxGain || this.masterGain);
      sub.start(now);
      sub.stop(now + 0.5);

      // Massive electronic riser sweep
      const sweep = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const sweepGain = this.ctx.createGain();

      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(110, now);
      sweep.frequency.linearRampToValueAtTime(660, now + 0.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.5);

      sweepGain.gain.setValueAtTime(0, now);
      sweepGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

      sweep.connect(filter);
      filter.connect(sweepGain);
      sweepGain.connect(this.sfxGain || this.masterGain);

      sweep.start(now);
      sweep.stop(now + 0.55);
    } catch (e) {
      console.warn('Audio battleStart failed', e);
    }
  }

  // Heavy punch impact (bass sweep + filtered noise punch)
  playHit() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // Sub body sweep
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(170, now);
      sub.frequency.exponentialRampToValueAtTime(38, now + 0.14);

      subGain.gain.setValueAtTime(0.26, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      sub.connect(subGain);
      subGain.connect(this.sfxGain || this.masterGain);
      sub.start(now);
      sub.stop(now + 0.18);

      // Low crunch punch noise
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain || this.masterGain);

      noise.start(now);
      noise.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio hit failed', e);
    }
  }

  // Magic sparkling upward bubbles of healing
  playHeal() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [349.23, 440.00, 523.25, 698.46, 880.00, 1046.50, 1396.91]; // F4 -> F6 major chords
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.04;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(freq + 40, time + 0.25); // bubbly upward pitch bend

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gainNode);
        gainNode.connect(this.sfxGain || this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.45);
      });
    } catch (e) {
      console.warn('Audio heal failed', e);
    }
  }


  /* ------------------- PROCEDURAL STEP-SEQUENCER MUSIC BGM ------------------- */

  playMusic(style: 'happy' | 'calm' | 'tension') {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;
    if (this.currentStyle === style) return;

    this.stopMusic();
    this.currentStyle = style;

    // Set scheduling clock to current audio time
    this.nextNoteTime = this.ctx.currentTime;
    this.currentStep = 0;

    const lookAhead = 0.15; // Lookahead time window to schedule notes cleanly
    const scheduleInterval = 40; // Clock tick every 40ms

    const tick = () => {
      if (!this.ctx || this.isMuted) return;

      try {
        const now = this.ctx.currentTime;
        while (this.nextNoteTime < now + lookAhead) {
          this.scheduleStep(this.currentStep, this.nextNoteTime, style);

          // Advanced lookahead increment based on BPM
          const stepDuration = this.getStepDuration(style);
          this.nextNoteTime += stepDuration;
          this.currentStep = (this.currentStep + 1) % 16; // Loop through 16 steps
        }
      } catch (e) {
        console.warn('Music scheduler tick error:', e);
      }
    };

    this.musicInterval = setInterval(tick, scheduleInterval);
  }

  // Duration in seconds of each grid step
  private getStepDuration(style: 'happy' | 'calm' | 'tension'): number {
    if (style === 'calm') {
      // 70 BPM. Slower, atmospheric breathing quarter-notes.
      return 60 / 70;
    } else if (style === 'happy') {
      // 110 BPM. 8th notes.
      return 60 / 110 / 2;
    } else {
      // 135 BPM. Driving 8th notes.
      return 60 / 135 / 2;
    }
  }

  // Multi-voice synthesizer step scheduler
  private scheduleStep(step: number, time: number, style: 'happy' | 'calm' | 'tension') {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    try {
      if (style === 'happy') {
        this.scheduleHappyStep(step, time);
      } else if (style === 'calm') {
        this.scheduleCalmStep(step, time);
      } else if (style === 'tension') {
        this.scheduleTensionStep(step, time);
      }
    } catch (e) {
      console.warn('Failed to schedule musical step:', e);
    }
  }

  /* --- SYNTH INSTRUMENT LAYERS BY STYLE --- */

  // A. Cute Retro Lofi Pentatonic Theme (Menu / Creative Play)
  private scheduleHappyStep(step: number, time: number) {
    if (!this.ctx || !this.musicGain) return;

    // Harmonic progression over 16 steps:
    // Steps 0-3: Cmaj7 | Steps 4-7: Fmaj7 | Steps 8-11: G6 | Steps 12-15: Am7
    let currentChordNotes = [261.63, 329.63, 392.00, 493.88]; // C4, E4, G4, B4
    let bassRoot = 130.81; // C3
    let bassFifth = 196.00; // G3

    if (step >= 4 && step < 8) {
      currentChordNotes = [349.23, 440.00, 261.63, 329.63]; // F4, A4, C4, E4
      bassRoot = 87.31; // F2
      bassFifth = 130.81; // C3
    } else if (step >= 8 && step < 12) {
      currentChordNotes = [392.00, 493.88, 293.66, 329.63]; // G4, B4, D4, E4
      bassRoot = 98.00; // G2
      bassFifth = 146.83; // D3
    } else if (step >= 12) {
      currentChordNotes = [440.00, 261.63, 329.63, 392.00]; // A4, C4, E4, G4
      bassRoot = 110.00; // A2
      bassFifth = 164.81; // E3
    }

    // 1. Cozy Bassline: Roots and Fifths bouncing
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      this.playSynthNote(bassRoot, 'triangle', 0.12, 0.05, 0.22, time);
    } else if (step === 2 || step === 6 || step === 10 || step === 14) {
      this.playSynthNote(bassFifth, 'triangle', 0.08, 0.05, 0.15, time);
    }

    // 2. Playful Arpeggio Lead (Pentatonic)
    // Plays syncopated high tones on selected steps
    const leadSteps = [0, 2, 3, 5, 6, 8, 10, 11, 13, 14];
    if (leadSteps.includes(step)) {
      // Pick a random note from the active chord for organic variation
      const noteIndex = (step * 3) % currentChordNotes.length;
      let freq = currentChordNotes[noteIndex];
      // Boost the lead octave for crispness
      freq *= 2; 

      this.playSynthNote(freq, 'sine', 0.045, 0.02, 0.14, time);
    }

    // 3. Ultra-soft Lofi Drum Grid
    // Deep warm drum kick
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      this.playSynthDrumKick(time, 0.05);
    }
    // High crispy shaker/rim clicking (simulated using super-quiet noise bursts)
    if (step === 2 || step === 6 || step === 10 || step === 14) {
      this.playSynthDrumRim(time, 0.006);
    }
  }

  // B. Celestial Minecraft-style Ambient Canvas (Active Gameplay)
  private scheduleCalmStep(step: number, time: number) {
    if (!this.ctx || !this.musicGain) return;

    // Harmonic progression changing slowly over 16 steps
    // Steps 0-3: Cmaj9 | Steps 4-7: G6/9 | Steps 8-11: Fmaj9 | Steps 12-15: Am9
    let chordPads = [261.63, 392.00, 587.33, 659.25]; // C4, G4, D5, E5
    if (step >= 4 && step < 8) {
      chordPads = [293.66, 392.00, 587.33, 880.00]; // D4, G4, D5, A5
    } else if (step >= 8 && step < 12) {
      chordPads = [349.23, 523.25, 587.33, 880.00]; // F4, C5, D5, A5
    } else if (step >= 12) {
      chordPads = [220.00, 329.63, 493.88, 523.25]; // A3, E4, B4, C5
    }

    // 1. Lush Chord Drone Pads: Triggered on step 0, 4, 8, 12
    // Very slow attack, very long cinematic release
    if (step % 4 === 0) {
      chordPads.forEach((freq, idx) => {
        // Slightly delay or detune each pad voice for beautiful choral widening
        const microDelay = idx * 0.04;
        const detuneFreq = freq + (idx - 1.5) * 1.5;
        this.playSynthNote(detuneFreq, 'sine', 0.035, 1.2, 2.5, time + microDelay);
      });
    }

    // 2. Cosmic Star Twinkles (Occasional music box drops)
    // 40% probability on off-beats for spatial depth
    if (step % 2 !== 0 && Math.random() < 0.45) {
      const pentatonicScales = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // C5 to D6 Pentatonic
      const randomFreq = pentatonicScales[Math.floor(Math.random() * pentatonicScales.length)];
      
      // Twinkle note: crisp attack, sparkling release
      this.playSynthNote(randomFreq, 'sine', 0.03, 0.05, 0.8, time);

      // Stereo echo delay simulation: schedules a slightly delayed, quieter reflection
      this.playSynthNote(randomFreq, 'sine', 0.015, 0.08, 0.5, time + 0.3);
    }
  }

  // C. Cyberpunk Driving 8th Bass Action Soundtrack (Tension / Danger / Boss Fight)
  private scheduleTensionStep(step: number, time: number) {
    if (!this.ctx || !this.musicGain) return;

    // Harmonic progression: Am -> F -> G -> E7
    let bassFreq = 110.00; // A2
    if (step >= 4 && step < 8) {
      bassFreq = 87.31; // F2
    } else if (step >= 8 && step < 12) {
      bassFreq = 98.00; // G2
    } else if (step >= 12) {
      bassFreq = 82.41; // E2
    }

    // 1. Driving Moog-style Synth Bass on every single step (continuous 8th notes)
    // Uses lowpass filtered sawtooth oscillator for fat driving buzz
    const bassOctave = step % 4 === 2 ? bassFreq * 2 : bassFreq; // Occasional octave bounce
    this.playFilteredSawtoothBass(bassOctave, 0.045, time);

    // 2. Techno Beat Drum Grid
    // Rhythmic sub kick drum on steps 0, 4, 8, 12
    if (step === 0 || step === 4 || step === 8 || step === 12) {
      this.playSynthDrumKick(time, 0.18);
    }
    // High techno snap hi-hat on off-beats
    if (step === 2 || step === 6 || step === 10 || step === 14) {
      this.playSynthDrumRim(time, 0.018);
    }

    // 3. Tension Sweep Riser: Triggered once per bar
    if (step === 8) {
      this.playTensionSweeper(time);
    }
  }

  /* --- BASIC SYNTH UTILITIES --- */

  // Play a customizable note
  private playSynthNote(
    freq: number,
    type: OscillatorType,
    volume: number,
    attack: number,
    release: number,
    time: number
  ) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(volume, time + attack);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + attack + release);

      osc.connect(gainNode);
      gainNode.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + attack + release + 0.1);
    } catch (e) {
      // Graceful error capture
    }
  }

  // Play a resonant Moog-style filtered sawtooth bass note
  private playFilteredSawtoothBass(freq: number, volume: number, time: number) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      // Sweeping resonant filter envelope down
      filter.frequency.setValueAtTime(900, time);
      filter.frequency.exponentialRampToValueAtTime(280, time + 0.16);
      filter.Q.setValueAtTime(4, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(volume, time + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 0.22);
    } catch (e) {
      // Graceful catch
    }
  }

  // Rhythmic techno/lofi deep drum kick
  private playSynthDrumKick(time: number, volume: number) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

      gainNode.gain.setValueAtTime(volume, time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.13);

      osc.connect(gainNode);
      gainNode.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 0.15);
    } catch (e) {
      // Graceful catch
    }
  }

  // Crisp drum hi-hat/rim snap
  private playSynthDrumRim(time: number, volume: number) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(8000, time);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(volume, time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.musicGain);

      noise.start(time);
      noise.stop(time + 0.05);
    } catch (e) {
      // Graceful catch
    }
  }

  // Atmospheric riser sweep for driving battles
  private playTensionSweeper(time: number) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, time); // A2

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, time);
      filter.frequency.exponentialRampToValueAtTime(850, time + 1.2);
      filter.Q.setValueAtTime(2, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.035, time + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1.35);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 1.4);
    } catch (e) {
      // Graceful catch
    }
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
