import React, { useEffect, useState } from 'react';
import { Lightbulb, X, Radio } from 'lucide-react';
import { ZoneData } from '../types';
import { Translations } from '../lib/i18n';

interface CockpitOverlayProps {
  isActive: boolean;
  currentDepth: number;
  currentZone: ZoneData;
  t: Translations;
}

export const BathyscapheCockpitOverlay: React.FC<CockpitOverlayProps> = ({
  isActive,
  currentDepth,
  currentZone,
  t,
}) => {
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [showInstruction, setShowInstruction] = useState<boolean>(true);

  // Auto-dismiss instruction after 7 seconds
  useEffect(() => {
    if (isActive) {
      setShowInstruction(true);
      const timer = setTimeout(() => {
        setShowInstruction(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

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
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] border-[12px] sm:border-[24px] border-[#0D131A] rounded-[30px] sm:rounded-[50px]" />

      {/* Rivet Screws Around Perimeter */}
      <div className="absolute top-2 left-1/4 w-2.5 h-2.5 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute top-2 right-1/4 w-2.5 h-2.5 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute bottom-2 left-1/4 w-2.5 h-2.5 rounded-full bg-[#374151] border border-black/50" />
      <div className="absolute bottom-2 right-1/4 w-2.5 h-2.5 rounded-full bg-[#374151] border border-black/50" />

      {/* Halogen Spotlight Beam in Dark Zones (Illuminates sea where user moves mouse/touch) */}
      {isDarkZone && (
        <div
          className="absolute inset-0 transition-[background] duration-75"
          style={{
            background: `radial-gradient(circle 260px at ${spotlightPos.x}px ${spotlightPos.y}px, transparent 0%, rgba(3, 5, 8, 0.45) 55%, rgba(2, 3, 5, 0.88) 100%)`,
          }}
        />
      )}

      {/* Submersible Crosshairs in Center of Spotlight */}
      <div
        className="absolute w-20 h-20 border border-cyan-400/30 rounded-full pointer-events-none transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${spotlightPos.x}px`, top: `${spotlightPos.y}px` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-cyan-400/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-cyan-400/60" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-cyan-400/60" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-cyan-400/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
        </div>
      </div>

      {/* Compact, Non-Intrusive Floating Instruction Pill (Top Center, Auto-Hides or Dismissable) */}
      {showInstruction && (
        <div className="absolute top-14 sm:top-16 left-1/2 -translate-x-1/2 pointer-events-auto z-40 max-w-[90vw] sm:max-w-md">
          <div className="flex items-center justify-between gap-2.5 px-3.5 py-2 rounded-xl bg-[#0B0F14]/90 text-cyan-200 border border-cyan-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md font-mono text-[11px] animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{t.povHint}</span>
            </div>
            <button
              onClick={() => setShowInstruction(false)}
              className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
