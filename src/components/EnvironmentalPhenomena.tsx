import React, { useEffect, useRef } from 'react';
import { Sparkles, Radio, Film, X, SunMedium } from 'lucide-react';
import { pelagiaAudio } from '../lib/audioEngine';

interface EnvironmentalPhenomenaProps {
  isPlanktonActive: boolean;
  onTogglePlankton: (active?: boolean) => void;
  isTitanSwimming: boolean;
  onTitanFinish: () => void;
  is1930sMode: boolean;
  onToggle1930sMode: (active?: boolean) => void;
  isUVMode: boolean;
  onToggleUVMode: (active?: boolean) => void;
}

export const EnvironmentalPhenomena: React.FC<EnvironmentalPhenomenaProps> = ({
  isPlanktonActive,
  onTogglePlankton,
  isTitanSwimming,
  onTitanFinish,
  is1930sMode,
  onToggle1930sMode,
  isUVMode,
  onToggleUVMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // 1. BIOLUMINESCENT PLANKTON AURORA CANVAS
  useEffect(() => {
    if (!isPlanktonActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Initialize 65 bioluminescent particles
    const particleCount = 65;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.3 - Math.random() * 0.7, // gently drift upwards
      radius: 1.5 + Math.random() * 3.5,
      alpha: 0.3 + Math.random() * 0.7,
      pulseSpeed: 0.02 + Math.random() * 0.04,
      pulsePhase: Math.random() * Math.PI * 2,
      colorHue: Math.random() > 0.4 ? '160, 84%, 48%' : '187, 92%, 52%', // Emerald vs Cyan
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;

      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        // Swirl interaction towards cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 10) {
            // Gentle attraction and tangential vortex swirl
            const force = (1 - dist / 180) * 0.9;
            p.vx += (dx / dist) * force * 0.25 - (dy / dist) * force * 0.35;
            p.vy += (dy / dist) * force * 0.25 + (dx / dist) * force * 0.35;
          }
        }

        // Apply friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw glowing particle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `hsla(${p.colorHue}, ${currentAlpha})`);
        grad.addColorStop(0.4, `hsla(${p.colorHue}, ${currentAlpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.colorHue}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlanktonActive]);

  // 2. 120-METER TITAN LEVIATHAN TRANSIT TIMER
  useEffect(() => {
    if (!isTitanSwimming) return;
    const timer = setTimeout(() => {
      onTitanFinish();
    }, 14000); // 14-second majestic transit
    return () => clearTimeout(timer);
  }, [isTitanSwimming, onTitanFinish]);

  return (
    <>
      {/* ===================================================================
       * PHENOMENON A: BIOLUMINESCENT PLANKTON AURORA SWARM
       * =================================================================== */}
      {isPlanktonActive && (
        <div className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-1000">
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Floating dismiss badge */}
          <div className="absolute top-20 right-4 pointer-events-auto">
            <button
              onClick={() => onTogglePlankton(false)}
              className="px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-900 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-400 animate-spin" />
              <span>AURORA PLANKTON ACTIVE</span>
              <X className="w-3 h-3 ml-1 opacity-70 hover:opacity-100" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
       * PHENOMENON B: THE 120-METER TITAN LEVIATHAN BACKGROUND TRANSIT
       * =================================================================== */}
      {isTitanSwimming && (
        <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden flex items-center">
          <div className="relative w-full h-full flex items-center">
            {/* Screen tremor overlay */}
            <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[1px] animate-pulse" />

            {/* Giant Silhouette swimming right to left */}
            <div
              className="absolute left-full flex items-center select-none"
              style={{
                animation: 'titanSwim 13.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                width: '160vw',
                minWidth: '1300px',
              }}
            >
              <svg
                viewBox="0 0 1600 450"
                className="w-full h-auto text-[#07131F] drop-shadow-[0_0_80px_rgba(6,182,212,0.18)]"
                fill="currentColor"
                style={{ opacity: 0.88 }}
              >
                <defs>
                  <linearGradient id="titanEyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                  <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Massive Leviathan Body Profile */}
                <path d="M 220 220 C 350 120, 680 70, 1100 130 C 1350 170, 1500 230, 1580 250 C 1520 270, 1380 320, 1150 340 C 720 370, 420 340, 220 220 Z" />

                {/* Undulating Tail Flukes */}
                <path d="M 230 220 C 140 180, 50 90, 10 70 C 40 160, 90 220, 130 230 C 70 260, 20 340, 0 380 C 60 360, 150 280, 230 220 Z" />

                {/* Dorsal Armor Plates & Spines */}
                <path d="M 650 95 Q 690 35 730 85 Q 780 40 830 95 Q 890 50 950 105 Q 1010 65 1070 120" stroke="#050C14" strokeWidth="8" fill="none" />

                {/* Massive Pectoral Fin */}
                <path d="M 1120 260 C 1050 360, 940 440, 840 430 C 920 380, 1040 310, 1100 255 Z" opacity="0.9" />

                {/* Secondary Pelvic Fin */}
                <path d="M 520 280 C 460 340, 390 380, 340 370 C 390 330, 470 290, 510 275 Z" opacity="0.8" />

                {/* Giant Ancient Luminescent Eye */}
                <circle cx="1460" cy="205" r="9" fill="url(#titanEyeGlow)" filter="url(#eyeGlow)" />
                <circle cx="1460" cy="205" r="4" fill="#FFFFFF" />

                {/* Subtle bioluminescent belly vents */}
                <g opacity="0.6">
                  <ellipse cx="1250" cy="265" rx="14" ry="4" fill="#22D3EE" filter="url(#eyeGlow)" />
                  <ellipse cx="1180" cy="285" rx="16" ry="5" fill="#22D3EE" filter="url(#eyeGlow)" />
                  <ellipse cx="1100" cy="305" rx="18" ry="5" fill="#22D3EE" filter="url(#eyeGlow)" />
                  <ellipse cx="1010" cy="320" rx="16" ry="5" fill="#22D3EE" filter="url(#eyeGlow)" />
                  <ellipse cx="920" cy="330" rx="14" ry="4" fill="#22D3EE" filter="url(#eyeGlow)" />
                  <ellipse cx="830" cy="335" rx="12" ry="4" fill="#22D3EE" filter="url(#eyeGlow)" />
                </g>

                {/* School of tiny scatter fish swimming ahead */}
                <g opacity="0.75" fill="#FAF6EE">
                  <path d="M 1590 180 q 8 -4 14 0 q -6 4 -14 0 z" />
                  <path d="M 1610 210 q 7 -3 12 0 q -5 3 -12 0 z" />
                  <path d="M 1585 240 q 9 -4 16 0 q -7 4 -16 0 z" />
                  <path d="M 1630 195 q 8 -4 14 0 q -6 4 -14 0 z" />
                </g>
              </svg>
            </div>

            {/* Infrasound Acoustic Warning Pill */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <div className="px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-400/80 text-cyan-200 font-mono text-xs shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2.5 animate-bounce">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold tracking-wider">
                  BIO-ACOUSTIC CONTACT DETECTED: 120-METER TITAN LEVIATHAN
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
       * PHENOMENON C: 1930s BEEBE BATHYSPHERE VINTAGE ARCHIVE OVERLAY
       * =================================================================== */}
      {is1930sMode && (
        <div className="fixed inset-0 z-40 pointer-events-none select-none">
          {/* Sepia tone & paper grain filter */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: 'sepia(0.72) contrast(1.18) brightness(0.94)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Vignette border */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(30,20,10,0.65)_100%)]" />

          {/* Film scratches and 12-FPS flicker simulation */}
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,#000,#000_2px,transparent_2px,transparent_4px)] animate-pulse" />

          {/* 1930s Archive Stamp Badge */}
          <div className="absolute top-20 left-4 pointer-events-auto">
            <button
              onClick={() => onToggle1930sMode(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#3D2C1E] border-2 border-[#D4AF37] text-[#FAF3E0] font-mono text-xs font-bold shadow-paper flex items-center gap-2 cursor-pointer hover:bg-[#523C2B] transition-all"
            >
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>1930 ARCHIVE MODE // BEEBE EXPEDITION</span>
              <X className="w-3.5 h-3.5 ml-1 opacity-75" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
       * PHENOMENON D: UV BLACKLIGHT PHOSPHOR GLOW OVERLAY
       * =================================================================== */}
      {isUVMode && (
        <div className="fixed inset-0 z-35 pointer-events-none select-none">
          {/* Ultraviolet Blacklight ambient tint */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(88, 28, 135, 0.22)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Fluorescent glow pulse */}
          <div className="absolute top-20 left-4 pointer-events-auto">
            <button
              onClick={() => onToggleUVMode(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#3B0764] border-2 border-[#C084FC] text-[#F3E8FF] font-mono text-xs font-bold shadow-[0_0_20px_rgba(192,132,252,0.4)] flex items-center gap-2 cursor-pointer hover:bg-[#581C87] transition-all"
            >
              <SunMedium className="w-3.5 h-3.5 text-[#C084FC] animate-spin" />
              <span>UV BLACKLIGHT PHOSPHOR ACTIVE</span>
              <X className="w-3.5 h-3.5 ml-1 opacity-75" />
            </button>
          </div>
        </div>
      )}

      {/* Animation keyframes style */}
      <style>{`
        @keyframes titanSwim {
          0% {
            transform: translateX(0vw) translateY(40px);
          }
          50% {
            transform: translateX(-160vw) translateY(-30px);
          }
          100% {
            transform: translateX(-320vw) translateY(20px);
          }
        }
      `}</style>
    </>
  );
};
