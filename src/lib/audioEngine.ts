/**
 * Pelagia Ocean & Papercraft Sound Engine
 * Hybrid: Real Ocean Ambient Audio Loop + Web Audio Biquad Depth Filter + Procedural Tactile Sound FX
 * Zero external audio libraries. 100% browser native.
 */

class PelagiaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  private masterGain: GainNode | null = null;
  private oceanFilter: BiquadFilterNode | null = null;
  private oceanGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private mediaSourceNode: MediaElementAudioSourceNode | null = null;
  private isAudioElementPlaying: boolean = false;

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
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.85, this.ctx.currentTime);

      // Visualizer Analyser
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Depth Biquad Lowpass Filter for Ocean Ambient
      this.oceanFilter = this.ctx.createBiquadFilter();
      this.oceanFilter.type = 'lowpass';
      this.oceanFilter.frequency.setValueAtTime(12000, this.ctx.currentTime);
      this.oceanFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);

      this.oceanGain = this.ctx.createGain();
      this.oceanGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

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

      // Connect media element into Web Audio graph for real-time depth filtering
      this.mediaSourceNode = this.ctx.createMediaElementSource(this.audioElement);
      this.mediaSourceNode.connect(this.oceanFilter);

      if (!this.isMuted) {
        this.audioElement.play().then(() => {
          this.isAudioElementPlaying = true;
        }).catch(() => {
          // Handled on first user interaction
        });
      }
    } catch (e) {
      console.warn('Could not hook ocean-ambient.mp3 into AudioContext:', e);
    }
  }

  /**
   * Dynamically adjust lowpass filter and sub-bass resonance as user dives
   */
  public updateDepthFilter(depthMeters: number): void {
    if (!this.ctx || !this.oceanFilter || !this.oceanGain) return;

    // Depth: -10m to 10,994m
    const frac = Math.max(0, Math.min(1, Math.max(0, depthMeters) / 10994));

    // Frequency cutoff transitions from bright surface (12,000 Hz) down to deep trench rumble (320 Hz)
    const cutoff = Math.max(320, 12000 * Math.pow(0.026, frac));
    this.oceanFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.25);

    // Q resonance increases slightly at depth for hydrophone hull feel
    const resonance = 1.0 + frac * 2.5;
    this.oceanFilter.Q.setTargetAtTime(resonance, this.ctx.currentTime, 0.25);
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
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0.0 : 0.85, this.ctx.currentTime, 0.1);
    }

    if (this.audioElement) {
      if (!this.isMuted) {
        this.audioElement.play().then(() => {
          this.isAudioElementPlaying = true;
        }).catch(() => {});
      } else {
        this.audioElement.pause();
        this.isAudioElementPlaying = false;
      }
    }

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Gentle, satisfying underwater bubble sound on specimen hover/interaction
   */
  public playWaterBubble(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch bend upwards mimicking bubble release
      const baseFreq = 380 + Math.random() * 160;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.9, t + 0.12);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
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
   * Tactile paper rustle sound when opening or closing field journal notebooks
   */
  public playPaperRustle(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(1.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(t);
    } catch {
      // ignore
    }
  }

  /**
   * Satisfying vintage wax/ink seal stamp thud when recording a specimen into the logbook
   */
  public playStampThud(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      // Heavy body thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(32, t + 0.18);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.25);

      // Paper click snap
      this.playPaperRustle();
    } catch {
      // ignore
    }
  }

  /**
   * Resonant atmospheric sonar chime when crossing major bathymetric ocean zones
   */
  public playZoneChime(depthMeters: number): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Deeper depth -> deeper resonant chime frequency
      const freq = Math.max(140, 520 - (depthMeters / 10994) * 360);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.24, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.7);
    } catch {
      // ignore
    }
  }

  /**
   * Specimen inspection chime
   */
  public playSpecimenChime(): void {
    this.playPaperRustle();
    this.playWaterBubble();
  }
}

export const pelagiaAudio = new PelagiaAudioEngine();
