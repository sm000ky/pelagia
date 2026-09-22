import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  Hand,
  Volume2,
  Radio,
  Film,
  SunMedium,
  Flame,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApocryphalRelic } from '../types';
import { APOCRYPHAL_RELICS } from '../data/relicsData';
import { pelagiaAudio } from '../lib/audioEngine';

interface SecretNotificationProps {
  toast: { title: string; relicNumber: string; depthText: string } | null;
  onDismiss: () => void;
  relicsCount: number;
  totalRelics: number;
}

export const SecretNotificationToast: React.FC<SecretNotificationProps> = ({
  toast,
  onDismiss,
  relicsCount,
  totalRelics,
}) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none animate-in slide-in-from-bottom-5 duration-300">
      <div className="px-5 py-3 rounded-2xl bg-[#1E252B]/95 text-[#FAF6EE] border-2 border-[#EAA838] shadow-[0_0_30px_rgba(234,168,56,0.45)] backdrop-blur-md flex items-center gap-3.5 paper-grain">
        <div className="w-9 h-9 rounded-xl bg-[#EAA838] text-[#1E252B] flex items-center justify-center font-bold flex-shrink-0 shadow-sm animate-bounce">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="text-left font-mono">
          <div className="text-[10px] text-[#EAA838] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <span>RAHASIA SAMUDRA TERUNGKAP!</span>
            <span>·</span>
            <span>{relicsCount}/{totalRelics}</span>
          </div>
          <div className="font-serif font-bold text-sm sm:text-base text-white tracking-tight">
            {toast.title}
          </div>
          <div className="text-[10px] opacity-70">
            {toast.relicNumber} ({toast.depthText}) — Tersimpan di Logbook & Diploma
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// 1. AERIAL CLOUD (+12m) — The Folding Cloud & Jian Origami Albatross
// =========================================================================
export const InWorldPaperCloud: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
}> = ({ isUnlocked, onUnlock }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-albatross')!;
  const [isOpened, setIsOpened] = useState<boolean>(isUnlocked);

  const handleOpen = () => {
    if (isOpened) return;
    pelagiaAudio.playPaperRustle();
    setIsOpened(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.3 }, colors: ['#EAA838', '#D95A47', '#FAF6EE'] });
    onUnlock(relic);
  };

  return (
    <div
      id="relic-albatross"
      onClick={handleOpen}
      className={`group relative mx-auto my-6 p-4 max-w-sm rounded-2xl transition-all duration-300 select-none cursor-pointer flex flex-col items-center text-center ${
        isOpened ? 'bg-amber-100/30' : 'hover:scale-105'
      }`}
    >
      <div className="relative w-44 h-24 flex items-center justify-center">
        {/* Cloud Wings (Left & Right halves) */}
        <div
          className={`absolute inset-0 flex items-center justify-between transition-transform duration-700 ease-out pointer-events-none ${
            isOpened ? '-translate-x-12 opacity-30 scale-90' : 'translate-x-0 opacity-100'
          }`}
        >
          <svg viewBox="0 0 100 60" className="w-24 h-16 text-[#FAF6EE] filter drop-shadow" fill="currentColor">
            <path d="M10 45 Q20 20 45 25 Q60 10 75 30 Q90 25 95 45 Z" />
          </svg>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-end transition-transform duration-700 ease-out pointer-events-none ${
            isOpened ? 'translate-x-12 opacity-30 scale-90' : 'translate-x-0 opacity-100'
          }`}
        >
          <svg viewBox="0 0 100 60" className="w-24 h-16 text-[#FAF6EE] filter drop-shadow" fill="currentColor">
            <path d="M10 45 Q25 25 45 30 Q65 15 80 25 Q95 20 90 45 Z" />
          </svg>
        </div>

        {/* Hidden Jian Albatross Bird inside */}
        <div
          className={`transition-all duration-700 flex flex-col items-center ${
            isOpened ? 'scale-110 opacity-100 animate-bounce' : 'scale-50 opacity-0'
          }`}
        >
          <svg viewBox="0 0 60 40" className="w-16 h-12 text-[#D95A47]" fill="currentColor">
            <polygon points="5,25 55,25 45,35 15,35" />
            <polygon points="30,5 30,22 12,22" fill="#FAF6EE" stroke="#1E252B" strokeWidth="1.5" />
            <polygon points="32,8 48,22 32,22" fill="#EAA838" stroke="#1E252B" strokeWidth="1.5" />
          </svg>
          <Sparkles className="w-4 h-4 text-[#EAA838] animate-spin" />
        </div>
      </div>

      {/* Tactile Cue */}
      <div className="mt-2 font-mono text-[10px] font-bold">
        {isOpened ? (
          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>BURUNG JIAN MENGUDARA (+12M)</span>
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-[#FAF6EE] text-[#D95A47] border border-[#D95A47] shadow-paper-sm flex items-center gap-1.5 animate-pulse">
            <Hand className="w-3 h-3" />
            <span>BELAH AWAN KERTAS DI LANGIT</span>
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 2. SUNLIGHT REEF (-110m) — The Shy Giant Clam Opening to Reveal Treasure
// =========================================================================
export const InWorldGiantClam: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
}> = ({ isUnlocked, onUnlock }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-cutlass')!;
  const [isOpen, setIsOpen] = useState<boolean>(isUnlocked);

  const handleToggleClam = () => {
    pelagiaAudio.playWaterBubble();
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      pelagiaAudio.playSpecimenChime();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.4 }, colors: ['#EAA838', '#2F6D68', '#FAF6EE'] });
      onUnlock(relic);
    }
  };

  return (
    <div
      id="relic-cutlass"
      onClick={handleToggleClam}
      className="relative mx-auto my-12 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none cursor-pointer group transition-transform hover:scale-105"
    >
      <div className="relative w-44 h-32 flex items-center justify-center">
        {/* Bottom Clam Shell */}
        <div className="absolute bottom-2 w-36 h-18 rounded-b-full bg-[#D4A373] border-2 border-[#1E252B] shadow-inner" />

        {/* Revealed Saber / Glowing Pearl inside */}
        <div
          className={`absolute bottom-4 z-10 transition-all duration-500 flex flex-col items-center ${
            isOpen ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-50 translate-y-4'
          }`}
        >
          <svg viewBox="0 0 40 40" className="w-12 h-12 text-[#EAA838] filter drop-shadow-[0_0_12px_rgba(234,168,56,0.8)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M8 32 L28 12 M28 12 C32 8, 34 8, 32 14 L18 28" />
            <circle cx="9" cy="31" r="3" fill="#D95A47" />
            <path d="M6 34 L12 28" />
          </svg>
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-300 via-white to-amber-200 shadow-[0_0_15px_#fff] animate-pulse" />
        </div>

        {/* Top Clam Shell (Hinges upward when open!) */}
        <div
          className={`absolute top-2 w-36 h-18 rounded-t-full bg-[#E6CCB2] border-2 border-[#1E252B] origin-bottom transition-all duration-500 shadow-md ${
            isOpen ? '-rotate-45 -translate-y-6' : 'rotate-0 translate-y-4'
          }`}
        >
          {/* Shell Ribs */}
          <div className="w-full h-full flex justify-around px-4 pt-2 opacity-40">
            <div className="w-0.5 h-10 bg-[#1E252B]" />
            <div className="w-0.5 h-12 bg-[#1E252B]" />
            <div className="w-0.5 h-10 bg-[#1E252B]" />
          </div>
        </div>
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {isOpen ? (
          <span className="text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>KERANG RAKSASA TERBUKA (-110M)</span>
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-[#EDF7F5] text-[#2F6D68] border border-[#50857D] shadow-paper-sm flex items-center gap-1.5 animate-pulse">
            <Hand className="w-3 h-3" />
            <span>BUKA CANGKANG KERANG RAKSASA</span>
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 3. TWILIGHT GLOOM (-680m) — The Liftable Basalt Rock Hiding Emerald Flask!
// =========================================================================
export const InWorldLiftableRock: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
  onTriggerPlankton: () => void;
}> = ({ isUnlocked, onUnlock, onTriggerPlankton }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-bottle')!;
  const [isLifted, setIsLifted] = useState<boolean>(isUnlocked);

  const handleLiftRock = () => {
    pelagiaAudio.playWaxSquash();
    setIsLifted(true);
    confetti({ particleCount: 45, spread: 65, origin: { y: 0.5 }, colors: ['#10B981', '#34D399', '#FAF6EE'] });
    onUnlock(relic);
  };

  const handlePopCork = (e: React.MouseEvent) => {
    e.stopPropagation();
    pelagiaAudio.playCorkPop();
    onTriggerPlankton();
  };

  return (
    <div
      id="relic-bottle"
      className="relative mx-auto my-14 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none"
    >
      <div className="relative w-52 h-36 flex items-center justify-center">
        {/* Seafloor Sand Bed */}
        <div className="absolute bottom-1 w-48 h-5 rounded-full bg-[#0C1620] border-t border-[#38BDF8]/40" />

        {/* Hidden Emerald Flask + Little Ghost Crab Underneath */}
        <div
          className={`absolute bottom-4 z-10 transition-all duration-500 flex items-center gap-3 ${
            isLifted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          {/* Little crab running away */}
          <span className="text-xl animate-bounce -translate-x-2">🦀</span>

          {/* Glowing Emerald Bottle (Clickable to Pop Cork!) */}
          <button
            onClick={handlePopCork}
            className="group/bottle p-2 rounded-xl bg-emerald-950/60 border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.7)] flex flex-col items-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
            title="Click to uncork bioluminescent plankton aurora!"
          >
            <svg viewBox="0 0 30 60" className="w-8 h-14 text-emerald-400 animate-pulse" fill="currentColor">
              <rect x="11" y="2" width="8" height="6" rx="1" fill="#D97706" />
              <path d="M10 8 L20 8 L22 20 L26 28 L26 52 C26 56, 4 56, 4 52 L4 28 L8 20 Z" fill="#059669" fillOpacity="0.9" stroke="#34D399" strokeWidth="1.5" />
              <rect x="8" y="28" width="14" height="14" rx="1" fill="#FEF3C7" opacity="0.9" />
            </svg>
            <span className="text-[8px] font-mono font-bold text-emerald-300 mt-0.5">CABUT GABUS 🍾</span>
          </button>
        </div>

        {/* The Heavy Volcanic Basalt Boulder (Moves when lifted!) */}
        <div
          onClick={handleLiftRock}
          className={`absolute z-20 w-40 h-24 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] bg-[#1E293B] border-2 border-[#475569] shadow-[0_10px_25px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-700 ease-out flex items-center justify-center ${
            isLifted
              ? '-translate-y-16 -translate-x-14 rotate-12 opacity-85'
              : 'translate-y-2 translate-x-0 rotate-0 hover:scale-105 active:scale-95'
          }`}
          title={isLifted ? 'Batu basalt telah terangkat' : 'Klik untuk mengangkat batu basalt!'}
        >
          {/* Barnacles on the rock */}
          <div className="absolute top-3 left-6 w-2.5 h-2.5 rounded-full bg-[#64748B] border border-black/40" />
          <div className="absolute bottom-4 right-8 w-3 h-3 rounded-full bg-[#64748B] border border-black/40" />
          <div className="absolute top-8 right-6 w-2 h-2 rounded-full bg-[#94A3B8] border border-black/40" />

          {!isLifted && (
            <span className="text-[9px] font-mono font-bold text-[#CBD5E1] bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
              🪨 BATU BASALT
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {isLifted ? (
          <span className="text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>BATU TERANGKAT // BOTOL ZAMRUD (-680M)</span>
          </span>
        ) : (
          <button
            onClick={handleLiftRock}
            className="px-3.5 py-1.5 rounded-full bg-[#152B3C] text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-1.5 animate-pulse cursor-pointer hover:bg-cyan-950"
          >
            <Hand className="w-3.5 h-3.5" />
            <span>ANGKAT BATU BASALT VULKANIK</span>
          </button>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 4. MIDNIGHT ABYSS (-2,400m) — Eyes in the Trench Crevice & Titan Summoner
// =========================================================================
export const InWorldTrenchEyes: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
  onTriggerTitan: () => void;
}> = ({ isUnlocked, onUnlock, onTriggerTitan }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-titan')!;
  const [areEyesOpen, setAreEyesOpen] = useState<boolean>(isUnlocked);

  const handleTapCrevice = () => {
    pelagiaAudio.playSonarPing();
    setAreEyesOpen(true);
    onTriggerTitan();
    confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 }, colors: ['#22D3EE', '#0891B2', '#FAF6EE'] });
    onUnlock(relic);
  };

  return (
    <div
      id="relic-titan"
      onClick={handleTapCrevice}
      className="relative mx-auto my-16 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none cursor-pointer group"
    >
      <div className="relative w-56 h-32 rounded-2xl bg-black border-2 border-[#1E293B] shadow-[0_0_35px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
        {/* Trench rock jagged edges */}
        <div className="absolute inset-y-0 left-0 w-8 bg-[#0F172A] border-r border-[#334155]" />
        <div className="absolute inset-y-0 right-0 w-8 bg-[#0F172A] border-l border-[#334155]" />

        {/* Pair of Giant Glowing Slit Eyes in the Darkness */}
        <div
          className={`flex items-center gap-10 transition-all duration-700 ${
            areEyesOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-10'
          }`}
        >
          {/* Left Eye */}
          <div className="relative w-8 h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 shadow-[0_0_20px_#F59E0B] flex items-center justify-center">
            <div className="w-1.5 h-4 bg-black rounded-full" />
          </div>
          {/* Right Eye */}
          <div className="relative w-8 h-4 rounded-full bg-gradient-to-r from-yellow-200 to-amber-400 shadow-[0_0_20px_#F59E0B] flex items-center justify-center">
            <div className="w-1.5 h-4 bg-black rounded-full" />
          </div>
        </div>

        {/* Acoustic Sonar Waves */}
        {areEyesOpen && (
          <div className="absolute inset-0 border border-cyan-400/40 rounded-2xl animate-ping pointer-events-none" />
        )}
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {areEyesOpen ? (
          <span className="text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/50 flex items-center gap-1">
            <Check className="w-3 h-3 text-cyan-400" />
            <span>KONTAK MATA TITAN 120-METER (-2,400M)</span>
          </span>
        ) : (
          <span className="px-3.5 py-1.5 rounded-full bg-[#080E17] text-amber-400 border-2 border-amber-400/70 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>KETUK CELAH GELAP TEBING JURANG</span>
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 5. ABYSS GATE (-3,850m) — Tangled Sea Lilies & 1930 Beebe Diving Sphere
// =========================================================================
export const InWorldBeebeSphere: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
  onToggle1930s: () => void;
}> = ({ isUnlocked, onUnlock, onToggle1930s }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-bathysphere')!;
  const [isIlluminated, setIsIlluminated] = useState<boolean>(isUnlocked);

  const handleToggle = () => {
    pelagiaAudio.playVinylCrackle();
    const next = !isIlluminated;
    setIsIlluminated(next);
    onToggle1930s();
    if (next) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 }, colors: ['#D4AF37', '#FAF3E0', '#1E252B'] });
      onUnlock(relic);
    }
  };

  return (
    <div
      id="relic-bathysphere"
      onClick={handleToggle}
      className="relative mx-auto my-16 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none cursor-pointer group"
    >
      <div className="relative w-44 h-40 flex items-center justify-center">
        {/* The 1930 Beebe Hollow Steel Sphere */}
        <div
          className={`relative z-10 w-28 h-28 rounded-full bg-[#1E293B] border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center transition-transform group-hover:scale-105 ${
            isIlluminated ? 'shadow-[0_0_40px_rgba(212,175,55,0.7)]' : ''
          }`}
        >
          {/* Top Hoisting Eyelet */}
          <div className="absolute -top-3 w-4 h-4 rounded-full border-2 border-[#D4AF37]" />

          {/* Quartz Porthole Window */}
          <div
            className={`w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center transition-colors ${
              isIlluminated ? 'bg-amber-200 shadow-[0_0_30px_#FDE68A]' : 'bg-[#0284C7]'
            }`}
          >
            {isIlluminated && <Film className="w-5 h-5 text-amber-800" />}
          </div>
        </div>

        {/* Overgrown Abyssal Sea Lilies & Glass Sponges Vines (Part aside when active!) */}
        <div
          className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 flex justify-between ${
            isIlluminated ? 'opacity-20 scale-125' : 'opacity-100 scale-100'
          }`}
        >
          <span className="text-3xl">🌿</span>
          <span className="text-3xl">🪸</span>
        </div>
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {isIlluminated ? (
          <span className="text-amber-200 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/50 flex items-center gap-1">
            <Check className="w-3 h-3 text-amber-400" />
            <span>KAPSUL WILLIAM BEEBE 1930 (-3,850M)</span>
          </span>
        ) : (
          <span className="px-3.5 py-1.5 rounded-full bg-[#1E190D] text-amber-300 border-2 border-[#D4AF37] shadow-paper-sm flex items-center gap-1.5 animate-pulse">
            <Film className="w-3.5 h-3.5" />
            <span>SINGKIRKAN LILI LAUT & NYALAKAN KAPSUL</span>
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 6. ABYSSAL PLAIN (-5,100m) — Sea Organ Coral Pipes with Musical Water Chimes
// =========================================================================
export const InWorldCoralOrgan: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
  onToggleUV: () => void;
}> = ({ isUnlocked, onUnlock, onToggleUV }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-blacklight')!;
  const [activePipe, setActivePipe] = useState<number | null>(null);

  const handlePlayPipe = (pipeIndex: number) => {
    setActivePipe(pipeIndex);
    pelagiaAudio.playZoneChime(pipeIndex * 1500 + 400);
    setTimeout(() => setActivePipe(null), 400);
    onToggleUV();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.75 }, colors: ['#A855F7', '#C084FC', '#FAF5FF'] });
    onUnlock(relic);
  };

  return (
    <div
      id="relic-blacklight"
      className="relative mx-auto my-16 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none"
    >
      <div className="flex items-end justify-center gap-3 h-36">
        {/* Pipe 1: Low */}
        <button
          onClick={() => handlePlayPipe(1)}
          className={`w-7 rounded-t-full bg-[#6B21A8] border-2 border-[#C084FC] transition-all cursor-pointer flex flex-col items-center pt-2 ${
            activePipe === 1 ? 'h-32 bg-[#A855F7] shadow-[0_0_20px_#C084FC]' : 'h-24 hover:h-28'
          }`}
          title="Pipe C (Low Tone)"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-black/50" />
        </button>

        {/* Pipe 2: Mid */}
        <button
          onClick={() => handlePlayPipe(2)}
          className={`w-7 rounded-t-full bg-[#581C87] border-2 border-[#C084FC] transition-all cursor-pointer flex flex-col items-center pt-2 ${
            activePipe === 2 ? 'h-36 bg-[#A855F7] shadow-[0_0_20px_#C084FC]' : 'h-30 hover:h-34'
          }`}
          title="Pipe E (Mid Tone)"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-black/50" />
        </button>

        {/* Pipe 3: High */}
        <button
          onClick={() => handlePlayPipe(3)}
          className={`w-7 rounded-t-full bg-[#3B0764] border-2 border-[#C084FC] transition-all cursor-pointer flex flex-col items-center pt-2 ${
            activePipe === 3 ? 'h-40 bg-[#A855F7] shadow-[0_0_20px_#C084FC]' : 'h-36 hover:h-38'
          }`}
          title="Pipe G (High Tone)"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-black/50" />
        </button>
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {isUnlocked ? (
          <span className="text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/50 flex items-center gap-1">
            <Check className="w-3 h-3 text-purple-400" />
            <span>SERULING KARANG & MATRIKS UV AKTIF (-5,100M)</span>
          </span>
        ) : (
          <span className="px-3.5 py-1.5 rounded-full bg-[#180826] text-purple-300 border-2 border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.4)] flex items-center gap-1.5 animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span>PETIK PIPA SERULING KARANG ABISAL</span>
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 7. HADAL TRENCH (-10,250m) — Crushed Oil Drum Hiding Indestructible Mug
// =========================================================================
export const InWorldCrushedDrum: React.FC<{
  isUnlocked: boolean;
  onUnlock: (relic: ApocryphalRelic) => void;
}> = ({ isUnlocked, onUnlock }) => {
  const relic = APOCRYPHAL_RELICS.find((r) => r.id === 'relic-mug')!;
  const [isMoved, setIsMoved] = useState<boolean>(isUnlocked);

  const handleMoveDrum = () => {
    pelagiaAudio.playWaxSquash();
    setIsMoved(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.85 }, colors: ['#EF4444', '#DC2626', '#FAF6EE'] });
    onUnlock(relic);
  };

  return (
    <div
      id="relic-mug"
      onClick={handleMoveDrum}
      className="relative mx-auto my-16 max-w-sm p-4 rounded-2xl flex flex-col items-center text-center select-none cursor-pointer group"
    >
      <div className="relative w-48 h-32 flex items-center justify-center">
        {/* Intact Ceramic Mug Resting in Silt */}
        <div
          className={`absolute bottom-3 z-10 transition-all duration-500 flex flex-col items-center ${
            isMoved ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          {/* Steam wisp */}
          <span className="text-xs animate-bounce opacity-70">♨️</span>
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" fill="currentColor">
            <rect x="8" y="10" width="20" height="22" rx="3" fill="#FAF6EE" stroke="#1E252B" strokeWidth="2" />
            <path d="M28 14 C35 14, 35 26, 28 26" fill="none" stroke="#1E252B" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18 h12 M12 22 h8" stroke="#D95A47" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Crushed, Imploded 55-Gallon Steel Drum (Rolls aside when clicked!) */}
        <div
          className={`absolute z-20 w-36 h-20 rounded-xl bg-[#334155] border-2 border-[#1E293B] shadow-2xl transition-all duration-700 ease-out flex items-center justify-center ${
            isMoved ? '-translate-x-16 rotate-45 opacity-70' : 'translate-x-0 rotate-0 hover:scale-105'
          }`}
        >
          {/* Crumpled indentations */}
          <div className="w-24 h-4 bg-black/40 rounded-full" />
          {!isMoved && (
            <span className="absolute text-[8px] font-mono font-bold text-slate-300">
              🛢️ TONG BAJA REMUK
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 font-mono text-[10px] font-bold">
        {isMoved ? (
          <span className="text-red-300 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/50 flex items-center gap-1">
            <Check className="w-3 h-3 text-red-400" />
            <span>CANGKIR KERAMIK ABADI (-10,250M)</span>
          </span>
        ) : (
          <span className="px-3.5 py-1.5 rounded-full bg-red-950/90 text-red-300 border-2 border-red-500 shadow-paper-sm flex items-center gap-1.5 animate-pulse">
            <Hand className="w-3.5 h-3.5" />
            <span>GULINGKAN TONG BAJA YANG REMUK</span>
          </span>
        )}
      </div>
    </div>
  );
};
