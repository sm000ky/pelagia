import React, { useEffect, useRef, useState } from 'react';
import { pelagiaAudio } from '../lib/audioEngine';
import {
  AlertOctagon,
  ShieldAlert,
  Flame,
  Sparkles,
  ArrowUp,
  Star,
  Award,
  Unlock,
  Gauge,
  Hammer
} from 'lucide-react';
import { Translations } from '../lib/i18n';

interface ForbiddenAbyssProps {
  currentDepth: number;
  onScrollToTop: () => void;
  t: Translations;
}

export const ForbiddenAbyssSequence: React.FC<ForbiddenAbyssProps> = ({
  currentDepth,
  onScrollToTop,
  t,
}) => {
  const [hasTriggeredCosmic, setHasTriggeredCosmic] = useState<boolean>(false);
  const [overrideUnlocked, setOverrideUnlocked] = useState<boolean>(false);
  const [pressureVents, setPressureVents] = useState<number>(3);
  const [bedrockHits, setBedrockHits] = useState<number>(0);
  const [glassCracks, setGlassCracks] = useState<number>(0);
  const [leviathanPulseCount, setLeviathanPulseCount] = useState<number>(0);

  const playedWarning1 = useRef<boolean>(false);
  const playedWarning2 = useRef<boolean>(false);
  const playedWarning3 = useRef<boolean>(false);
  const playedCrack = useRef<boolean>(false);

  // Progressive sound cues triggered as depth reaches thresholds
  useEffect(() => {
    if (currentDepth > 11050 && !playedWarning1.current) {
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
    }
  }, [currentDepth, hasTriggeredCosmic]);

  // Handle interactive manual override toggle (Warning 1)
  const handleToggleOverride = () => {
    pelagiaAudio.playStampThud();
    setOverrideUnlocked(!overrideUnlocked);
  };

  // Handle venting pressure valve (Warning 2)
  const handleVentPressure = () => {
    pelagiaAudio.playPaperRustle();
    pelagiaAudio.playHullGroan();
    if (pressureVents > 0) {
      setPressureVents((v) => v - 1);
    }
  };

  // Handle striking bedrock (Warning 3)
  const handleStrikeBedrock = () => {
    pelagiaAudio.playStampThud();
    pelagiaAudio.playLeviathanRumble();
    setBedrockHits((h) => Math.min(3, h + 1));
  };

  // Handle shattering glass barrier (Warning 4)
  const handleShatterGlass = () => {
    pelagiaAudio.playGlassCrack();
    setGlassCracks((c) => Math.min(4, c + 1));
  };

  // Handle interacting with the Star Leviathan
  const handlePulseLeviathan = () => {
    pelagiaAudio.playCosmicSwell();
    pelagiaAudio.playLeviathanRumble();
    setLeviathanPulseCount((p) => p + 1);
  };

  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* ===================================================================
       * WARNING 1 (-11,050m to -11,400m): TECTONIC BEDROCK BARRICADE
       * Generous vertical spacing (min-h-[130vh]) to build anticipation
       * =================================================================== */}
      <div className="relative min-h-[130vh] py-32 px-4 flex flex-col items-center justify-center text-center">
        {/* Warning Hazard Stripes */}
        <div className="w-full max-w-2xl border-t-2 border-dashed border-amber-500/40 mb-8" />

        <div className="w-full max-w-2xl p-8 sm:p-10 rounded-2xl border-2 border-amber-500/70 bg-[#0F0D07]/95 text-amber-200 shadow-[0_0_40px_rgba(245,158,11,0.25)] space-y-5 paper-grain">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>{t.warning1Title}</span>
          </div>

          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            STOP SCROLLING DOWN
          </h3>

          <p className="font-serif text-base sm:text-lg text-amber-200/90 leading-relaxed italic max-w-lg mx-auto">
            "{t.warning1Desc}"
          </p>

          {/* Interactive Depth Lock Override */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={handleToggleOverride}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-paper-sm ${
                overrideUnlocked
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-amber-950/40 text-amber-300 border-amber-500/50 hover:bg-amber-900/40'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>{overrideUnlocked ? '✓ OVERRIDE ENGAGED' : 'PULL LEVER TO FORCE MANUAL OVERRIDE'}</span>
            </button>
            <span className="text-[11px] font-mono text-amber-400/70">
              {overrideUnlocked ? 'Bedrock lock disengaged. Descent permitted.' : 'Bathymetric safety lock active.'}
            </span>
          </div>
        </div>

        <div className="mt-16 text-center font-mono text-xs text-amber-500/60 tracking-widest uppercase">
          ↓ SCROLL DEEPER INTO UNCHARTED TECTONICS ↓
        </div>
      </div>

      {/* ===================================================================
       * WARNING 2 (-11,400m to -11,800m): HULL STRAIN & PRESSURE VALVE
       * Generous vertical spacing (min-h-[140vh])
       * =================================================================== */}
      <div className="relative min-h-[140vh] py-36 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl p-8 sm:p-12 rounded-2xl border-2 border-orange-500/80 bg-[#160905]/95 text-orange-200 shadow-[0_0_50px_rgba(249,115,22,0.3)] space-y-6 paper-grain">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/60 text-orange-300 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_14px_rgba(249,115,22,0.35)]">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span>{t.warning2Title}</span>
          </div>

          <h3 className="text-4xl sm:text-6xl font-serif font-bold text-orange-100 tracking-tight">
            ABORT DESCENT!
          </h3>

          <p className="font-serif text-base sm:text-xl text-orange-200 leading-relaxed italic max-w-lg mx-auto">
            "{t.warning2Desc}"
          </p>

          {/* Interactive Hydraulic Pressure Relief Valve */}
          <div className="p-4 rounded-xl border border-orange-500/40 bg-black/40 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-orange-300">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-orange-400" />
                <span>HYDRAULIC CRUST PRESSURE:</span>
              </span>
              <span className="font-bold text-orange-100 text-sm">
                {1140 + (3 - pressureVents) * 15} ATM
              </span>
            </div>

            <button
              onClick={handleVentPressure}
              disabled={pressureVents === 0}
              className={`w-full py-2.5 rounded-lg border font-bold uppercase tracking-wider transition-all cursor-pointer ${
                pressureVents === 0
                  ? 'bg-orange-500/20 border-orange-500/30 text-orange-400 cursor-default'
                  : 'bg-orange-950/60 border-orange-500 text-orange-200 hover:bg-orange-900/60 active:scale-98'
              }`}
            >
              {pressureVents > 0
                ? `💨 VENT HYDRAULIC PRESSURE VALVES (${pressureVents} REMAINING)`
                : '✓ ALL PRESSURE VALVES PURGED'}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center font-mono text-xs text-orange-500/60 tracking-widest uppercase">
          ↓ SCROLL TO FORCE SUBMERSIBLE THROUGH BEDROCK ↓
        </div>
      </div>

      {/* ===================================================================
       * WARNING 3 (-11,800m to -12,200m): SEISMIC FAULT STRIKE
       * Generous vertical spacing (min-h-[140vh])
       * =================================================================== */}
      <div className="relative min-h-[140vh] py-36 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl p-8 sm:p-12 rounded-2xl border-4 border-red-600 bg-[#1A0505] text-red-200 shadow-[0_0_70px_rgba(239,68,68,0.45)] space-y-6 paper-grain">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950 border-2 border-red-500 text-red-300 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <Flame className="w-4 h-4 text-red-400" />
            <span>{t.warning3Title}</span>
          </div>

          <h3 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            DO NOT TOUCH THE BOTTOM
          </h3>

          <div className="font-mono text-2xl sm:text-3xl text-red-400 font-bold tracking-widest">
            DEPTH: -12,??? METERS // ERR_OVERFLOW
          </div>

          <p className="font-serif text-base sm:text-xl text-red-200/90 leading-relaxed italic max-w-lg mx-auto">
            "{t.warning3Desc}"
          </p>

          {/* Interactive Bedrock Breach Strikes */}
          <div className="pt-2 flex flex-col items-center gap-2 font-mono text-xs">
            <button
              onClick={handleStrikeBedrock}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-red-500 bg-red-950/80 hover:bg-red-900 text-red-100 font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-95 cursor-pointer"
            >
              <Hammer className="w-4 h-4 text-red-400" />
              <span>
                {bedrockHits >= 3
                  ? '💥 TECTONIC FAULT RIPPED OPEN'
                  : `STRIKE BEDROCK TO SHATTER CRUST (${bedrockHits}/3)`}
              </span>
            </button>
            <div className="flex gap-2 mt-2">
              <span className={`w-3 h-3 rounded-full border border-red-500 ${bedrockHits >= 1 ? 'bg-red-500' : 'bg-transparent'}`} />
              <span className={`w-3 h-3 rounded-full border border-red-500 ${bedrockHits >= 2 ? 'bg-red-500' : 'bg-transparent'}`} />
              <span className={`w-3 h-3 rounded-full border border-red-500 ${bedrockHits >= 3 ? 'bg-red-500' : 'bg-transparent'}`} />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center font-mono text-xs text-red-500/60 tracking-widest uppercase">
          ↓ SCROLL TO THE FINAL BREACH ↓
        </div>
      </div>

      {/* ===================================================================
       * WARNING 4 (-12,200m to -12,600m): INTERACTIVE SHATTERING GLASS
       * Generous vertical spacing (min-h-[140vh])
       * =================================================================== */}
      <div className="relative min-h-[140vh] py-36 px-4 flex flex-col items-center justify-center text-center">
        <div
          onClick={handleShatterGlass}
          className="cursor-pointer group relative w-full max-w-xl p-8 sm:p-12 rounded-2xl border-4 border-dashed border-red-500 bg-black text-white space-y-6 shadow-[0_0_60px_rgba(239,68,68,0.4)] transition-transform hover:scale-102"
          title="Click to shatter the reality glass"
        >
          {/* Dynamic Spiderweb Glass Fracture Lines */}
          <svg viewBox="0 0 200 100" className="w-full h-28 text-red-500 stroke-current stroke-2 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" fill="none">
            <path d="M0 50 L45 42 L80 65 L120 30 L160 55 L200 48" />
            <path d="M80 65 L70 95 M120 30 L130 5 M45 42 L30 10 M160 55 L175 90" />
            {glassCracks >= 1 && <path d="M45 42 L60 20 M80 65 L95 80" strokeWidth="2.5" />}
            {glassCracks >= 2 && <path d="M120 30 L140 15 M160 55 L180 75" strokeWidth="3" />}
            {glassCracks >= 3 && <path d="M0 20 L45 42 L20 80 M200 80 L160 55 L180 20" strokeWidth="3.5" />}
          </svg>

          <div className="text-3xl sm:text-5xl font-mono font-bold text-red-500 tracking-tight">
            [{t.warning4Title}]
          </div>

          <p className="font-mono text-xs sm:text-sm text-red-300 tracking-widest uppercase">
            {t.warning4Desc}
          </p>

          <div className="inline-block px-4 py-1.5 rounded-full bg-red-950 border border-red-500 text-[11px] font-mono text-red-200">
            🔍 TAP SCREEN TO CRACK VIEWPORT ({glassCracks}/4)
          </div>
        </div>

        <div className="mt-16 text-center font-mono text-xs text-red-500/70 tracking-widest uppercase">
          ↓ SCROLL PAST THE REALITY HORIZON ↓
        </div>
      </div>

      {/* ===================================================================
       * STAGE 5 (-12,600m+): THE MINDBLOWING CLIMAX — THE SUBTERRANEAN STAR SEA!
       * Majestic Celestial Space with Parallax, Starlight Auroras, & Leviathan
       * =================================================================== */}
      <div
        id="celestial-core"
        className="relative min-h-[160vh] py-36 px-4 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, #1E1B4B 0%, #0F172A 35%, #020617 100%)`,
        }}
      >
        {/* Layered Celestial Papercraft Aurora Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-30 pointer-events-none" />

        {/* Vast Luminous Celestial Aureole (Zero Kelap-Kelip) */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-3xl pointer-events-none shadow-[0_0_120px_rgba(6,182,212,0.25)]" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-500/15 blur-2xl pointer-events-none shadow-[0_0_90px_rgba(245,158,11,0.25)]" />

        {/* Concentric Celestial Starlight Horizon Rings */}
        <div className="absolute w-[800px] h-[800px] rounded-full border border-cyan-500/15 pointer-events-none" />
        <div className="absolute w-[1100px] h-[1100px] rounded-full border border-amber-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          {/* Transcendent Medallion Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border-2 border-[#F59E0B] text-[#FDE68A] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.35)]">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            <span>TRANSCENDENT HORIZON // THE INNER STAR SEA</span>
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          </div>

          {/* Colossal 140-Meter Star Leviathan with Sinuous Stop-Motion undulation */}
          <div
            onClick={handlePulseLeviathan}
            className="cursor-pointer group relative my-6 py-8 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
            title="Touch the Star Leviathan to harmonize celestial frequencies"
          >
            {/* The Ancient Leviathan of Earth's Core */}
            <svg
              viewBox="0 0 360 200"
              className="w-full max-w-2xl h-auto drop-shadow-[0_0_45px_rgba(245,158,11,0.6)] animate-leviathan"
              fill="none"
            >
              {/* Solar Sail Wing Flaps */}
              <g className="origin-[140px_85px] animate-manta-wing">
                <path d="M140 85 C110 20, 50 5, 10 25 C40 65, 95 80, 140 85 Z" fill="#F59E0B" fillOpacity="0.85" stroke="#FEF3C7" strokeWidth="3" />
              </g>
              <g className="origin-[140px_105px] animate-manta-wing">
                <path d="M140 105 C110 170, 50 185, 10 165 C40 125, 95 110, 140 105 Z" fill="#F59E0B" fillOpacity="0.85" stroke="#FEF3C7" strokeWidth="3" />
              </g>

              {/* Segmented Torpedo Fuselage */}
              <path d="M35 95 C35 50, 150 40, 310 95 C250 140, 150 140, 35 95 Z" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4.5" />

              {/* Glowing Rib Constellations */}
              <path d="M75 95 C120 78, 210 78, 270 95" stroke="#38BDF8" strokeWidth="3.5" strokeDasharray="6 4" />
              <path d="M85 105 C130 115, 200 115, 250 105" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 4" />

              {/* Celestial Tail Ribbons */}
              <path d="M310 95 L355 55 L342 95 L358 135 L315 108 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="3.5" />

              {/* Starlight Beacon Eye */}
              <circle cx="65" cy="86" r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="65" cy="86" r="2.5" fill="#FFFFFF" />
            </svg>

            <div className="mt-4 px-4 py-1.5 rounded-full bg-white/10 text-[#FDE68A] font-mono text-xs border border-[#F59E0B]/50 shadow-paper-sm flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>TAP LEVIATHAN TO COMMUNE ({leviathanPulseCount} CHANTS PLAYED)</span>
            </div>
          </div>

          {/* Title & Lore */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-7xl font-serif font-bold text-white tracking-tight">
              {t.starSeaTitle}
            </h2>
            <div className="font-mono text-xl sm:text-2xl text-[#38BDF8] font-bold">
              {t.starSeaSubtitle}
            </div>
            <p className="font-serif text-lg sm:text-2xl text-[#CBD5E1] max-w-2xl mx-auto italic leading-relaxed">
              "{t.starSeaDesc}"
            </p>
          </div>

          {/* Transcendent Certificate Plaque */}
          <div className="p-7 sm:p-10 rounded-2xl border-2 border-[#F59E0B] bg-[#0A0E1A]/95 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-left font-mono space-y-5 max-w-2xl mx-auto paper-grain">
            <div className="flex items-center justify-between border-b border-[#F59E0B]/30 pb-3">
              <div className="text-xs sm:text-sm text-[#F59E0B] font-bold uppercase tracking-widest flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>EXPEDITION TRANSCENDED // SECRET SPECIES #51</span>
              </div>
              <span className="text-xs text-cyan-300 font-bold">STATUS: ETERNAL</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider">LIVING PHENOMENON:</div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {t.titanName}
              </div>
              <div className="text-xs sm:text-sm text-amber-300 italic">
                {t.titanTaxon}
              </div>
            </div>

            <p className="font-serif text-base text-slate-300 leading-relaxed italic border-l-2 border-[#F59E0B] pl-3.5">
              "{t.titanLore}"
            </p>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div>AUTHORS & DIVERS: <strong className="text-white">sm000ky × Zero Two</strong></div>
              <div className="text-[#38BDF8] font-bold">BATHYMETRIC OVERRIDE COMPLETE</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={onScrollToTop}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#D95A47] hover:bg-[#E06D53] text-white font-mono text-xs sm:text-sm font-bold transition-all shadow-paper active:translate-y-0.5 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{t.surfaceButton}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
