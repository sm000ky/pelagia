import React, { useEffect, useState } from 'react';
import { Lightbulb, Compass, Radio, Gauge } from 'lucide-react';
import { ZoneData } from '../types';

interface CockpitOverlayProps {
  isActive: boolean;
  currentDepth: number;
  currentZone: ZoneData;
}

export const BathyscapheCockpitOverlay: React.FC<CockpitOverlayProps> = ({
  isActive,
  currentDepth,
  currentZone,
}) => {
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setSpotlightPos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setSpotlightPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  const isDarkZone =
    currentZone.id === 'midnight' || currentZone.id === 'abyss' || currentZone.id === 'hadal';

  return (
    <div className="fixed inset-0 z-30 pointer-events-none select-none transition-opacity duration-500 overflow-hidden">
      {/* Submarine Viewport Circular Hull Frame (Heavy Titanium Rivets) */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] border-[18px] sm:border-[28px] border-[#101720] rounded-[40px] sm:rounded-[60px]" />

      {/* Rivet Screws Around Perimeter */}
      <div className="absolute top-3 left-1/4 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute top-3 right-1/4 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute bottom-3 left-1/4 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute bottom-3 right-1/4 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute left-3 top-1/3 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute left-3 bottom-1/3 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute right-3 top-1/3 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute right-3 bottom-1/3 w-3 h-3 rounded-full bg-[#374151] border border-black/50" />

      {/* Halogen Spotlight Beam in Dark Zones (Illuminates sea where user moves mouse/touch) */}
      {isDarkZone && (
        <div
          className="absolute inset-0 transition-[background] duration-75"
          style={{
            background: `radial-gradient(circle 260px at ${spotlightPos.x}px ${spotlightPos.y}px, transparent 0%, rgba(3, 5, 8, 0.45) 55%, rgba(2, 3, 5, 0.88) 100%)`,
          }}
        />
      )}

      {/* Submersible Telemetry Crosshairs in Center */}
      <div
        className="absolute w-24 h-24 border border-cyan-400/30 rounded-full pointer-events-none transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${spotlightPos.x}px`, top: `${spotlightPos.y}px` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/60" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-cyan-400/60" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-cyan-400/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
        </div>
      </div>

      {/* Cockpit Status Overlay HUD (Bottom Left) */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 font-mono text-[10px] text-cyan-300 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>BATHYSCAPHE COCKPIT // POV ACTIVE</span>
        </div>
        <div className="text-cyan-200/80">
          SPOTLIGHT: HALOGEN 24,000 LUMENS
        </div>
        <div className="text-cyan-400 font-bold">
          AIM WITH CURSOR / TOUCH TO ILLUMINATE BIOTA
        </div>
      </div>
    </div>
  );
};
