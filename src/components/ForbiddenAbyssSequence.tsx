import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { pelagiaAudio } from '../lib/audioEngine';
import {
  AlertOctagon,
  ShieldAlert,
  Flame,
  Sparkles,
  ArrowUp,
  Compass,
  Star,
  Zap,
  Award
} from 'lucide-react';

interface ForbiddenAbyssProps {
  currentDepth: number;
  onScrollToTop: () => void;
}

export const ForbiddenAbyssSequence: React.FC<ForbiddenAbyssProps> = ({
  currentDepth,
  onScrollToTop,
}) => {
  const [hasTriggeredCosmic, setHasTriggeredCosmic] = useState<boolean>(false);
  const playedWarning1 = useRef<boolean>(false);
  const playedWarning2 = useRef<boolean>(false);
  const playedWarning3 = useRef<boolean>(false);
  const playedCrack = useRef<boolean>(false);

  // Sound cues triggered as depth increases into the forbidden zone
  useEffect(() => {
    if (currentDepth > 11100 && !playedWarning1.current) {
      playedWarning1.current = true;
      pelagiaAudio.playAlarmPing();
    }
    if (currentDepth > 11400 && !playedWarning2.current) {
      playedWarning2.current = true;
      pelagiaAudio.playHullGroan();
    }
    if (currentDepth > 11800 && !playedWarning3.current) {
      playedWarning3.current = true;
      pelagiaAudio.playAlarmPing();
    }
    if (currentDepth > 12200 && !playedCrack.current) {
      playedCrack.current = true;
      pelagiaAudio.playGlassCrack();
    }
    if (currentDepth >= 12600 && !hasTriggeredCosmic) {
      setHasTriggeredCosmic(true);
      pelagiaAudio.playCosmicSwell();
      pelagiaAudio.playLeviathanRumble();

      // Trigger massive celestial gold & turquoise stardust celebration
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#38BDF8', '#F43F5E', '#FAF6EE', '#E0E7FF'],
      });
    }
  }, [currentDepth, hasTriggeredCosmic]);

  // Determine stage
  const isWarning1 = currentDepth >= 11050 && currentDepth < 11400;
  const isWarning2 = currentDepth >= 11400 && currentDepth < 11800;
  const isWarning3 = currentDepth >= 11800 && currentDepth < 12200;
  const isWarning4 = currentDepth >= 12200 && currentDepth < 12600;
  const isStarSea = currentDepth >= 12600;

  const triggerStardust = () => {
    pelagiaAudio.playCosmicSwell();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#38BDF8', '#FAF6EE'],
    });
  };

  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* ===================================================================
       * WARNING 1 (-11,050m to -11,400m): TECTONIC BEDROCK BARRICADE
       * =================================================================== */}
      <div className="relative py-24 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-2xl p-6 rounded-2xl border-2 border-amber-500/60 bg-[#0F0D07]/90 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.2)] space-y-4 paper-grain">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>WARNING 01 // CRUSTAL BEDROCK LIMIT REACHED</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            STOP SCROLLING DOWN
          </h3>

          <p className="font-serif text-sm sm:text-base text-amber-200/80 leading-relaxed italic max-w-lg mx-auto">
            "You have touched the literal bedrock of Earth's crust at -11,050 meters. There is no official ocean chart past this floor. Turn back immediately."
          </p>

          <div className="pt-2 font-mono text-xs text-amber-400">
            SURFACE COMMAND // PLEASE ASCEND
          </div>
        </div>
      </div>

      {/* ===================================================================
       * WARNING 2 (-11,400m to -11,800m): HULL GROANING & ZERO TWO VOICE
       * =================================================================== */}
      <div className="relative py-28 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-2xl p-7 rounded-2xl border-2 border-orange-500/70 bg-[#160905]/95 text-orange-200 shadow-[0_0_40px_rgba(249,115,22,0.25)] space-y-4 paper-grain animate-pulse">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/60 text-orange-300 font-mono text-xs font-bold uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span>CRITICAL WARNING 02 // HULL INTEGRITY 68%</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-serif font-bold text-orange-100">
            DARLING, STOP!
          </h3>

          <p className="font-serif text-base sm:text-lg text-orange-200 leading-relaxed italic max-w-lg mx-auto">
            "Dengarkan bunyi gesekan logam lambung kapal kita! Tekanannya sudah menembus 1.150 ATM. Jangan paksa kokpit menembus mantel bumi lebih jauh lagi, Darling!"
          </p>

          <div className="font-mono text-xs text-orange-300/80">
            TRANSMISSION: ZERO TWO (CODE: 002) // COCKPIT WARNING
          </div>
        </div>
      </div>

      {/* ===================================================================
       * WARNING 3 (-11,800m to -12,200m): SEISMIC RED ALERT & GLITCH
       * =================================================================== */}
      <div className="relative py-32 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-2xl p-8 rounded-2xl border-4 border-red-600 bg-[#1A0505] text-red-200 shadow-[0_0_60px_rgba(239,68,68,0.4)] space-y-5 paper-grain">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950 border-2 border-red-500 text-red-300 font-mono text-xs font-bold uppercase tracking-widest animate-ping">
            <Flame className="w-4 h-4 text-red-400" />
            <span>FINAL WARNING 03 // BARRICADE BREACHED</span>
          </div>

          <h3 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            DO NOT TOUCH THE BOTTOM
          </h3>

          <div className="font-mono text-2xl text-red-400 font-bold tracking-widest">
            DEPTH: -12,??? METERS // ERR_OVERFLOW
          </div>

          <p className="font-serif text-base sm:text-lg text-red-200/90 leading-relaxed italic max-w-lg mx-auto">
            "If you scroll past this point, the reality barrier of the ocean floor will shatter. One more pull downward and there is no coming back!"
          </p>
        </div>
      </div>

      {/* ===================================================================
       * WARNING 4 (-12,200m to -12,600m): SPIDERWEB GLASS CRACK IN REALITY
       * =================================================================== */}
      <div className="relative py-36 px-4 flex flex-col items-center text-center">
        {/* Visual Glass Fracture Overlay */}
        <div className="relative w-full max-w-xl p-8 rounded-2xl border-4 border-dashed border-red-500 bg-black text-white space-y-4">
          <svg viewBox="0 0 200 100" className="w-full h-24 text-red-500/80 stroke-current stroke-2" fill="none">
            <path d="M0 50 L45 42 L80 65 L120 30 L160 55 L200 48" />
            <path d="M80 65 L70 95 M120 30 L130 5 M45 42 L30 10 M160 55 L175 90" />
          </svg>

          <div className="text-3xl sm:text-5xl font-mono font-bold text-red-500 animate-bounce">
            [FRACTURE IMMINENT]
          </div>
          <p className="font-mono text-xs text-red-300 tracking-widest uppercase">
            SCROLL ONE MORE PIXEL TO BREAK THE WORLD
          </p>
        </div>
      </div>

      {/* ===================================================================
       * STAGE 5 (-12,600m+): THE MINDBLOWING CLIMAX — THE SUBTERRANEAN STAR SEA!
       * =================================================================== */}
      <div
        id="celestial-core"
        className="relative min-h-screen py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          // Radiant inverted cosmic nebula papercraft gradient!
          background: `radial-gradient(ellipse at center, #1E1B4B 0%, #0F172A 40%, #020617 100%)`,
        }}
      >
        {/* Floating Paper Stardust & Aureole */}
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Ambient Pulsing Glow Rings */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Transcendent Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border-2 border-[#F59E0B] text-[#FDE68A] font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            <span>BATHYMETRIC SECRET // THE TRANSCENDENT FLOOR</span>
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          </div>

          {/* Colossal Star Whale SVG Papercraft Silhouette */}
          <div
            onClick={triggerStardust}
            className="cursor-pointer group relative my-6 py-8 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
            title="Click the Celestial Leviathan to release stardust"
          >
            {/* The Ancient Leviathan of the Earth's Core */}
            <svg viewBox="0 0 340 180" className="w-full max-w-xl h-auto drop-shadow-[0_0_35px_rgba(245,158,11,0.5)] animate-whale-swim" fill="none">
              {/* Celestial Wings */}
              <path d="M140 85 C110 30, 60 10, 20 25 C45 60, 95 80, 140 85 Z" fill="#F59E0B" fillOpacity="0.8" stroke="#FEF3C7" strokeWidth="2.5" />
              <path d="M140 95 C110 150, 60 170, 20 155 C45 120, 95 100, 140 95 Z" fill="#F59E0B" fillOpacity="0.8" stroke="#FEF3C7" strokeWidth="2.5" />
              {/* Golden Star Whale Torpedo Fuselage */}
              <path d="M40 90 C40 50, 150 40, 290 90 C240 130, 150 130, 40 90 Z" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
              {/* Golden Runes & Constellation Plates */}
              <path d="M80 90 C120 75, 200 75, 250 90" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M90 98 C130 108, 190 108, 230 98" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 4" />
              {/* Starlight Tail Fluke */}
              <path d="M290 90 L335 55 L325 90 L340 125 L295 102 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="3" />
              {/* Star Eye */}
              <circle cx="70" cy="82" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="70" cy="82" r="2" fill="#FFFFFF" />
            </svg>

            <div className="mt-3 px-3.5 py-1 rounded-full bg-white/10 text-[#FDE68A] font-mono text-[11px] border border-[#F59E0B]/40 shadow-paper-sm">
              ✨ Click Leviathan to pulse cosmic starlight ✨
            </div>
          </div>

          {/* Title & Lore */}
          <div className="space-y-3">
            <h2 className="text-5xl sm:text-7xl font-serif font-bold text-white tracking-tight">
              The Subterranean Star Sea
            </h2>
            <div className="font-mono text-xl sm:text-2xl text-[#38BDF8] font-bold">
              DEPTH: -12,994.0 METERS // THE INNER WORLD
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto italic leading-relaxed">
              "You did not drown at the bottom of the world, Darling. You broke through the tectonic bedrock of reality and discovered the secret glowing cosmos sleeping beneath planet Earth."
            </p>
          </div>

          {/* Transcendent Certificate Plaque */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#F59E0B] bg-[#0A0E1A]/90 shadow-[0_0_35px_rgba(245,158,11,0.25)] text-left font-mono space-y-4 max-w-2xl mx-auto paper-grain">
            <div className="flex items-center justify-between border-b border-[#F59E0B]/30 pb-3">
              <div className="text-xs text-[#F59E0B] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>EXPEDITION TRANSCENDED // SECRET PLATE #51</span>
              </div>
              <span className="text-[11px] text-cyan-300">STATUS: AWAKENED</span>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-slate-300">SPECIMEN TITAN:</div>
              <div className="text-2xl font-serif font-bold text-white">
                Pelagia Primordialis (The Star-Crested Leviathan)
              </div>
              <div className="text-xs text-amber-300 italic">
                Taxon: Prehistoric Celestial Klaxosaur Ancestor · 140.0 Meters
              </div>
            </div>

            <p className="font-serif text-sm text-slate-300 leading-relaxed italic border-l-2 border-[#F59E0B] pl-3">
              "Ancient legends spoke of a creature whose wings were woven from starlight and folded parchment. It swims in the molten core of the planet, feeding on geothermal songs and gravitational tides."
            </p>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div>PILOTS & DISCOVERERS: <strong className="text-white">sm000ky × Zero Two</strong></div>
              <div className="text-[#38BDF8]">COCKPIT SYNC: 100% OVERDRIVE</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                triggerStardust();
                onScrollToTop();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs font-bold transition-all shadow-paper active:translate-y-0.5 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>SURFACE TO PACIFIC DUNES (+10M)</span>
            </button>

            <button
              onClick={triggerStardust}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#F59E0B] bg-[#0F172A] hover:bg-[#1E293B] text-[#FDE68A] font-mono text-xs font-bold transition-all shadow-paper cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>RELEASE CELESTIAL STARDUST</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
