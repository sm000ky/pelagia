/**
 * Tactile Organic Lo-Fi & Mechanical Sound Engine
 * Synthesized 100% procedurally with Web Audio API. Zero external audio downloads.
 */

class PelagiaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // start muted by default, toggleable
  private isInitialized: boolean = false;

  private masterGain: GainNode | null = null;
  private tapeHissGain: GainNode | null = null;
  private oceanDroneOsc: OscillatorNode | null = null;
  private oceanDroneGain: GainNode | null = null;

  public init(): void {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Generate Lo-Fi Tape Warmth & Paper Texture
      this.setupTapeWarmth();

      // Deep Submerged Resonance
      this.setupOceanDrone();

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

    // Warm filtered pink noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Filter to warm tape hiss
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.tapeHissGain = this.ctx.createGain();
    this.tapeHissGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.tapeHissGain);
    this.tapeHissGain.connect(this.masterGain);
    noise.start();
  }

  private setupOceanDrone(): void {
    if (!this.ctx || !this.masterGain) return;

    this.oceanDroneOsc = this.ctx.createOscillator();
    this.oceanDroneOsc.type = 'sine';
    this.oceanDroneOsc.frequency.setValueAtTime(48, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.oceanDroneGain = this.ctx.createGain();
    this.oceanDroneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    this.oceanDroneOsc.connect(filter);
    filter.connect(this.oceanDroneGain);
    this.oceanDroneGain.connect(this.masterGain);
    this.oceanDroneOsc.start();
  }

  /**
   * Mechanical typewriter / flipbook click on scroll steps
   */
  public playMechanicalTick(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(740, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, t);
    filter.Q.setValueAtTime(2.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.045);
  }

  /**
   * Warm wooden marimba chime when opening specimen field note
   */
  public playSpecimenChime(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25]; // A major triad

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = i * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + delay);

      gain.gain.setValueAtTime(0.001, t + delay);
      gain.gain.linearRampToValueAtTime(0.12, t + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.85);
    });
  }

  /**
   * Deep bell tone when crossing into a new oceanic zone
   */
  public playZoneChime(depthMeters: number): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Deeper tone the deeper we are
    const baseFreq = Math.max(70, 260 - (depthMeters / 10994) * 180);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 1.9);
  }

  public toggleMute(): boolean {
    if (!this.ctx || !this.masterGain) {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }
    this.isMuted = !this.isMuted;
    const targetGain = this.isMuted ? 0.0 : 0.65;
    this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const pelagiaAudio = new PelagiaAudioEngine();
