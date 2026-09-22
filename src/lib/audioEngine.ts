/**
 * Pelagia Ocean & Papercraft Sound Engine
 * Hybrid: Real Ocean Ambient Audio Loop + Web Audio Depth Filter + Procedural Tactile Sound FX
 * Zero external audio libraries. 100% browser native.
 * Features DynamicsCompressorNode to completely prevent digital crackling, clipping, or popping.
 */

class PelagiaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private oceanFilter: BiquadFilterNode | null = null;
  private oceanGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private mediaSourceNode: MediaElementAudioSourceNode | null = null;

  private lastFilterUpdate = 0;
  private lastDepth = -999;

  // Analyser node for UI visualizer
  public analyser: AnalyserNode | null = null;

  public init(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.isInitialized && this.ctx) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.8, this.ctx.currentTime);

      // Dynamics Compressor to eliminate clipping, pops, and crackle
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(24, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      // Visualizer Analyser
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Depth Biquad Lowpass Filter for Ocean Ambient
      this.oceanFilter = this.ctx.createBiquadFilter();
      this.oceanFilter.type = 'lowpass';
      this.oceanFilter.frequency.setValueAtTime(10000, this.ctx.currentTime);
      this.oceanFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      this.oceanGain = this.ctx.createGain();
      this.oceanGain.gain.setValueAtTime(0.65, this.ctx.currentTime);

      this.oceanFilter.connect(this.oceanGain);
      this.oceanGain.connect(this.masterGain);

      // Set up real ocean-ambient.mp3 via HTMLAudioElement
      this.setupRealOceanAudio();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Pelagia Audio Engine initialization error:', e);
    }
  }

  private setupRealOceanAudio(): void {
    if (!this.ctx || !this.oceanFilter) return;

    try {
      this.audioElement = new Audio('/audio/ocean-ambient.mp3');
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      this.mediaSourceNode = this.ctx.createMediaElementSource(this.audioElement);
      this.mediaSourceNode.connect(this.oceanFilter);

      if (!this.isMuted) {
        this.audioElement.play().catch(() => {});
      }
    } catch (e) {
      console.warn('Could not hook ocean-ambient.mp3 into AudioContext:', e);
    }
  }

  /**
   * Throttled and ramped filter adjustment to eliminate parameter crackle on scroll
   */
  public updateDepthFilter(depthMeters: number): void {
    if (!this.ctx || !this.oceanFilter || !this.oceanGain) return;

    const now = performance.now();
    // Throttle to 60ms and minimum 25m delta to avoid parameter chatter
    if (now - this.lastFilterUpdate < 60 && Math.abs(depthMeters - this.lastDepth) < 25) {
      return;
    }
    this.lastFilterUpdate = now;
    this.lastDepth = depthMeters;

    const t = this.ctx.currentTime;
    const frac = Math.max(0, Math.min(1, Math.max(0, depthMeters) / 10994));

    // Smooth exponential cutoff from 10,000 Hz down to 380 Hz
    const cutoff = Math.max(380, 10000 * Math.pow(0.038, frac));

    try {
      this.oceanFilter.frequency.cancelScheduledValues(t);
      this.oceanFilter.frequency.linearRampToValueAtTime(cutoff, t + 0.12);

      this.oceanFilter.Q.cancelScheduledValues(t);
      this.oceanFilter.Q.linearRampToValueAtTime(0.7, t + 0.12);
    } catch {
      // ignore
    }
  }

  /**
   * Toggle Mute / Unmute
   */
  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0.0 : 0.8, t + 0.08);
    }

    if (this.audioElement) {
      if (!this.isMuted) {
        this.audioElement.play().catch(() => {});
      } else {
        this.audioElement.pause();
      }
    }

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Smooth, satisfying water bubble sound
   */
  public playWaterBubble(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 360 + Math.random() * 140;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, t + 0.12);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch {
      // ignore
    }
  }

  /**
   * Smooth paper rustle sound
   */
  public playPaperRustle(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.14);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(1.2, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(t);
    } catch {
      // ignore
    }
  }

  /**
   * Satisfying vintage wax seal stamp thud
   */
  public playStampThud(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(105, t);
      osc.frequency.exponentialRampToValueAtTime(34, t + 0.16);

      gain.gain.setValueAtTime(0.26, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);

      this.playPaperRustle();
    } catch {
      // ignore
    }
  }

  /**
   * Resonant atmospheric sonar chime
   */
  public playZoneChime(depthMeters: number): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = Math.max(140, 480 - (depthMeters / 10994) * 320);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.5);
    } catch {
      // ignore
    }
  }

  public playSpecimenChime(): void {
    this.playPaperRustle();
    this.playWaterBubble();
  }

  public playAlarmPing(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(780, t);
      osc.frequency.setValueAtTime(390, t + 0.1);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.32);
    } catch {
      // ignore
    }
  }

  public playHullGroan(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, t);
      osc.frequency.linearRampToValueAtTime(62, t + 0.4);
      osc.frequency.linearRampToValueAtTime(38, t + 1.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);
      filter.Q.setValueAtTime(1.5, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.3);
    } catch {
      // ignore
    }
  }

  public playGlassCrack(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2800, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(t);
    } catch {
      // ignore
    }
  }

  public playCosmicSwell(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const chord = [220, 277.18, 329.63, 440, 554.37, 659.25];

      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.05 / chord.length, t + 1.0 + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 4.0);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(t);
        osc.stop(t + 4.2);
      });
    } catch {
      // ignore
    }
  }

  public playBottlePop(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.05);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.12);
    } catch {
      // ignore
    }
  }

  public playLeviathanRumble(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(48, t);
      osc.frequency.linearRampToValueAtTime(32, t + 1.8);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 3.0);
    } catch {
      // ignore
    }
  }

  public playRelicUnlock(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      // Magical harmonic arpeggio (C5 - G5 - C6 - E6)
      const freqs = [523.25, 783.99, 1046.50, 1318.51];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = t + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 1.3);
      });
    } catch {
      // ignore
    }
  }
}

export const pelagiaAudio = new PelagiaAudioEngine();
