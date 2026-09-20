/**
 * Tactile Organic Lo-Fi & Mechanical Sound Engine
 * Synthesized 100% procedurally with Web Audio API. Zero external audio dependencies.
 */

class PelagiaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  private masterGain: GainNode | null = null;
  private surfGain: GainNode | null = null;
  private tapeHissGain: GainNode | null = null;

  public init(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
      return;
    }
    if (this.isInitialized && this.ctx) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Warm Tape Hiss & Vinyl Warmth
      this.setupTapeWarmth();

      // 2. Procedural Ocean Surf Breaker
      this.setupOceanSurf();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  private setupTapeWarmth(): void {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);

    this.tapeHissGain = this.ctx.createGain();
    this.tapeHissGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.tapeHissGain);
    this.tapeHissGain.connect(this.masterGain);
    noise.start();
  }

  private setupOceanSurf(): void {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 3 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const surfSource = this.ctx.createBufferSource();
    surfSource.buffer = noiseBuffer;
    surfSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    this.surfGain = this.ctx.createGain();
    this.surfGain.gain.setValueAtTime(0.45, this.ctx.currentTime);

    surfSource.connect(filter);
    filter.connect(this.surfGain);
    this.surfGain.connect(this.masterGain);
    surfSource.start();
  }

  /**
   * Update ambient filtering according to depth (muffles high frequencies as you sink)
   */
  public updateDepthFilter(depthMeters: number): void {
    if (!this.ctx || !this.tapeHissGain || !this.surfGain) return;
    const frac = Math.max(0, Math.min(1, depthMeters / 10994));
    // As we dive deeper, surf sound fades and deep rumble emerges
    const surfVol = Math.max(0.05, 0.45 * (1 - frac * 0.8));
    this.surfGain.gain.setTargetAtTime(surfVol, this.ctx.currentTime, 0.2);
  }

  /**
   * Mechanical typewriter click on scroll steps
   */
  public playMechanicalTick(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(520, t);
      filter.Q.setValueAtTime(3.0, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Warm wooden marimba chime when opening specimen field note
   */
  public playSpecimenChime(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const delay = i * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + delay);

        gain.gain.setValueAtTime(0.001, t + delay);
        gain.gain.linearRampToValueAtTime(0.25, t + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.9);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t + delay);
        osc.stop(t + delay + 0.95);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Deep bell tone when crossing into a new oceanic zone
   */
  public playZoneChime(depthMeters: number): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const baseFreq = Math.max(65, 240 - (depthMeters / 10994) * 165);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 2.1);
    } catch {
      // ignore
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0.0 : 0.8;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const pelagiaAudio = new PelagiaAudioEngine();
